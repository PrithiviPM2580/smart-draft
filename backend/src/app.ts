import express, { type Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from '@/lib/cors.lib';
import { logger } from '@/lib/logger.lib';
import { getHealthStatus } from '@/lib/health.lib';
import compressionMiddleware from '@/middlewares/compression.middleware';
import { globalErrorHandler } from '@/middlewares/globalErrorHandeler.middleware';

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

app.get('/', (_, res) => {
  res.send('Hello from Smart Draft');
});

app.get('/health', async (_, res) => {
  const health = await getHealthStatus();
  const httpStatus = health.status === 'OK' ? 200 : 503;
  res.status(httpStatus).json(health);
});

app.use(globalErrorHandler);

export default app;
