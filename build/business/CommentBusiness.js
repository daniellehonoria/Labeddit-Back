"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentBusiness = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
const Comment_1 = require("../models/Comment");
const interfaces_1 = require("../interfaces");
class CommentBusiness {
    constructor(commentDatabase, userDatabase, postDataBase, idGenerator, tokenManager, hashManager) {
        this.commentDatabase = commentDatabase;
        this.userDatabase = userDatabase;
        this.postDataBase = postDataBase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.createComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postId, content, token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("Token não enviado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido!");
            }
            if (typeof postId !== "string") {
                throw new BadRequestError_1.BadRequestError("'postId' deve ser string");
            }
            if (typeof content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' deve ser string");
            }
            const id = this.idGenerator.generate();
            const comment = new Comment_1.Comment(id, postId, content, 0, 0, new Date().toISOString(), new Date().toISOString(), payload.id, payload.name);
            const commentDB = comment.toDBModel();
            yield this.commentDatabase.createComment(commentDB);
            const output = {
                message: "Comentário criado."
            };
            return output;
        });
        this.getComments = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postId, token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("Token não enviado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido!");
            }
            if (typeof postId !== "string") {
                throw new BadRequestError_1.BadRequestError("'postId' deve ser string");
            }
            const commentsWithCreatorDB = yield this.commentDatabase.getCommentWithCreatorByPostId(postId);
            const comments = commentsWithCreatorDB.map((commentDB) => {
                const comment = new Comment_1.Comment(commentDB.id, commentDB.post_id, commentDB.content, commentDB.likes, commentDB.dislikes, commentDB.created_at, commentDB.updated_at, commentDB.creator_id, commentDB.creator_name);
                return comment.toBusinessModel();
            });
            return comments;
        });
        this.deleteComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { commentId, token } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("Token não enviado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido!");
            }
            if (typeof commentId !== "string") {
                throw new BadRequestError_1.BadRequestError("'commentId' deve ser string");
            }
            const commentDB = yield this.commentDatabase.getCommentById(commentId);
            if (!commentDB) {
                throw new BadRequestError_1.BadRequestError("Comentário não encontrado.");
            }
            if (payload.role !== interfaces_1.USER_ROLES.ADMIN && commentDB.creator_id !== payload.id) {
                throw new BadRequestError_1.BadRequestError("Somente o criador do comentário pode deletar.");
            }
            yield this.commentDatabase.deleteCommentById(commentId);
            const output = {
                message: "Comentário deletado."
            };
            return output;
        });
        this.likeOrDislikeComment = (input) => __awaiter(this, void 0, void 0, function* () {
            const { idToLikeOrDislike, token, like } = input;
            if (!token) {
                throw new BadRequestError_1.BadRequestError("Token não enviado!");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Usuário não logado!");
            }
            if (typeof like !== "boolean") {
                throw new BadRequestError_1.BadRequestError("'like' deve ser boolean!");
            }
            const commentDB = yield this.commentDatabase.getCommentById(idToLikeOrDislike);
            if (!commentDB) {
                throw new BadRequestError_1.BadRequestError("Comentário não encontrado!");
            }
            const postId = yield this.commentDatabase.getIdPostByCommentId(idToLikeOrDislike);
            const likeSQLite = like ? 1 : 0;
            if (commentDB.creator_id === payload.id) {
                throw new BadRequestError_1.BadRequestError("O criador não pode curtir seu próprio post.");
            }
            const likeDislikeDB = {
                user_id: payload.id,
                post_id: postId[0].post_id,
                comment_id: idToLikeOrDislike,
                like: likeSQLite
            };
            const comment = new Comment_1.Comment(commentDB.id, commentDB.post_id, commentDB.content, commentDB.likes, commentDB.dislikes, commentDB.created_at, commentDB.updated_at, commentDB.creator_id, commentDB.creator_name);
            const likeDislikeExists = yield this.commentDatabase.findLikeDislike(likeDislikeDB);
            if (likeDislikeExists === interfaces_1.COMMENT_LIKE.ALREADY_LIKED) {
                if (like) {
                    yield this.commentDatabase.removeLikeDislike(likeDislikeDB);
                    comment.removeLike();
                }
                else {
                    yield this.commentDatabase.updateLikeDislike(likeDislikeDB);
                    comment.removeLike();
                    comment.addDislike();
                }
            }
            else if (likeDislikeExists === interfaces_1.COMMENT_LIKE.ALREADY_DISLIKED) {
                if (like) {
                    yield this.commentDatabase.updateLikeDislike(likeDislikeDB);
                    comment.removeDislike();
                    comment.addLike();
                }
                else {
                    yield this.commentDatabase.removeLikeDislike(likeDislikeDB);
                    comment.removeDislike();
                }
            }
            else {
                yield this.commentDatabase.likeOrDislikeComment(likeDislikeDB);
                like ? comment.addLike() : comment.addDislike();
            }
            const updatedComment = comment.toDBModel();
            yield this.commentDatabase.editComment(idToLikeOrDislike, updatedComment);
        });
    }
}
exports.CommentBusiness = CommentBusiness;
//# sourceMappingURL=CommentBusiness.js.map