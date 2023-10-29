import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/role';
import auth from '../../middlewares/auth';
import { VanueController } from './vanue.controller';
import { VanueValidation } from './vanue.validation';

const router = express.Router();

router.get('/', VanueController.getAllVanue);

router.get('/:id', VanueController.getSingleVanue);

router.post(
  '/',
  validateRequest(VanueValidation.createVanueZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
 VanueController.createVanue
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(VanueValidation.updateVanueZodSchema),
  VanueController.updateVanue
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), VanueController.deleteVanue);

export const VanueRoutes = router;