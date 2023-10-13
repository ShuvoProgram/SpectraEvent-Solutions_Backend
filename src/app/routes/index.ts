import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
{
  path: '/auth',
  routes: AuthRoutes
},
{
  path: '/user',
  routes: UserRoutes
},
{
  path: '/admin',
  routes: AdminRoutes
}
]

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;

