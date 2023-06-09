import { IPostDB, LikeOrDislikeDB,  POST_LIKE } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase{
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_deslikes"


public async findPosts(){
    const postDB: IPostDB[] = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    return postDB
}
public async createPost(newPostDB:IPostDB):Promise<void>{
    await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .insert(newPostDB)
}
public async findPostById(id:string){
    const [postDB]:IPostDB[] | undefined[] = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .where({id})
    return postDB
}
public async upDatePostById(id: string, postDB:IPostDB):Promise<void>{
    await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .update(postDB)
    .where({id})
}
public async deletedPostById(id:string):Promise<void>{
    await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .delete()
    .where({id})
}

public findPostByCreatorId = async(postId: string):Promise<IPostDB | undefined> =>{
    const result: IPostDB[] = await BaseDatabase
    .connection(PostDatabase.TABLE_POSTS)
    .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.updated_at",
    )
    .join("users", "posts.creator_id", "=", "users.id")
    .where("posts.id",postId)

return result[0]
}
    public findLikeDislike = async (
        likeDislikeDBToFind: LikeOrDislikeDB
    ): Promise<POST_LIKE | null> => {
        const [ likeDislikeDB ]: LikeOrDislikeDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDBToFind.user_id,
                post_id: likeDislikeDBToFind.post_id
            })

        if (likeDislikeDB) {
            return likeDislikeDB.like === 1
                ? POST_LIKE.ALREADY_LIKED
                : POST_LIKE.ALREADY_DISLIKED

        } else {
            return null
        }
    }
    public removeLikeDislike = async (
        likeDislikeDB: LikeOrDislikeDB
    ): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }
    public updateLikeDislike = async (
        likeDislikeDB: LikeOrDislikeDB
    ) => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

public likeOrDislikePost = async(likeDislike:LikeOrDislikeDB):Promise<void> =>{
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .insert(likeDislike)
}
public findById = async (id: string): Promise<IPostDB | undefined> => {
    const result: IPostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({ id })
    
    return result[0]
}
}