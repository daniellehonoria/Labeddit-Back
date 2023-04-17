import { BadRequestError } from "../../src/Errors/BadRequestError"
import { UserBusiness } from "../../src/business/UserBusiness"
import { SignupInputDTO } from "../../src/dtos/UserDTO"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe ("signup",()=>{
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    test("cadastra novo usuário retorna token", async()=>{
        const input: SignupInputDTO={
            email:"normal@email.com",
            name: "Nome mock",
            password: "bananinha"
        }
        const response = await userBusiness.signup(input)
        expect (response.token).toBe("token-mock-normal")
    })
test ("verifica se name é string",async () => {
    const input: SignupInputDTO={
        email:"normal@email.com",
        name: "Nome mock",
        password: "bananinha"
    }
    try {
        await userBusiness.signup(input);
      } catch (error) {
        if (error instanceof BadRequestError) {
          expect(error.message).toBe("'name' deve ser string");
        }
      }
    
})
test("verifica se e-mail é string", async () => {
    const input: SignupInputDTO={
        email:"normal@email.com",
        name: "Nome mock",
        password: "bananinha"
    }

    try {
      await userBusiness.signup(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("'email' deve ser string")
      }
    }
  })
  test("verifica se password é string", async () => {
    const input: SignupInputDTO={
        email:"normal@email.com",
        name: "Nome mock",
        password: "bananinha"
    }

    try {
      await userBusiness.signup(input)
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("'password' deve ser string")
      }
    }
  })
    })
