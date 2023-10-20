import express from 'express';
import { FaqController } from './faq.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FaqValidation } from './faq.validation';
import { ENUM_USER_ROLE } from '../../../enums/role';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', FaqController.getAllFaq);

router.get('/:id', FaqController.getSingleFaq);

router.post(
  '/',
  validateRequest(FaqValidation.createFaqZodSchema),
  // auth(ENUM_USER_ROLE.ADMIN),
  FaqController.createFaq
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FaqValidation.updateFaqZodSchema),
  FaqController.updateFaq
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), FaqController.deleteFaq);

export const FaqRoutes = router;