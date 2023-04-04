import express  from "express"
import { UsersController } from "../controller/UsersController"
import { UsersBusiness } from "../business/UsersBusiness"


export const userRouter = express.Router()

const userController = new UsersController(
    //new UsersBusiness()
)
//userRouter.post("/signup", userController.signup)
//userRouter.post("/login", userController.login)