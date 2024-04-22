import { ProductModel } from "../models/product.js";
import { validateProduct } from "../scheme/products.js";

export class ProductController {
     static async getAll(req, res) {
          const data = await ProductModel.getAll();
          if (!data) return res.status(500).json({ "message": "Server Internal Error", "status": 500 });
          res.json(data).status(200);
     }

     static async getByID(req, res) {
          const { id } = req.params;
          const data = await ProductModel.getById({ id: id });
          res.json(data).status(200);
     }

     static async getByCategory(req, res) {
          const { category } = req.params;
          const data = await ProductModel.getByCategory({ category: category });
          res.json(data).status(200)
     }

     static addProduct(req, res) {

          const result = validateProduct({ input: req.body })
          if (!result.success) {
               return res.status(400).json({ error: JSON.parse(result.error.message) })
          }

          const data = ProductModel.addProduct(result.data)
          if (data) res.status(201).json({ message: data, success: 'Product created!' })

          res.json({ error: 'Server error' }).status(500)
     }
}