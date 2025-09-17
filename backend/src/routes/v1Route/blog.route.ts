import { Router } from 'express';
import upload from '@/middlewares/multer.middleware';
import createBlog from '@/controllers/v1Controller/blog/createBlog';
import authenticate from '@/middlewares/authenticate.middleware';
import getAllBlogs from '@/controllers/v1Controller/blog/getAllBlogs';

const router = Router();

router.route('/').post(authenticate, upload.single('image'), createBlog);
router.route('/').get(authenticate, getAllBlogs);

export default router;
