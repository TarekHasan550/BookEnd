import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';
import cloudinary from '../config/cloudinary.ts';
import { BooksModel } from '../models/book.model.ts';
import type { AuthRequest } from '../middlewares/authenticate.ts';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[] | undefined;
  };

  const coverImageType = files.coverImage?.[0]?.mimetype.split('/').at(-1);
  const imageName = files.coverImage?.[0]?.filename;

  if (!imageName) {
    return res.status(400).json({ message: 'Cover image is required' });
  }

  const imagePath = path.resolve(
    import.meta.dirname,
    '../../public/data/uploads',
    imageName
  );

  const fileName = files.file?.[0]?.filename;
  if (!fileName) {
    return res.status(400).json({ message: 'Book file is required' });
  }

  const filePath = path.resolve(
    import.meta.dirname,
    '../../public/data/uploads',
    fileName
  );

  try {
    // Upload cover image
    const uploadsImage = await cloudinary.uploader.upload(imagePath, {
      filename_override: imageName,
      folder: 'book-covers',
      format: coverImageType,
    });

    // Upload book file
    const uploadsFile = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      filename_override: fileName,
      folder: 'book-files',
      format: 'pdf',
    });

    // Create book in database
    const _req = req as AuthRequest;
    const newBook = await BooksModel.create({
      title: title,
      genre: genre,
      author: _req.userId,
      coverImage: uploadsImage.secure_url,
      file: uploadsFile.secure_url,
    });

    // Delete local files (optional - don't block response)
    fs.promises
      .unlink(imagePath)
      .catch((err) => console.error('Failed to delete image:', err));
    fs.promises
      .unlink(filePath)
      .catch((err) => console.error('Failed to delete file:', err));

    // Send success response ONLY ONCE
    return res.status(201).json({
      message: 'Book created successfully',
      id: newBook._id,
    });
  } catch (error) {
    // Clean up files if upload/creation failed
    try {
      await fs.promises.unlink(imagePath);
      await fs.promises.unlink(filePath);
    } catch (cleanupError) {
      console.error('Failed to cleanup files:', cleanupError);
    }

    return next(
      createHttpError(500, 'Error creating book: ' + (error as Error).message)
    );
  }
};

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  const books = await BooksModel.find();
  return res.status(200).json(books);
};

export { createBook, getBooks };
