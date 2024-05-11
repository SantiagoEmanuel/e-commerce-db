import { CartModel } from "../models/cart.js";

export class CartController {
     static async getCart(req, res) {
          const id = req.headers.user_id;
          const cart = await CartModel.getCart(id);
          return res.json({ cart }).status(200)
     }

     static async addCart(req, res) {
          const { id_user, cart } = req.body;
          const rows = await CartModel.getCart(id_user);
          cart.map(({ id: cartId, count }) => {
               if (rows.some(({ id }) => id == cartId)) {
                    rows.map(({ id, stock, title }) => {
                         if (id == cartId) {
                              if (stock - count >= 0) {
                                   CartModel.updateCart(count, id, id_user);
                              } else {
                                   return res.json({
                                        error: '¡No puedes tener mas de este producto, con esa cantidad superas el stock!',
                                        product: title,
                                        id: id,
                                        stock: stock - count
                                   }).status(400)
                              }
                         }
                    })
               } else {
                    CartModel.addCart(id_user, cartId, count)
               }
          })
          return res.json({
               cart: 'Cart upgrade'
          }).status(200)
     }
}