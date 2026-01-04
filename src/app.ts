import express from 'express';
import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globalErrorHandler.ts';
import userRouter from './routes/user.route.ts';

const app = express();

app.use(express.json());

app.use("/api/users/", userRouter)

app.use(globalErrorHandler);
export default app;
