import { db } from "../db/sqlite.js";

export class CartModel {
     static async getIdProduct(id) {
          const { rows } = await db.execute({
               sql: 'select id_product, count from carrito where id_user = ?',
               args: [id]
          })

          return rows;
     }

     static updateCart(count, id_product, id) {
          db.execute({
               sql: 'update carrito set count = ? where id_product = ? and id_user = ?',
               args: [count + 1, id_product, id]
          })
     }

     static addCart(id, newProduct) {
          db.execute({
               sql: 'insert into carrito (id_user, id_product, count) values (?,?, ?)',
               args: [id, newProduct, 1]
          })
     }
}