import { ProductModel } from "../models/product.js";
import { validateProduct } from "../scheme/products.js";

export class ProductController {
     static async getAll(req, res) {
          const data = await ProductModel.getAll();
          if (!data) {
               return res.status(500).json({ "message": "Server Internal Error", "status": 500 });
          } else {
               res.json(data).status(200);
          }
     }

     static async getByID(req, res) {
          const { id } = req.params;
          const data = await ProductModel.getById({ id: id });
          if (!data) {
               return res.status(500).json({ "message": "Server Internal Error", "status": 500 });
          } else {
               res.json(data).status(200);
          }
     }

     static async getByCategory(req, res) {
          const { category } = req.params;
          const data = await ProductModel.getByCategory({ category: category });
          if (data.length == 0) {
               return res.json({ data: [] }).status(404)
          }
          else {
               return res.json(data).status(200)
          }
     }

     static async addProduct(req, res) {
          const result = validateProduct({ input: req.body })
          if (!result.success) {
               return res.status(400).json({ error: JSON.parse(result.error.message) })
          }
          const data = await ProductModel.addProduct(result.data)
          if (typeof data != 'string') {
               return res.status(201).json({ message: data })
          }
          else {
               return res.json({ error: data }).status(500)
          }
     }
}