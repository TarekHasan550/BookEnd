import mongoose from 'mongoose';

export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserType>('User', userSchema);

export { UserModel, };
