import { Router } from "express";
import { UserController } from '../controllers/users.js'

export const userRouter = Router()

userRouter.get('/', UserController.getUser)
userRouter.post('/', UserController.createUser)