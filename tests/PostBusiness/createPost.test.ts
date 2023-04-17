import { CreatePostInputDTO } from "../../src/interfaces"
import {PostsBusiness} from "../../src/business/PostsBusiness"
import { PostDatabaseMock } from "../Mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { BadRequestError } from "../../src/Errors/BadRequestError"

describe("Busca posts",()=>{

    const postBusiness = new PostsBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    test("Deve criar um post", async()=>{
        const input:CreatePostInputDTO = 
        {token: "token-mock-normal", content:"teste"}
        
        const response = await postBusiness.createPost(input)

        expect(response).toBeFalsy()   
        
    })
    test("deve retornar erro se token não for passado", ()=>{
      const input = {id:'p001', token: undefined}

      expect(async()=>{
          await postBusiness.deletePost(input)
      }).rejects.toThrow("Espera-se um token")
  })

    test("Deve retornar um erro se token for inválido", ()=>{
        const input = {token: 'token-mock', content:'teste'}
        
        expect(async()=>{
            await postBusiness.createPost(input)
        }).rejects.toThrow("Token inválido")
    })
    test ("verifica caracteres de content",async () => {
        const input={content: 'new content', token: 'token-mock-normal'}
        try {
            await postBusiness.createPost(input);
          } catch (error) {
            if (error instanceof BadRequestError) {
              expect(error.message).toBe("Content deve possuir ao menos 2 strings");
            }
          }
        
    })
    test ("verifica se caracteres de content são string",async () => {
        const input={content: 'new content', token: 'token-mock-normal'}
        try {
            await postBusiness.createPost(input);
          } catch (error) {
            if (error instanceof BadRequestError) {
              expect(error.message).toBe("Content deve ser strings");
            }
          }
        
    })
    test ("verifica se recebeu tpken",async () => {
        const input={content: 'new content', token: 'token-mock-normal'}
        try {
            await postBusiness.createPost(input);
          } catch (error) {
            if (error instanceof BadRequestError) {
              expect(error.message).toBe("Espera-se um token");
            }
          }
        
    })
    
})