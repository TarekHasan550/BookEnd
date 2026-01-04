import bcrypt from 'bcrypt';
import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.ts';
import { UserModel, type User } from '../models/user.model.ts';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation...
  if (!name || !email || !password) {
    const allFieldError = createHttpError(400, 'All fields are required!!!');
    return next(allFieldError);
  }

  const user = await UserModel.findOne({ email });

  // duplication user checking...
  if (user) {
    const duplicateUserError = createHttpError(400, 'User already exits!!!');
    return next(duplicateUserError);
  }

  // password hashing...
  const hashPass = await bcrypt.hash(password, 10);

  // create new user...
  let newUser: User;
  try {
    newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });
  } catch (error) {
    return next(createHttpError(500, 'Something wrong during create user!!!'));
  }
  // jwt token generator...
  try {
    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: '7d',
    });
    res.status(201).json({ message: 'Register User.', accessToken: token });
  } catch (error) {
    return next(createHttpError(500, 'Something wrong during  create user!!!'));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  //validation...
  if (!email || !password) {
    const allFieldError = createHttpError(400, 'All fields required!!!');
    return next(allFieldError);
  }

  let user: User | null;
  try {
    user = await UserModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, 'User not found!!!'));
    }
  } catch (error) {
    return next(createHttpError(500, 'Something wrong during logged in!!!'));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(createHttpError(401, 'Username or Password incorrect!!!'));
  }
  try {
    const token = jwt.sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: '7d',
    });
    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Something wrong during logged in!!!"));
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'all user list...' });
};

export { createUser, getUser, loginUser };
