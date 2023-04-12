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
exports.CommentDatabase = void 0;
const interfaces_1 = require("../interfaces");
const BaseDatabase_1 = require("./BaseDatabase");
class CommentDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getCommentsByPostId = (post_id) => __awaiter(this, void 0, void 0, function* () {
            const commentsDB = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select()
                .where({ post_id });
            return commentsDB;
        });
        this.getCommentWithCreatorByPostId = (post_id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select("comments.id", "comments.post_id", "comments.creator_id", "comments.content", "comments.likes", "comments.dislikes", "comments.created_at", "comments.updated_at", "users.name AS creator_name")
                .join("users", "comments.creator_id", "=", "users.id")
                .where({ post_id });
            return result;
        });
        this.getCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [commentDB] = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select()
                .where({ id });
            return commentDB;
        });
        this.getIdPostByCommentId = (id) => __awaiter(this, void 0, void 0, function* () {
            const postId = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .select("comments.post_id")
                .where({ id });
            return postId;
        });
        this.createComment = (comment) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_COMMENTS)
                .insert(comment);
        });
        this.editComment = (id, commentDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .update(commentDB)
                .where({ id });
        });
        this.deleteCommentById = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
                .delete()
                .where({ id });
        });
        this.likeOrDislikeComment = (likeDislike) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
                .insert(likeDislike);
        });
        this.findLikeDislike = (LikeOrDislikeDBToFind) => __awaiter(this, void 0, void 0, function* () {
            const [LikeOrDislikeDB] = yield BaseDatabase_1.BaseDatabase
                .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
                .select()
                .where({
                user_id: LikeOrDislikeDBToFind.user_id,
                comment_id: LikeOrDislikeDBToFind.comment_id
            });
            if (LikeOrDislikeDB) {
                return LikeOrDislikeDB.like === 1
                    ? interfaces_1.COMMENT_LIKE.ALREADY_LIKED
                    : interfaces_1.COMMENT_LIKE.ALREADY_DISLIKED;
            }
            else {
                return null;
            }
        });
        this.removeLikeDislike = (LikeOrDislikeDBToFind) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
                .delete()
                .where({
                user_id: LikeOrDislikeDBToFind.user_id,
                comment_id: LikeOrDislikeDBToFind.comment_id
            });
        });
        this.updateLikeDislike = (LikeOrDislikeDBToFind) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
                .update(LikeOrDislikeDBToFind)
                .where({
                user_id: LikeOrDislikeDBToFind.user_id,
                comment_id: LikeOrDislikeDBToFind.comment_id
            });
        });
    }
}
CommentDatabase.TABLE_COMMENTS = "comments";
CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments";
exports.CommentDatabase = CommentDatabase;
//# sourceMappingURL=CommentDatabase.js.map