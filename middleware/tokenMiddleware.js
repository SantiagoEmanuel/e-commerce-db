import jwt from 'jsonwebtoken';

export const tokenMiddleware = (req, res, next) => {
     const userToken = req.headers.authorization;

     const secret = process.env.SECRET_KEY

     jwt.verify(userToken, secret, function (err, decoded) {

          if (err != null) {
               return res.json({ message: "You can't do that!", status: 498, error: err }).status(498)
          }

          next()
     })
}