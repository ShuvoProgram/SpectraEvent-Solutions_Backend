import express from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.CUSTOMER),
//  validateRequest(ReviewValidation.createReviewZodSchema), 
 ReviewController.createReview);

router.get('/', ReviewController.getAllReviews);

router.patch('/:id', auth(ENUM_USER_ROLE.CUSTOMER), validateRequest(ReviewValidation.updateReviewZodSchema), ReviewController.updateReview);

router.delete('/:id', auth(ENUM_USER_ROLE.CUSTOMER), ReviewController.deleteReview);

export const ReviewRoutes = router;