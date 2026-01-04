import express from 'express';
import { createUser, getUser, loginUser } from '../controllers/user.controller.ts';

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.get('/register', getUser);

userRouter.post('/login', loginUser);


export default userRouter;
