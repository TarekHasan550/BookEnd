import {config as envConfig} from 'dotenv'

envConfig()

const _config = {
  port: process.env.PORT,
  databaseURl: process.env.MONGO_CONNECTION_URI,
  
};

export const config = Object.freeze(_config);