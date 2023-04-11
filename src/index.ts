import express from 'express'
import cors from 'cors'
import { userRouter } from './routers/usersRouters'
import dotenv from 'dotenv'
import { postsRouter } from './routers/postsRouter'
import { commentRouter } from "./routers/commentRouter"

dotenv.config()
const app = express()

app.use(cors()) 
app.use(express.json()) 

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})
app.use("/users", userRouter)
app.use("/posts", postsRouter)
app.use("/posts/comment", commentRouter)