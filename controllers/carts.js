import { CartModel } from "../models/cart.js";

export class CartController {
     static async getCart(req, res) {
          const id = req.headers.user_id;
          const cart = await CartModel.getCart(id);
          return res.json({ cart }).status(200)
     }

     static async addCart(req, res) {
          const cart = req.body.user_cart;
          const userID = req.body.user_id;
          const productCount = req.body.product_count;
          const rows = await CartModel.getCart(userID);
          if (rows.some(({ id }) => id == cart)) {
               rows.map(({ id, stock, COUNT }) => {
                    if (id == cart) {
                         if (stock - COUNT > 0 && stock - (productCount + COUNT) >= 0) {
                              CartModel.updateCart((COUNT + productCount), id, userID);
                              return res.json({
                                   cart: 'carrito actualizado',
                                   count: COUNT + productCount
                              }).status(200)
                         } else {
                              return res.json({
                                   error: '¡No puedes tener mas de este producto, con esa cantidad superas el stock!'
                              }).status(400)
                         }
                    }
               })
          } else {
               CartModel.addCart(userID, cart)
               return res.json({
                    cart: 'carrito actualizado'
               }).status(200)
          }
     }
}