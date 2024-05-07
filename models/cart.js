import { db } from "../db/sqlite.js";

export class CartModel {
     static async getCart(id) {
          const { rows } = await db.execute({
               sql: 'SELECT products.id, products.title, products.price, products.stock, products.imageUrl, carrito.count FROM products JOIN carrito ON products.id = carrito.id_product WHERE id_user = ?;',
               args: [id]
          })

          return rows;
     }

     static updateCart(count, id_product, id) {
          db.execute({
               sql: 'update carrito set count = ? where id_product = ? and id_user = ?',
               args: [count, id_product, id]
          })
     }

     static addCart(id, newProduct) {
          db.execute({
               sql: 'insert into carrito (id_user, id_product, count) values (?,?,?)',
               args: [id, newProduct, 1]
          })
     }
}