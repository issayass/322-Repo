import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import customerRoutes from './routes/customerRoutes';
import staffRoutes from './routes/staffRoutes';
import managerRoutes from './routes/managerRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import orderRoutes from './routes/orderRoutes'; // <-- Add this
import cartRoutes from './routes/cartRoutes';
const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://effulgent-longma-fd621a.netlify.app',
  'https://issayass.github.io/HarrysDiner.github.io'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/staff', staffRoutes);
app.use('/managers', managerRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/orders', orderRoutes); 
app.use('/cart', cartRoutes);
export default app;
