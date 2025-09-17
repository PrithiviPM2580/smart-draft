import { Router } from 'express';
import upload from '@/middlewares/multer.middleware';
import createBlog from '@/controllers/v1Controller/blog/createBlog';
import authenticate from '@/middlewares/authenticate.middleware';
import getAllBlogs from '@/controllers/v1Controller/blog/getAllBlogs';
import getBlogById from '@/controllers/v1Controller/blog/getBlogById';

const router = Router();

router.route('/').post(authenticate, upload.single('image'), createBlog);
router.route('/').get(authenticate, getAllBlogs);
router.route('/:id').get(authenticate, getBlogById);

export default router;
