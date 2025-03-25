import Joi from 'joi';

// Validación de variables de entorno
const envSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  MAIL_USER: Joi.string().email(),
  MAIL_PASSWORD: Joi.string()
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export default value;