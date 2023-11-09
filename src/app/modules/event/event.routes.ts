import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import { EventController } from './event.controller';
import { EventValidation } from './event.validation';

const router = express.Router();

router.post('/', 
// validateRequest(EventValidation.createEventZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), EventController.createEvent);

router.patch('/:id', 
// validateRequest(EventValidation.updateEventZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), EventController.updateEvent);

router.get('/', EventController.getAllEvents);

router.get('/:id', EventController.getSingleEvent);


router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), EventController.deleteEvent);

export const EventRoutes = router;