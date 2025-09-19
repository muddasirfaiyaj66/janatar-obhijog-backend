import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../auth/auth.route';
import { ComplaintRoutes } from '../modules/complaint/complaint.route';

const router = Router();

const moduleRoutes = [
  //user module routes
  {
    path: '/users',
    route: UserRoutes,
  },
  //auth module routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  //complaint module routes
  {
    path: '/complaints',
    route: ComplaintRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
