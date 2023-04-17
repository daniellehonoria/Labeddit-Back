import { BaseDatabase } from "../../src/database/BaseDatabase";
import { LikeOrDislikeDB, IPostDB, POST_LIKE, USER_ROLES } from "../../src/interfaces";
export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POST = "posts";
  
    public findPosts = async (): Promise<IPostDB[]> => {
      return [
        {
          id: "id-mock-p1",
          creator_id: "id-mock",
          content: "Post mock 1",
          likes: 0,
          dislikes: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
        {
          id: "id-mock-p2",
          creator_id: "id-mock",
          content: "Post mock 2",
          likes: 1,
          dislikes: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      ];
    }
  
      public createPost = async (
      post: IPostDB
    ): Promise<void> => {}
  
    public findPostById = async (id: string): Promise<IPostDB | undefined> => {
      switch (id) {
        case "id-mock-p1":
          return {
            id: "id-mock-p1",
            creator_id: "id-mock",
            content: "Post mock 1",
            likes: 0,
            dislikes: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
          };
        case "id-mock-p2":
          return {
            id: "id-mock-p2",
            creator_id: "id-mock",
            content: "Post mock 2",
            likes: 1,
            dislikes: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
          };
        default:
          return undefined;
      }
    }
  
    public upDatePostById = async (id: string, postDB: IPostDB): Promise<void> => {}
  
    public deletedPostById = async (id: string): Promise<void> => {}
  
    public findPostByCreatorId = async (
      id: string
    ): Promise<IPostDB | undefined> => {
      switch (id) {
        case "id-mock-p1":
          return {
            id: "id-mock-p1",
            creator_id: "id-mock",
            content: "Post mock 1",
            likes: 0,
            dislikes: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
          };
        case "id-mock-p2":
          return {
            id: "id-mock-p2",
            creator_id: "id-mock",
            content: "Post mock 2",
            likes: 1,
            dislikes: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
          };
        default:
          return undefined;
      }
    }
  
    public likeOrDislikePost = async (
      likeDislike: LikeOrDislikeDB
    ): Promise<void> =>   {}
  
    public findLikeDislike = async (
      likeDislikeDBToFind: LikeOrDislikeDB
    ): Promise<POST_LIKE | null> => {
      return null;
    }
  
    public removeLikeDislike = async (
      likeDislikeDBToRemove: LikeOrDislikeDB
    ): Promise<void> => {}
  
    public updateLikeDislike = async (
      likeDislikeDB: LikeOrDislikeDB): Promise<void> => {}
    public findById = async (id: string): Promise<IPostDB | undefined> => {
        switch (id) {
          case "id-mock-p1":
            return {
              id: "id-mock-p1",
              creator_id: "id-mock",
              content: "Post mock 1",
              likes: 0,
              dislikes: 0,
              created_at: expect.any(String),
              updated_at: expect.any(String),
            };
          case "id-mock-p2":
            return {
              id: "id-mock-p2",
              creator_id: "id-mock",
              content: "Post mock 2",
              likes: 1,
              dislikes: 0,
              created_at: expect.any(String),
              updated_at: expect.any(String),
            };
          default:
            return undefined;
        }
        
      }
  }
    
