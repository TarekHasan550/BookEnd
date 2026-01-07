import { v2 as cloudinary } from 'cloudinary';
import { config as conf } from './config.ts';

cloudinary.config({
  cloud_name: conf.cloudinaryName,
  api_key: conf.cloudinaryApiKey,
  api_secret: conf.cloudinaryApiSecret,
});

export default cloudinary;
