import express, { type Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from '@/lib/cors.lib';
import { logger } from '@/lib/logger.lib';
import compressionMiddleware from '@/middlewares/compression.middleware';
import { globalErrorHandler } from '@/middlewares/globalErrorHandeler.middleware';
import v1Routes from '@/routes/v1Route';

const app: Express = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(compressionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);
app.use('/api/v1', v1Routes);
app.use(globalErrorHandler);

export default app;
