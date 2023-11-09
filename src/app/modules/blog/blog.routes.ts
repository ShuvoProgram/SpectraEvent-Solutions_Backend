import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';

const router = express.Router();

router.get('/', BlogController.getAllBlog);

router.get('/:id', BlogController.getSingleBlog);

router.post('/',
//  validateRequest(BlogValidation.createBlogZodSchema), 
 auth(ENUM_USER_ROLE.ADMIN), BlogController.createBlog);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN),
//  validateRequest(BlogValidation.updateBlogZodSchema),
  BlogController.updateBlog);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BlogController.deleteBlog);

export const BlogRoutes = router;