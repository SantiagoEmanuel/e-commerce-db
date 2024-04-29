import { CartModel } from "../models/cart.js";
import { ProductModel } from "../models/product.js";

export class CartController {
     static async getCart(req, res) {

          const id = req.headers.user_id;

          const productsID = await CartModel.getIdProduct(id);

          const cart = [];

          productsID.map(async ({ id_product, COUNT }, index) => {
               const rows = await ProductModel.getById({ id: id_product })
               rows.push({ count: COUNT })

               cart.push(rows)

               if (index == productsID.length - 1) {
                    return res.json({ carrito: cart }).status(200)
               }
          })
     }

     static async addCart(req, res) {
          const cart = req.body.user_cart;
          const id = req.body.user_id;

          const rows = await CartModel.getIdProduct(id);

          console.log(rows);

          if (rows.some(({ id_product }) => id_product == cart)) {
               rows.map(({ id_product, COUNT }) => {
                    if (id_product == cart) {
                         CartModel.updateCart(COUNT, id_product, id);
                    }
               })
          } else {
               CartModel.addCart(id, cart)
          }

          return res.json({
               cart: 'carrito actualizado'
          }).status(200)
     }
}