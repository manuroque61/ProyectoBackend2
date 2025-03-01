const Joi = require('joi');

// Definir el esquema de validación para las variables de entorno
const envSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
}).unknown(true); // Permite otras variables no definidas en el esquema

// Validar las variables de entorno
const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Configuración de entorno inválida: ${error.message}`);
}

module.exports = value;