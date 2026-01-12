import { lazy } from 'react';
import Loadable from '../../layouts/full/shared/loadable/Loadable';
import BlankLayout from '../../layouts/blank/BlankLayout';
import PublicRoute from '../../components/auth/PublicRoute';
import { Navigate } from 'react-router';

// Authentication pages
const Login = Loadable(lazy(() => import('../../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(lazy(() => import('../../views/authentication/auth2/ForgotPassword2')));
const TwoSteps = Loadable(lazy(() => import('../../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../../views/authentication/Maintenance')));

const authRoutes = {
  path: '/auth',
  element: <PublicRoute><BlankLayout /></PublicRoute>,
  children: [
    { path: '404', element: <Error /> },
    { path: 'login', element: <Login /> },
    { path: 'login2', element: <Login2 /> },
    { path: 'register', element: <Register /> },
    { path: 'register2', element: <Register2 /> },
    { path: 'forgot-password', element: <ForgotPassword /> },
    { path: 'forgot-password2', element: <ForgotPassword2 /> },
    { path: 'two-steps', element: <TwoSteps /> },
    { path: 'two-steps2', element: <TwoSteps2 /> },
    { path: 'maintenance', element: <Maintenance /> },
    { path: '*', element: <Navigate to="/auth/404" /> },
  ],
};

export default authRoutes;
