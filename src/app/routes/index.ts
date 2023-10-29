import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { EventRoutes } from '../modules/event/event.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { FavoriteRoutes } from '../modules/favorite/favorite.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { VanueRoutes } from '../modules/vanue/vanue.routes';

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
  },
  {
    path: '/category',
    routes: CategoryRoutes
  },
  {
    path: '/event',
    routes: EventRoutes
  },
  {
    path: '/review',
    routes: ReviewRoutes
  },
  {
    path: '/faq',
    routes: FaqRoutes
  },
  {
    path: '/booking',
    routes: BookingRoutes
  },
  {
    path: '/favorite',
    routes: FavoriteRoutes
  },
  {
    path: '/blog',
    routes: BlogRoutes
  },
  {
    path: '/feedback',
    routes: FeedbackRoutes
  },
  {
    path: '/vanue',
    routes: VanueRoutes
  }
]

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;

