import { Router } from 'express';

import signup from '@/controllers/v1Controller/auth/signup';
import login from '@/controllers/v1Controller/auth/login';
import logout from '@/controllers/v1Controller/auth/logout';
import authenticate from '@/middlewares/authenticate.middleware';
import refreshToken from '@/controllers/v1Controller/auth/refresh-token';

const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(authenticate, logout);
router.route('/refresh-token').post(refreshToken);

export default router;
