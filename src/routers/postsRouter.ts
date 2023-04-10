import express from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostsDatabase";
import { PostDTO } from "../dtos/PostDto";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postsRouter = express.Router()

const postController = new PostController(
    new PostsBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    ),
      new PostDTO()

    )
postsRouter.get("/", postController.getPosts)
postsRouter.post("/", postController.createPost)
postsRouter.put("/:id", postController.editPost)
postsRouter.delete("/:id", postController.deletePost)
postsRouter.put("/:id/like", postController.likeOrDislikePost)