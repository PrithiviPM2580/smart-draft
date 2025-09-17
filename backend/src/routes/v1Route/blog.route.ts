import { Router } from 'express';
import upload from '@/middlewares/multer.middleware';
import createBlog from '@/controllers/v1Controller/blog/createBlog';
import authenticate from '@/middlewares/authenticate.middleware';
import getAllBlogs from '@/controllers/v1Controller/blog/getAllBlogs';
import getBlogById from '@/controllers/v1Controller/blog/getBlogById';
import deleteBlog from '@/controllers/v1Controller/blog/deleteBlog';
import togglePublishStatus from '@/controllers/v1Controller/blog/togglePublishStatus';

const router = Router();

router.route('/').post(authenticate, upload.single('image'), createBlog);
router.route('/').get(authenticate, getAllBlogs);
router.route('/:id').get(authenticate, getBlogById);
router.route('/:id').delete(authenticate, deleteBlog);
router.route('/:id/toggle-status').patch(authenticate, togglePublishStatus);

export default router;
