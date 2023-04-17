import {PostsBusiness} from '../../src/business/PostsBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { PostDatabaseMock } from '../Mocks/PostDatabaseMock'

describe("likeDislikePost",()=>{

    const postBusiness = new PostsBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test("deve retornar erro se token não for passado", ()=>{
        const input = {id:'p001', token: undefined}

        expect(async()=>{
            await postBusiness.deletePost(input)
        }).rejects.toThrow("Espera-se um token")
    })
    test("deve retornar erro se like não for booleano", ()=>{
        const input = {id:'p001', like: 8, token: 'token-mock-admin'}

        expect(async()=>{
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toThrow("Like deve ser booleano")
    })

    test("deve retornar erro se token for inválido", ()=>{
        const input = {id:'p001',like:1, token: 'token-mock'}
        
        expect(async()=>{
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toThrow("Token inválido")
    })
   
})