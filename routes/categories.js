import { Router } from "express";
import { db } from "../db/sqlite.js";

export const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res) => {
     const { rows } = await db.execute('select category from categories')

     if (!rows) {
          return res.json({
               error: 'Server Error',
          }).status(500)
     }

     return res.json(rows).status(200)
})