import { Router } from "express";
import { ProductController } from "../controllers/products.js";

export const productRouter = Router();

productRouter.get('/', ProductController.getAll)
productRouter.get('/:id', ProductController.getByID)
productRouter.get('/categories/:category', ProductController.getByCategory)
productRouter.post('/', ProductController.addProduct)