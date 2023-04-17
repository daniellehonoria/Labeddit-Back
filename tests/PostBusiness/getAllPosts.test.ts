import {PostsBusiness} from '../../src/business/PostsBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { PostDatabaseMock } from '../Mocks/PostDatabaseMock'

describe("Busca posts",()=>{

    const postBusiness = new PostsBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("deve listar todos os posts", async()=>{
        const output=        [ {
        id: "id-mock-p1",
        creatorId: "id-mock",
          content: "Post mock 1",
          likes: 0,
          dislikes: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
            {
                id: "id-mock-p2",
                creatorId: "id-mock",
                content: "Post mock 2",
                likes: 1,
                dislikes: 0,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },]

        const response = await postBusiness.getPosts()

        expect(response).toHaveLength(2)  

    })


})