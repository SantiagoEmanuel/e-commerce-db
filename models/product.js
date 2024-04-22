// import { db } from "../db/sql.js";
import { db } from "../db/sqlite.js";

export class ProductModel {
     static async getAll() {
          // const [rows] = await db.query('select * from products;');
          const { rows } = await db.execute(
               'select * from products;'
          )
          return rows;
     }

     static async getById({ id }) {
          // const [results] = await db.query(`select * from products where id = ?;`, [id])
          const { rows } = await db.execute({
               sql: 'select * from products where id = ?',
               args: [id]
          })
          return rows;
     }

     static async getByCategory({ category }) {
          // const [result] = await db.query(`select * from products where category = ?;`, [category]);
          const { rows } = await db.execute({
               sql: 'select * from products where category = ?',
               args: [category]
          })
          return rows;
     }

     static async addProduct(input) {

          const {
               title,
               price,
               description,
               category,
               imageUrl,
               stock
          } = input

          try {
               // await db.query(`insert into products (title, description, category, image, price) values (?,?,?,?,?);`, [title, description, category, imageUrl, price])

               db.execute({
                    sql: 'insert into products (title, description, category, imageUrl, price, stock) values (?,?,?,?,?,?);',
                    args: [title, description, category, imageUrl, price, stock]
               })

               return true
          } catch (e) {
               throw new Error("Error al crear el producto!")
          }

     }
}
