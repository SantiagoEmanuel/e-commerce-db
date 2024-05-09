import { db } from "../db/sqlite.js";

export class UserModel {
     static async getUser({ username, password }) {
          const { rows } = await db.execute({
               sql: 'select id, username, email, first_name, last_name, status from users where username = ? and password = ?',
               args: [username, password]
          })
          return rows;
     }

     static createUser({ username, email, first_name, last_name, password, status }) {
          try {
               db.execute({
                    sql: 'insert into users(username, email, first_name, last_name, password, status) values (?,?,?,?,?,?)',
                    args: [username, email, first_name, last_name, password, status]
               })
          } catch (error) {
               throw new Error({ error: error.message })
          }
     }
}