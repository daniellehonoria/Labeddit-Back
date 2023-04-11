import { Request, Response } from "express"
import { PostsBusiness } from "../business/PostsBusiness";
import { PostDTO } from "../dtos/PostDto";
import { BaseError } from "../Errors/BaseError";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, LikeOrDislikePostDTO } from "../interfaces";

export class PostController{
    constructor(
        private postsBusiness: PostsBusiness,
        private postDTO: PostDTO

    ){}
    public getPosts = async(req: Request, res:Response) =>{
        try {
            const output = await this.postsBusiness.getPosts()
            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public createPost = async(req:Request, res:Response) =>{
        try {
            const input: CreatePostInputDTO = this.postDTO.createPostInput(
               req.headers.authorization,
                req.body.content
            )
         await this.postsBusiness.createPost(input)
            res.status(201).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async(req:Request, res:Response) =>{
        try {
            const input:EditPostInputDTO ={
                id: req.params.id,
                newContent: req.body.content,
                token: req.headers.authorization
            }
           await this.postsBusiness.editPost(input)
            res.status(200).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public deletePost = async (req: Request, res: Response) => {
        try {

            const input:DeletePostInputDTO = {
                id: req.params.id,
                token: req.headers.authorization
            }

            await this.postsBusiness.deletePost(input)

            res.status(200).end()
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
    public likeOrDislikePost = async(req:Request, res: Response) =>{
    try {
        const input:LikeOrDislikePostDTO = {
            id: req.params.id,
            token: req.headers.authorization,
            like: req.body.like
        }

        await this.postsBusiness.likeOrDislikePost(input)
        res.status(200).end()
    } catch (error) {
        console.log(error)

        if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }
    }
}
}

