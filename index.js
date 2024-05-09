import express from 'express';
import { disable } from './middleware/disable.js';
import { productRouter } from './routes/products.js';
import { userRouter } from './routes/users.js'
import { cartRouter } from './routes/carts.js';
import { categoriesRouter } from './routes/categories.js';
import { corsMiddleware } from './middleware/corsMiddleware.js'

const whiteList = process.env.ALLOW_HOST

const app = express();
const PORT = process.env.PORT || 5000;

app.post('/user', (req, res, next) => {
     if (req.method !== 'POST') {
          return next();
     }

     let body = ''
     req.on('data', chunk => {
          body += chunk.toString();
     })
     req.on('end', () => {
          req.body = body
          next()
     })
})
app.use(corsMiddleware());
app.disable(disable)


// TODO ▶️ create "categories" route and create categories in database, create the reference with products.
app.use('/categories', categoriesRouter)
// PRODUCT ROUTES.
app.use('/products', productRouter)
// USER ROUTES.
app.use('/user', userRouter)
// CART ROUTES
app.use('/cart', cartRouter)
app.use((req, res) => {
     res.status(404).json({ status: 404, message: 'Not Found' })
})
app.listen(PORT)