import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/create-booking',
  validateRequest(BookingValidation.createBookingZodSchema),
  auth(ENUM_USER_ROLE.CUSTOMER),
  BookingController.createBooking
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookingController.getAllBooking);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.getSingleBooking
);
router.patch(
  '/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.updateBooking
);
router.patch(
  '/cancel-booking/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookingController.cancelBooking
);
router.patch(
  '/confirm-booking/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.confirmBooking
);
router.patch(
  '/complete-booking/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.completedBooking
);
router.delete(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.deleteBooking
);

export const BookingRoutes = router;