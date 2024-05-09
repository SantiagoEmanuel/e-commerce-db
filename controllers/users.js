import { UserModel } from "../models/user.js";
import { validateUser } from "../scheme/user.js";
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET_KEY
export class UserController {
     static async getUser(req, res) {
          const { username, password } = req.headers;
          const result = await UserModel.getUser({ username: username, password: password });
          if (result.length == 0) { return res.json({ message: 'user not found' }).status(400) }
          const token = jwt.sign({
               "id": result.id,
               "username": result.username,
               "email": result.email,
               "first_name": result.first_name,
               "last_name": result.last_name,
               "status": result.status
          },
               secret,
               {
                    expiresIn: '2h',
               })
          return res.json({ userInfo: result[0], token: token }).status(200)
     }

     static createUser(req, res) {
          const result = validateUser({ input: req.body })
          if (!result.success) {
               return res.json({ error: JSON.parse(result.error.message) }).status(400)
          } else {
               UserModel.createUser(result.data)
               return res.json({
                    ok: true
               }).status(201);
          }
     }
}