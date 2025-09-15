import { Router } from 'express';
import upload from '@/middlewares/multer.middleware';
import createBlog from '@/controllers/v1Controller/blog/createBlog';
import authenticate from '@/middlewares/authenticate.middleware';

const router = Router();

router.route('/').post(authenticate, upload.single('image'), createBlog);

export default router;
