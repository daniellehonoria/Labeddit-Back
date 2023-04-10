import exp from "constants"
import { PostsModel } from "../types"

export interface SignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}

export interface GetPostsInputDTO{
    token:string | undefined
}
 
export type GetPostsOutputDTO = PostsModel[]

export interface CreatePostsInputDTO{
    token: string | undefined
}

export interface EditPostInputDTO{
    idToEdit: string,
    token: string |undefined
}

export interface DeletePostInputDTO{
    idToDelete: string,
    token: string |undefined,
}

export interface LikeOrDislikeInputDTO{
    idToLikeOrDislike:string,
    token: string | undefined,
    like: unknown
}