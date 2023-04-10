export enum USER_ROLES{
    NORMAL="NORMAL",
    ADMIN="ADMIN"
}
export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}
export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}

//passado para o front
export interface PostsModel{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator:{
        id:string,
        name:string
    }
}
export interface PostDB{
    id: string,
    creator_id: string,
    creator_name:string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}
export interface PostCreatorDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_name:string

}
export interface UserDB{
    id: string,
    name: string,
    email:string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel{
    id: string,
    name: string,
    email:string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface CreatePostInputDTO{
    token: string | undefined,
    content: string
}
export interface EditPostInputDTO {
    id: string,
    token: string | undefined,
    newContent: unknown
}

export interface DeletePostInputDTO {
    id: string,
    token: string | undefined
}

export interface LikeOrDislikeDB{
    user_id: string,
    post_id: string,
    like: number
}
export interface LikeOrDislikePostDTO{
    id: string,
    token:string | undefined,
    like: unknown
}