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
export interface IUsersDB{
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
export interface IPostDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}
export interface PostsModel{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator:{
        id:string,
    }
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
export interface CommentDB {
    id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_id: string
  }
  
  export interface CommentModel {
    id: string,
    postId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creatorId: string,
    creatorName: string
  }
  
  export interface CommentWithCreatorDB {
    id: string,
    post_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_id: string,
    creator_name: string
  }
  
  export interface LikeDislikeCommentDB {
    user_id: string,
    post_id: string,
    comment_id: string,
    like: number
  }
  export enum COMMENT_LIKE {
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
  }
  export interface LikeOrDislikePostInput {
  idToLikeOrDislike: string,
  token: string | undefined,
  like: number
}