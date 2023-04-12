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
exports.PostDatabase = void 0;
const interfaces_1 = require("../interfaces");
const BaseDatabase_1 = require("./BaseDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.findPostByCreatorId = (postId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select("posts.id", "posts.creator_id", "posts.content", "posts.likes", "posts.dislikes", "posts.created_at", "posts.updated_at")
                .join("users", "posts.creator_id", "=", "users.id")
                .where("posts.id", postId);
            return result[0];
        });
        this.findLikeDislike = (likeDislikeDBToFind) => __awaiter(this, void 0, void 0, function* () {
            const [likeDislikeDB] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_LIKES_DISLIKES)
                .select()
                .where({
                user_id: likeDislikeDBToFind.user_id,
                post_id: likeDislikeDBToFind.post_id
            });
            if (likeDislikeDB) {
                return likeDislikeDB.like === 1
                    ? interfaces_1.POST_LIKE.ALREADY_LIKED
                    : interfaces_1.POST_LIKE.ALREADY_DISLIKED;
            }
            else {
                return null;
            }
        });
        this.removeLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
                .delete()
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
        this.updateLikeDislike = (likeDislikeDB) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
                .update(likeDislikeDB)
                .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            });
        });
        this.likeOrDislikePost = (likeDislike) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
                .insert(likeDislike);
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .select()
                .where({ id });
            return result[0];
        });
    }
    findPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const postDB = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS);
            return postDB;
        });
    }
    createPost(newPostDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .insert(newPostDB);
        });
    }
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [postDB] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .where({ id });
            return postDB;
        });
    }
    upDatePostById(id, postDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .update(postDB)
                .where({ id });
        });
    }
    deletedPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .delete()
                .where({ id });
        });
    }
}
PostDatabase.TABLE_POSTS = "posts";
PostDatabase.TABLE_LIKES_DISLIKES = "likes_deslikes";
exports.PostDatabase = PostDatabase;
//# sourceMappingURL=PostsDatabase.js.map