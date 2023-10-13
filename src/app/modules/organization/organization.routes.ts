import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrganizationValidation } from './organization.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import { OrganizationController } from './organization.controller';

const router = express.Router();

router.get(
  '/',
 OrganizationController.getAllOrganize
);

router.get(
  '/:id',
  OrganizationController.getSingleOrganization
);

router.post(
  '/',
  validateRequest(OrganizationValidation.createOrganizationZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OrganizationController.createOrganize
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(OrganizationValidation.updateOrganizationZodSchema),
  OrganizationController.updateOrganize
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OrganizationController.deleteOrganization
);

export const OrganizationRoutes = router;