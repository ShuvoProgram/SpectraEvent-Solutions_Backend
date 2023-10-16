import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import validateRequest from '../../middlewares/validateRequest';
import { FavoriteValidation } from './favorite.validation';
import { FavoriteController } from './favorite.controller';

const router = express.Router();

router.post('/add', auth(ENUM_USER_ROLE.CUSTOMER), validateRequest(FavoriteValidation.createFavoriteZodSchema), FavoriteController.addFavorite);

router.delete('/:id', FavoriteController.removeFavorite);

router.get('/', auth(ENUM_USER_ROLE.CUSTOMER), FavoriteController.listFavorite);

router.get('/:id', FavoriteController.getFavorite);

export const FavoriteRoutes = router;