import express, { type Express } from 'express';

const app: Express = express();

app.get('/', (_, res) => {
  res.send('Hello from Smart Draft');
});

export default app;
