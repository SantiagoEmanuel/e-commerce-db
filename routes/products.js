import { Router } from "express";
import { ProductController } from "../controllers/products.js";
import { tokenMiddleware } from "../middleware/tokenMiddleware.js";
export const productRouter = Router();
productRouter.post('/', tokenMiddleware)
productRouter.get('/', ProductController.getAll)
productRouter.get('/:id', ProductController.getByID)
productRouter.get('/categories/:category', ProductController.getByCategory)
productRouter.post('/', ProductController.addProduct)