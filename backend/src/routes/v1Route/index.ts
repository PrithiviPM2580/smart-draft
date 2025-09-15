import { Router } from 'express';
import { getHealthStatus } from '@/lib/health.lib';
import authRoute from '@/routes/v1Route/auth.route';
import blogRoute from '@/routes/v1Route/blog.route';

const router = Router();

router.get('/', (_, res) => {
  res.send('Hello from Smart Draft');
});

router.get('/health', async (_, res) => {
  const health = await getHealthStatus();
  const httpStatus = health.status === 'OK' ? 200 : 503;
  res.status(httpStatus).json(health);
});

router.use('/auth', authRoute);
router.use('/blog', blogRoute);

export default router;
