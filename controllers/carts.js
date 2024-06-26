import { object } from "zod";
import { CartModel } from "../models/cart.js";

export class CartController {
     static async getCart(req, res) {
          const id = req.headers.user_id;
          const cart = await CartModel.getCart(id);
          return res.json({ cart }).status(200)
     }

     static async addCart(req, res) {
          const { id_user, cart } = req.body;
          if (cart) {
               const rows = await CartModel.getCart(id_user);
               const newCart = Object.entries(cart);
               newCart.map(([key, count]) => {
                    if (rows.some(({ id }) => id == key)) {
                         CartModel.updateCart(count, key, id_user)
                    } else {
                         CartModel.addCart(id_user, key, count)
                    }
               })

               rows.map(({ id }) => {
                    if (!newCart.some(([key]) => key == id)) {
                         CartModel.deleteItemCart(id)
                    }
               })
          } else {
               CartModel.deleteCart(id_user)
               return res.json({
                    cart: 'Cart delete'
               }).status(200)
          }
          return res.json({
               cart: 'Cart upgrade'
          }).status(200)
     }
}