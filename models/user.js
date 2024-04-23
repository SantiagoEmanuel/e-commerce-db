import { db } from "../db/sqlite.js";
// import { db } from "../db/sql.js";

export class UserModel {
     static async getUser({ username, password }) {
          // SQL
          // const [result] = await db.query('select username, password from users where username = ? and password = ?', [username, password])

          // SQL in TURSO
          const { rows } = await db.execute({
               sql: 'select id, username, email, first_name, last_name, status from users where username = ? and password = ?',
               args: [username, password]
          })

          return rows;
     }

     static async createUser({ username, email, first_name, last_name, password, status }) {

          try {

               // db.query('insert into users(username, email, first_name, last_name, password, status) values (?,?,?,?,?,?)', [username, email, first_name, last_name, password, status])

               db.execute({
                    sql: 'insert into users(username, email, first_name, last_name, password, status) values (?,?,?,?,?,?)',
                    args: [username, email, first_name, last_name, password, status]
               })

               const { rows } = await db.execute({
                    sql: 'select username, password from users where username = ? and password = ?',
                    args: [username, password]
               })
               console.log(rows);

               return rows;

          } catch (error) {
               throw new Error({ error: error.message })
          }
     }
}