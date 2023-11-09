import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/role';
import { FavoriteController } from './favorite.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), 
 FavoriteController.addFavorite);

router.delete('/:id', FavoriteController.removeFavorite);

router.get('/', auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN), FavoriteController.listFavorite);

router.get('/:id', FavoriteController.getFavorite);

export const FavoriteRoutes = router;