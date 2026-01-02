import mongoose from 'mongoose';
import { config } from './config.ts';

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseURl as string);

    mongoose.connection.on('connected', () => {
      console.log('DB connection successfully..!');
    });

    mongoose.connection.on('error', (err) => {
      console.log('DB connection error!!!', err);
    });
  } catch (error) {
    console.error('Failed to connect with DB!!!');
    process.exit(1);
  }
};

export default connectDB;