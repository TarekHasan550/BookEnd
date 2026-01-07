import mongoose, { Schema } from 'mongoose';
import type { UserType } from './user.model.ts';

export interface BookType {
  _id: string;
  title: string;
  author: UserType;
  genre: string;
  coverImage: string;
  file: string;
}

const bookSchema = new mongoose.Schema<BookType>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BooksModel = mongoose.model<BookType>('Book', bookSchema);

export { BooksModel };
