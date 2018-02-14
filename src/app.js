import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import notFound from './middleware/not-found';
import errorHandler from './middleware/error-handler';
import appRouter from './controllers';

export default async () => {
  const app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(appRouter);

  // catch 404 and forward to error handler
  app.use(notFound);
  // error handler
  app.use(errorHandler);

  return app;
};
