import express, { json, query } from 'express';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import { disable } from './middleware/disable.js';
import { productRouter } from './routes/products.js';
import { userRouter } from './routes/users.js'

const app = express();
const PORT = process.env.PORT || 1234;

app.use(json({ "content-type": "application/json" }))
app.use(corsMiddleware());
app.disable(disable)

// PRODUCT ROUTES.
app.use('/products', productRouter)

// USER ROUTES.
app.use('/user', userRouter)

app.use((req, res) => {
     res.status(404).json({ status: 404, message: 'Not Found' })
})

app.listen(PORT, () => {
     console.log(`El servidor esta funcionando en http://localhost:${PORT}`);
})