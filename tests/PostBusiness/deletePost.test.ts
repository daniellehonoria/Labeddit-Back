import { CreatePostInputDTO } from "../../src/interfaces"
import {PostsBusiness} from "../../src/business/PostsBusiness"
import { PostDatabaseMock } from "../Mocks/PostDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"

describe("deletePost",()=>{

    const postBusiness = new PostsBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test("Excluir post por id", async ()=>{
        const input = {id:'id-mock-p1', token: 'token-mock-admin'}

       const response = await postBusiness.deletePost(input)

       expect(response).not.toBe(input)
    })
   
    test("deve retornar erro caso não encontre o id", ()=>{
        const input = {id:'p000', token: 'token-mock-normal'}

        expect(async()=>{
            await postBusiness.deletePost(input)
        }).rejects.toThrow("Id não encontrado")
    })

    test("deve retornar erro se token for inválido", ()=>{
        const input = {id:'p001', token: 'token-mock'}

        expect(async()=>{
            await postBusiness.deletePost(input)
        }).rejects.toThrow("Token inválido")
    })
    test("deve retornar erro se token não for passado", ()=>{
        const input = {id:'p001', token: undefined}

        expect(async()=>{
            await postBusiness.deletePost(input)
        }).rejects.toThrow("Espera-se um token")
    })
})