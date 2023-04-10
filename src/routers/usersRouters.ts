import express  from "express"
import { UsersController } from "../controller/UsersController"
import { UserBusiness } from "../business/UsersBusiness"
import { UsersDatabase } from "../database/UsersDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"


export const userRouter = express.Router()

const userController = new UsersController(
    new UserBusiness(
        new UsersDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)