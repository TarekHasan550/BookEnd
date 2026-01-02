import express from 'express';
import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globalErrorHandler.ts';

const app = express();

app.get('/', (req, res, next) => {
  const error = createHttpError(500, 'wrong!!!');
  throw error;
});

app.use(globalErrorHandler);
export default app;
