import { config as envConfig } from 'dotenv';

envConfig();

const _config = {
  port: process.env.PORT,
  databaseURl: process.env.MONGO_CONNECTION_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWTSECRET,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
