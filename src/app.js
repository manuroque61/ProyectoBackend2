import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './config/env.config.js';
import initializePassport from './config/passport.config.js';
import cartRoutes from './routes/carts.routes.js';
import userRoutes from './routes/users.routes.js';

const app = express();

// Middlewares básicos
app.use(cors({ origin: config.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Database
mongoose.connect(config.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

// Passport
initializePassport();

// Routes
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);

// Server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});