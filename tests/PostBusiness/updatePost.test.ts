import { PostsBusiness } from '../../src/business/PostsBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { PostDatabaseMock } from '../Mocks/PostDatabaseMock'
import { EditPostInputDTO } from '../../src/interfaces'
import { BadRequestError } from '../../src/Errors/BadRequestError'

describe("Busca posts pelo id", () => {

  const postBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
  )

  test("deve retornar erro se id for inválido", () => {
    const input: EditPostInputDTO = { id: 'p000', newContent: 'new content', token: 'token-mock-normal' }

    expect(async () => {
      await postBusiness.editPost(input)
    }).rejects.toThrow("Id não encontrado")
  })
  test("verifica se id é string", async () => {
    const input: EditPostInputDTO = { id: 'p000', newContent: 'new content', token: 'token-mock-normal' }
    try {
      await postBusiness.editPost(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("Id deve ser string");
      }
    }

  })
  test("verifica caracteres de content", async () => {
    const input: EditPostInputDTO = { id: 'p000', newContent: 'new content', token: 'token-mock-normal' }
    try {
      await postBusiness.editPost(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("Content deve possuir ao menos 2 caracteres");
      }
    }

  })
  test("verifica caracteres de content", async () => {
    const input: EditPostInputDTO = { id: 'p000', newContent: 'new content', token: 'token-mock-normal' }
    try {
      await postBusiness.editPost(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("Content é obrigatório");
      }
    }
  })
  test("verifica caracteres de content", async () => {
    const input: EditPostInputDTO = { id: 'p000', newContent: 'new content', token: 'token-mock-normal' }
    try {
      await postBusiness.editPost(input);
    } catch (error) {
      if (error instanceof BadRequestError) {
        expect(error.message).toBe("Content deve ser string");
      }
    }

  })
  test("deve retornar um erro se Token for inválido", () => {
    const input: EditPostInputDTO = { id: 'p001', newContent: 'new content', token: 'token-mock' }

    expect(async () => {
      await postBusiness.editPost(input)
    }).rejects.toThrow("Token inválido")
  })
  test("deve retornar erro se token não for passado", () => {
    const input = { id: 'p001', token: undefined }

    expect(async () => {
      await postBusiness.deletePost(input)
    }).rejects.toThrow("Espera-se um token")
  })
})