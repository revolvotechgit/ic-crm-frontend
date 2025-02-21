import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import AuthGuard from '../guards/authGuard/AuthGuard';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));

/* ****Apps***** */
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));

const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting')),
);

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);

const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));
const ResetCode = Loadable(lazy(() => import('../views/authentication/auth1/ResetCode')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/auth1/ResetPassword')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

// front end pages
const Homepage = Loadable(lazy(() => import('../views/pages/frontend-pages/Homepage')));
const About = Loadable(lazy(() => import('../views/pages/frontend-pages/About')));
const Contact = Loadable(lazy(() => import('../views/pages/frontend-pages/Contact')));
const Portfolio = Loadable(lazy(() => import('../views/pages/frontend-pages/Portfolio')));
const PagePricing = Loadable(lazy(() => import('../views/pages/frontend-pages/Pricing')));
const BlogPage = Loadable(lazy(() => import('../views/pages/frontend-pages/Blog')));
const BlogPost = Loadable(lazy(() => import('../views/pages/frontend-pages/BlogPost')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/reset-code', element: <ResetCode /> },
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/landingpage', element: <Landingpage /> },
      { path: '/frontend-pages/homepage', element: <Homepage /> },
      { path: '/frontend-pages/about', element: <About /> },
      { path: '/frontend-pages/contact', element: <Contact /> },
      { path: '/frontend-pages/portfolio', element: <Portfolio /> },
      { path: '/frontend-pages/pricing', element: <PagePricing /> },
      { path: '/frontend-pages/blog', element: <BlogPage /> },
      { path: '/frontend-pages/blog/detail/:id', element: <BlogPost /> },
    ],
  },
  {
    path: '/dashboards',
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      { path: 'modern', element: <ModernDash /> },
      { path: 'ecommerce', element: <EcommerceDash /> },
      { path: 'apps/chats', element: <Chats /> },
      { path: 'apps/notes', element: <Notes /> },
      { path: 'apps/calendar', element: <Calendar /> },
      { path: 'apps/email', element: <Email /> },
      { path: 'apps/tickets', element: <Tickets /> },
      { path: 'apps/contacts', element: <Contacts /> },
      { path: 'pages/account-settings', element: <AccountSetting /> },
    ],
  },
  {
    path: '/auth/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '*',
    element: <Navigate to="/auth/404" />,
  },
];

const router = createBrowserRouter(Router);

export default router;
