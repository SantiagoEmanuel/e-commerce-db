import { CartModel } from "../models/cart.js";

export class CartController {
     static async getCart(req, res) {
          const id = req.headers.user_id;
          const cart = await CartModel.getCart(id);
          return res.json({ cart }).status(200)
     }

     static async addCart(req, res) {
          const { id_product, id_user, count_product } = req.body;
          const rows = await CartModel.getCart(id_user);
          if (rows.some(({ id }) => id == id_product)) {
               rows.map(({ id, stock, COUNT }) => {
                    if (id == id_product) {
                         if (stock - COUNT > 0 && stock - (count_product + COUNT) >= 0) {
                              CartModel.updateCart((COUNT + count_product), id, id_user);
                              return res.json({
                                   cart: 'carrito actualizado',
                                   count: COUNT + count_product
                              }).status(200)
                         } else {
                              return res.json({
                                   error: '¡No puedes tener mas de este producto, con esa cantidad superas el stock!'
                              }).status(400)
                         }
                    }
               })
          } else {
               CartModel.addCart(id_user, id_product)
               return res.json({
                    cart: 'carrito actualizado'
               }).status(200)
          }
     }
}