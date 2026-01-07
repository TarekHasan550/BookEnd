import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { createBook } from '../controllers/book.controller.ts';

const bookRouter = express.Router();

const upload = multer({
  dest: path.resolve(import.meta.dirname, '../../public/data/uploads'),
  limits: { fileSize: 10 * 1024 * 1024 },
});

bookRouter.post(
  '/add-book',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
