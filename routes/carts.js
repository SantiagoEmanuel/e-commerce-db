import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware.js";
import { CartController } from "../controllers/carts.js";

export const cartRouter = Router()

cartRouter.use(tokenMiddleware)
cartRouter.get('/', CartController.getCart);
cartRouter.post('/', CartController.addCart);