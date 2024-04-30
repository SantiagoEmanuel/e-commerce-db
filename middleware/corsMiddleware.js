import cors from 'cors';

const ALLOW_HOST = process.env.ALLOW_HOST || [
     'https://e-commerce-delta-livid-65.vercel.app/',
     'http://localhost:5173',
     'http://localhost:5173/futbol',
     'http://localhost:5173/voley',
     'http://localhost:5173/bastquet',
     'http://localhost:5173/login',
     'http://localhost:5173/create-product'
];

export const corsMiddleware = ({ acceptedOrigins = ALLOW_HOST } = {}) => cors({
     origin: (origin, callback) => {
          if (acceptedOrigins.includes(origin)) {
               return callback(null, true);
          }
          if (!origin) {
               return callback(null, true);
          }

          return callback(new Error('Access denied!'));
     }
})