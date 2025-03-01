const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const { connectDB } = require('./utils/utils');
const envConfig = require('./config/env.config'); // Importar el validador

require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api/sessions', authRoutes);

// Iniciar servidor
const PORT = envConfig.PORT; // Usar la variable validada
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});