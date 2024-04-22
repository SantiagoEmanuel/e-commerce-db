import { UserModel } from "../models/user.js";
import { validateUser } from "../scheme/user.js";

export class UserController {
     static async getUser(req, res) {
          const { username, password } = req.query;

          const result = await UserModel.getUser({ username: username, password: password });

          if (result.length == 0) { return res.json({ message: 'user not found' }).status(400) }

          res.json({ userInfo: result }).status(200)
     }

     static async createUser(req, res) {
          const result = validateUser({ input: req.body })
          if (!result.success) {
               res.json({ error: JSON.parse(result.error.message) }).status(400)
          }

          const data = await UserModel.createUser(result.data)

          res.json({
               'userInfo': data
          }).status(201);
     }
}