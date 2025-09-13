import { Router } from 'express';

import signup from '@/controllers/v1Controller/auth/signup';

const router = Router();

router.route('/signup').post(signup);

export default router;
