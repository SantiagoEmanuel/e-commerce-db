import { db } from "../db/sqlite.js";
import { v4 as uuid } from "uuid";

export class ProductModel {
     static async getAll() {
          const { rows } = await db.execute(
               'select * from products join product_categories on products.id = product_categories.id_product;'
          )
          return rows;
     }

     static async getById({ id }) {
          const { rows } = await db.execute({
               sql: 'SELECT * FROM products JOIN product_categories ON products.id = product_categories.id_product where id_product = ?',
               args: [id]
          })
          return rows;
     }

     static async getByCategory({ category }) {
          const { rows } = await db.execute({
               sql: 'SELECT * FROM products JOIN product_categories ON products.id = product_categories.id_product where category = ?;',
               args: [category]
          })
          return rows
     }

     static async addProduct(input) {
          const id = uuid()

          const {
               title,
               price,
               description,
               imageUrl,
               stock,
               category
          } = input

          try {
               const x = await db.execute({
                    sql: 'insert into products (id, title, description, imageUrl, price, stock) values (?,?,?,?,?,?);',
                    args: [id, title, description, imageUrl, price, stock],
               })
               try {
                    const x2 = await db.execute({
                         sql: 'insert into product_categories ( id_product, category ) values (?,?);',
                         args: [id, category]
                    })
                    const result = [{
                         result: 'ok'
                    }]
                    return result;
               } catch (e) {
                    return 'error al crear la relacion del producto con su categoria';
               }
          } catch (e) {
               return 'error al crear el producto';
          }
     }
}