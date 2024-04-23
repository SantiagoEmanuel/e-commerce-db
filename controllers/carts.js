import { CartModel } from "../models/cart.js";
import { ProductModel } from "../models/product.js";

export class CartController {
     static async getCart(req, res) {

          const id = req.headers.user_id;

          const productsID = await CartModel.getIdProduct(id);

          const cart = [];

          productsID.map(async ({ id_product, count }, index) => {
               const rows = await ProductModel.getById({ id: id_product })
               rows.push({ count: count })

               cart.push(rows)

               if (index == productsID.length - 1) {
                    return res.json({ carrito: cart }).status(200)
               }
          })
     }

     static async addCart(req, res) {
          const cart = JSON.parse(req.headers.user_cart);
          const id = JSON.parse(req.headers.user_id)

          const rows = CartModel.getIdProduct(id);

          if (rows.some(({ id_product }) => id_product == cart[0])) {
               rows.map(({ id_product, count }) => {
                    if (id_product == cart[0]) {
                         CartModel.updateCart(count, id_product, id);
                    }
               })
          } else {
               cart.map((newProduct) => {
                    CartModel.addCart(id, newProduct);
               })
          }
     }
}