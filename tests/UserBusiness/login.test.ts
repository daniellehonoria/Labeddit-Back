import { UserBusiness } from "../../src/business/UserBusiness"
import { LoginInputDTO } from "../../src/dtos/UserDTO"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("login", ()=>{
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    test("loga em conta normal e retorna token",async () => {
        const input: LoginInputDTO={
            email: "normal@email.com",
            password: "bananinha"
        }
        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-normal")
    })
    test("loga em conta admin retorna token", async () => {
        const input: LoginInputDTO = {
            email: "admin@email.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-admin")
    })

    test("Retorna erro por login incorreto", async () => {
        const input: LoginInputDTO = {
            email: "erro@gmail.com",
            password: "hash-bananinha"
        }

        expect(async()=>{
            await userBusiness.login(input)
        }).rejects.toThrow("'email' não cadastrado")

    })

    test("Deve retornar erro por senha incorreta", async () => {
        const input: LoginInputDTO = {
            email: "normal@email.com",
            password: "senhaerrada",
        }

        expect(async()=>{
            await userBusiness.login(input)
        }).rejects.toThrow("Senha incorreta")

    })
})