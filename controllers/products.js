import { ProductModel } from "../models/product.js";
import { validateProduct } from "../scheme/products.js";

export class ProductController {
     static async getAll(req, res) {
          const data = [];
          const rows = await ProductModel.getAll();

          if (!rows) {
               return res.status(500).json({ "message": "Server Internal Error", "status": 500 });
          }

          rows.map(async (product, index) => {
               const producto = []
               const category = await ProductModel.getProductCategory(product.id);
               producto.push(product, category[0])
               data.push(producto)

               if (index == rows.length - 1) {
                    if (!data) return res.status(500).json({ "message": "Server Internal Error", "status": 500 });
                    res.json(data).status(200);
               }
          })
     }

     static async getByID(req, res) {
          const { id } = req.params;
          const product = await ProductModel.getById({ id: id });
          product.map(async ({ id }) => {
               const data = [];
               const category = await ProductModel.getProductCategory(id)
               data.push(product[0], category[0])

               res.json(data).status(200);
          })
     }

     static async getByCategory(req, res) {
          const productData = [];
          const { category } = req.params;
          const data = await ProductModel.getByCategory({ category: category });
          if (data.length == 0) return res.json({ data: [] }).status(404)
          data.map(async ({ id_product }, index) => {
               const row = await ProductModel.getById({ id: id_product })
               productData.push(row)
               if (index == data.length - 1) {
                    return res.json(productData).status(200)
               }
          })
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