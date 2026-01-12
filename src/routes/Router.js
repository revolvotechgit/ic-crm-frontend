import { createBrowserRouter } from 'react-router';
import authRoutes from './modules/authRoutes';
import dashboardRoutes from './modules/dashboardRoutes';

const Router = [
  dashboardRoutes,
  authRoutes,
];

const router = createBrowserRouter(Router);

export default router;
