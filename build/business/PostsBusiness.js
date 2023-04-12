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
exports.PostsBusiness = void 0;
const BadRequestError_1 = require("../Errors/BadRequestError");
const NotFoundError_1 = require("../Errors/NotFoundError");
const interfaces_1 = require("../interfaces");
const PostsModel_1 = require("../models/PostsModel");
class PostsBusiness {
    constructor(postsDatabase, idGenerator, tokenManager) {
        this.postsDatabase = postsDatabase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.getPosts = () => __awaiter(this, void 0, void 0, function* () {
            const postsDB = yield this.postsDatabase.findPosts();
            const posts = postsDB.map((postDB) => new PostsModel_1.Posts(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, postDB.creator_id));
            return posts;
        });
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, content } = input;
            if (token === undefined)
                throw new BadRequestError_1.BadRequestError("Espera-se um token");
            if (content.length < 2)
                throw new BadRequestError_1.BadRequestError("Content deve ter ao menos 2 strings");
            const payload = this.tokenManager.getPayload(token);
            if (payload === null)
                throw new BadRequestError_1.BadRequestError("Token inválido");
            if (typeof content !== "string")
                throw new BadRequestError_1.BadRequestError("Content deve ser string");
            const id = this.idGenerator.generate();
            const createdAt = new Date().toISOString();
            const updatedAt = new Date().toISOString();
            const creatorId = payload.id;
            const newPost = new PostsModel_1.Posts(id, content, 0, 0, createdAt, updatedAt, creatorId);
            const postToDB = newPost.toDBModelPosts();
            yield this.postsDatabase.createPost(postToDB);
        });
        this.editPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token, newContent } = input;
            if (token === undefined)
                throw new BadRequestError_1.BadRequestError("Espera-se um token");
            const payload = this.tokenManager.getPayload(token);
            if (payload === null)
                throw new BadRequestError_1.BadRequestError("Token inválido");
            if (newContent === undefined)
                throw new BadRequestError_1.BadRequestError("Content é obrigatório");
            if (typeof newContent !== "string")
                throw new BadRequestError_1.BadRequestError("Content deve ser string");
            const postsDBIdExists = yield this.postsDatabase.findPostById(id);
            if (id !== undefined) {
                if (typeof id !== "string")
                    throw new BadRequestError_1.BadRequestError("Id deve ser string");
                if (newContent.length < 2)
                    throw new BadRequestError_1.BadRequestError("Content deve possuir ao menos 2 caracteres");
            }
            if (!postsDBIdExists)
                throw new NotFoundError_1.NotFoundError("Id não encontrado");
            const creatorId = payload.id;
            if (postsDBIdExists.creator_id !== creatorId) {
                throw new BadRequestError_1.BadRequestError("somente quem criou o post pode editá-lo");
            }
            const putPost = new PostsModel_1.Posts(postsDBIdExists.id, postsDBIdExists.content, postsDBIdExists.likes, postsDBIdExists.dislikes, postsDBIdExists.created_at, postsDBIdExists.updated_at, creatorId);
            putPost.setContent(newContent);
            putPost.setUpdatedAt(new Date().toISOString());
            const putPostDB = putPost.toDBModelPosts();
            yield this.postsDatabase.upDatePostById(id, putPostDB);
        });
        this.deletePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            if (token === undefined)
                throw new BadRequestError_1.BadRequestError("Espera-se um token");
            const payload = this.tokenManager.getPayload(token);
            if (payload === null)
                throw new BadRequestError_1.BadRequestError("Token inválido");
            const postDeleteDB = yield this.postsDatabase.findPostById(id);
            if (!postDeleteDB)
                throw new NotFoundError_1.NotFoundError("Id não encontrado");
            const creatorId = payload.id;
            if (payload.role !== interfaces_1.USER_ROLES.ADMIN
                && postDeleteDB.creator_id !== creatorId) {
                throw new BadRequestError_1.BadRequestError("Apenas ADMIN, ou quem criou o post pode deletá-lo");
            }
            yield this.postsDatabase.deletedPostById(id);
        });
        this.likeOrDislikePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token, like } = input;
            if (token === undefined)
                throw new BadRequestError_1.BadRequestError("Espera-se um token");
            const payload = this.tokenManager.getPayload(token);
            if (payload === null)
                throw new BadRequestError_1.BadRequestError("Token inválido");
            if (typeof like !== "boolean")
                throw new BadRequestError_1.BadRequestError("Like deve ser booleano");
            const postCreatorDB = yield this.postsDatabase.findPostByCreatorId(id);
            if (!postCreatorDB)
                throw new NotFoundError_1.NotFoundError("Id não encontrado");
            const userId = payload.id;
            const likeBoolean = like ? 1 : 0;
            const likeOrDislike = {
                user_id: userId,
                post_id: postCreatorDB.id,
                like: likeBoolean
            };
            const listPost = new PostsModel_1.Posts(postCreatorDB.id, postCreatorDB.content, postCreatorDB.likes, postCreatorDB.dislikes, postCreatorDB.created_at, postCreatorDB.updated_at, postCreatorDB.creator_id);
            const likeDislikeExists = yield this.postsDatabase.findLikeDislike(likeOrDislike);
            if (likeDislikeExists === interfaces_1.POST_LIKE.ALREADY_LIKED) {
                if (like) {
                    yield this.postsDatabase.removeLikeDislike(likeOrDislike);
                    listPost.removeLike();
                }
                else {
                    yield this.postsDatabase.updateLikeDislike(likeOrDislike);
                    listPost.removeLike();
                    listPost.addDislike();
                }
            }
            else if (likeDislikeExists === interfaces_1.POST_LIKE.ALREADY_DISLIKED) {
                if (like) {
                    yield this.postsDatabase.updateLikeDislike(likeOrDislike);
                    listPost.removeDislike();
                    listPost.addLike();
                }
                else {
                    yield this.postsDatabase.removeLikeDislike(likeOrDislike);
                    listPost.removeDislike();
                }
            }
            else {
                yield this.postsDatabase.likeOrDislikePost(likeOrDislike);
                like ? listPost.addLike() : listPost.addDislike();
            }
            const updatedPostDB = listPost.toDBModelPosts();
            yield this.postsDatabase.upDatePostById(id, updatedPostDB);
        });
    }
}
exports.PostsBusiness = PostsBusiness;
//# sourceMappingURL=PostsBusiness.js.map