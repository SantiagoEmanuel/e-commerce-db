import cors from 'cors';

const ALLOW_HOST = process.env.ALLOW_HOST

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
