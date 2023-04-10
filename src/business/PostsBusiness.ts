import { PostDatabase } from "../database/PostsDatabase";
import { BadRequestError } from "../Errors/BadRequestError";
import { NotFoundError } from "../Errors/NotFoundError";
import {  CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, PostDB, LikeOrDislikeDB, LikeOrDislikePostDTO, POST_LIKE, USER_ROLES } from "../types";
import { Post } from "../models/PostsModel";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { GetPostsInputDTO } from "../dtos/UserDTO";

export class PostsBusiness{
    constructor(
        private postsDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager : TokenManager

    ){}
public getPosts = async(input:GetPostsInputDTO)=>{
    const postsDB: PostDB[] = await this.postsDatabase.findPosts()

    const posts = postsDB.map((postDB)=> new Post(
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        postDB.creator_id,
        postDB.creator_name
            ))
    return posts
}
public createPost = async (input:CreatePostInputDTO):Promise<void> =>{
    const {token, content} =input
 
    if(token === undefined)throw new BadRequestError("Espera-se um token")
    if(content.length < 2)throw new BadRequestError("Content deve ter ao menos 2 strings")

        const payload = this.tokenManager.getPayload(token)

    if(payload === null) throw new BadRequestError("Token inválido")
    if (typeof content !== "string") throw new BadRequestError("Content deve ser string")

    const id = this.idGenerator.generate()
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()
    const creatorId =  payload.id

    //instancia do post
    const newPost = new Post(
        id, 
        content,
        0,
        0,
        createdAt,
        updatedAt,
        creatorId,
        creatorName

    ) 
    //modelagem da tabela
    const postToDB = newPost.toDBModel()

    await this.postsDatabase.createPost(postToDB)

}
public editPost = async (input:EditPostInputDTO) :Promise<void>=>{
    const {id, token, newContent} =input

      if (token === undefined)throw new BadRequestError("Espera-se um token")

    const payload = this.tokenManager.getPayload(token)

    if (payload === null)throw new BadRequestError("Token inválido")
    if(newContent === undefined)throw new BadRequestError("Content é obrigatório")
    if(typeof newContent !== "string")throw new BadRequestError("Content deve ser string")
       
    const postsDBIdExists = await this.postsDatabase.findPostById(id)

    if(id !== undefined){
        if(typeof id !== "string")throw new BadRequestError("Id deve ser string")
        if(newContent.length < 2)throw new BadRequestError("Content deve possuir ao menos 2 caracteres")
    }

    if(!postsDBIdExists)throw new NotFoundError("Id não encontrado")

    const creatorId = payload.id
    if (postsDBIdExists.creator_id !== creatorId) {
        throw new BadRequestError("somente quem criou o post pode editá-lo")
    }

    const putPost = new Post(
        postsDBIdExists.id, 
        postsDBIdExists.content,
        postsDBIdExists.likes,
        postsDBIdExists.dislikes,
        postsDBIdExists.created_at,
        postsDBIdExists.updated_at,
        creatorId,
        creatorName
    ) 
    //enquanto newId for thruty, não executa o putPost, quando for falsy, setId altera o valor de newId
    putPost.setContent(newContent)
    putPost.setUpdatedAt(new Date().toISOString())
    
    // id && putPost.setId(id)
    // newContent && putPost.setContent(newContent)

    const putPostDB = putPost.toDBModel()

    await this.postsDatabase.upDatePostById(id, putPostDB)

}
public deletePost = async(input:DeletePostInputDTO):Promise<void> =>{
    const {id, token} = input

    if (token === undefined)throw new BadRequestError("Espera-se um token")

    const payload = this.tokenManager.getPayload(token)
    

    if (payload === null) throw new BadRequestError("Token inválido")

    const postDeleteDB = await this.postsDatabase.findPostById(id)

    if(!postDeleteDB)throw new NotFoundError("Id não encontrado")

    const creatorId = payload.id

        if (payload.role !== USER_ROLES.ADMIN
            && postDeleteDB.creator_id !== creatorId
        ) {
            throw new BadRequestError("Apenas ADMIN, ou quem criou o post pode deletá-lo")
        }

    await this.postsDatabase.deletedPostById(id)

}
public likeOrDislikePost = async(input: LikeOrDislikePostDTO): Promise<void> =>{
    const{id, token, like} = input
    if(token === undefined)throw new BadRequestError("Espera-se um token")
    
    const payload = this.tokenManager.getPayload(token)

    if(payload === null) throw new BadRequestError("Token inválido")
    if(typeof like !== "boolean") throw new BadRequestError("Like deve ser booleano")

    const postCreatorDB = await this.postsDatabase.findPostByCreatorId(id)

    if(!postCreatorDB) throw new NotFoundError("Id não encontrado")

    const userId = payload.id
    const likeBoolean = like ? 1 : 0
    
    const likeOrDislike : LikeOrDislikeDB={
        user_id: userId,
        post_id: postCreatorDB.id,
        like: likeBoolean
    }
    const listPost= new Post(
        postCreatorDB.id, 
        postCreatorDB.content,
        postCreatorDB.likes,
        postCreatorDB.dislikes,
        postCreatorDB.created_at,
        postCreatorDB.updated_at,
        postCreatorDB.creator_id,
        postCreatorDB.creator_name
    )
    const likeDislikeExists = await this.postsDatabase.findLikeDislike(likeOrDislike)

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
        
        if (like) {
            await this.postsDatabase.removeLikeDislike(likeOrDislike)
            listPost.removeLike()
        } else {
            await this.postsDatabase.updateLikeDislike(likeOrDislike)
            listPost.removeLike()
            listPost.addDislike()
        }

      } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
            if (like) {
                await this.postsDatabase.updateLikeDislike(likeOrDislike)
                listPost.removeDislike()
                listPost.addLike()
            } else {
                await this.postsDatabase.removeLikeDislike(likeOrDislike)
                listPost.removeDislike()
            }

        } else {
            await this.postsDatabase.likeOrDislikePost(likeOrDislike)
    
            like ? listPost.addLike() : listPost.addDislike()
        }

        const updatedPostDB = listPost.toDBModel()
    
        await this.postsDatabase.upDatePostById(id, updatedPostDB)
    }
}