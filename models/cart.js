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

     static deleteItemCart(id_product) {
          db.execute({
               sql: 'delete from carrito where id_product = ?',
               args: [id_product]
          })
     }

     static deleteCart(id) {
          db.execute({
               sql: 'delete carrito where id_user = ?',
               args: [id]
          })
     }

     static addCart(id_user, id_product, count) {
          db.execute({
               sql: 'insert into carrito (id_user, id_product, count) values (?,?,?)',
               args: [id_user, id_product, count]
          })
     }
}