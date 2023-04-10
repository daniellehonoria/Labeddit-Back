import { BadRequestError } from "../Errors/BadRequestError"
import {  CreatePostInputDTO } from "../types"

export class PostDTO{
    public createPostInput(
        token:unknown,
        content: unknown,

    ): CreatePostInputDTO{
        if(token === undefined)throw new BadRequestError("Token é obrigatório")
        if (typeof token !== "string")throw new BadRequestError("'id' deve ser string")
        
        if(content === undefined)throw new BadRequestError("Content é obrigatório")
        if(typeof content !== "string")throw new BadRequestError("content deve ser string")
        
        const dtoPost:CreatePostInputDTO ={
            token,
            content
        }
        return dtoPost
    }

}