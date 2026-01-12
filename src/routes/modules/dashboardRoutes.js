import { lazy } from 'react';
import Loadable from '../../layouts/full/shared/loadable/Loadable';
import FullLayout from '../../layouts/full/FullLayout';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import RootRedirect from '../../components/auth/RootRedirect';
import { Navigate } from 'react-router';

// Dashboard pages
const ModernDash = Loadable(lazy(() => import('../../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../../views/dashboard/Ecommerce')));

// Essential Apps
const Chats = Loadable(lazy(() => import('../../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../../views/apps/email/Email')));
const Tickets = Loadable(lazy(() => import('../../views/apps/tickets/Tickets')));
const Contacts = Loadable(lazy(() => import('../../views/apps/contacts/Contacts')));
const Kanban = Loadable(lazy(() => import('../../views/apps/kanban/Kanban')));

// User Profile
const UserProfile = Loadable(lazy(() => import('../../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../../views/apps/user-profile/Gallery')));

// Invoice
const InvoiceList = Loadable(lazy(() => import('../../views/apps/invoice/List')));
const InvoiceCreate = Loadable(lazy(() => import('../../views/apps/invoice/Create')));
const InvoiceDetail = Loadable(lazy(() => import('../../views/apps/invoice/Detail')));
const InvoiceEdit = Loadable(lazy(() => import('../../views/apps/invoice/Edit')));

// Ecommerce
const Ecommerce = Loadable(lazy(() => import('../../views/apps/eCommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../../views/apps/eCommerce/EcommerceDetail')));
const EcommerceAddProduct = Loadable(lazy(() => import('../../views/apps/eCommerce/EcommerceAddProduct')));
const EcommerceEditProduct = Loadable(lazy(() => import('../../views/apps/eCommerce/EcommerceEditProduct')));
const EcomProductList = Loadable(lazy(() => import('../../views/apps/eCommerce/EcomProductList')));
const EcomProductCheckout = Loadable(lazy(() => import('../../views/apps/eCommerce/EcommerceCheckout')));

// Pages
const Pricing = Loadable(lazy(() => import('../../views/pages/pricing/Pricing')));
const AccountSetting = Loadable(lazy(() => import('../../views/pages/account-setting/AccountSetting')));
const Faq = Loadable(lazy(() => import('../../views/pages/faq/Faq')));

// Widgets
const WidgetCards = Loadable(lazy(() => import('../../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../../views/widgets/charts/WidgetCharts')));

const dashboardRoutes = {
  path: '/',
  element: <ProtectedRoute><FullLayout /></ProtectedRoute>,
  children: [
    { path: '/', element: <RootRedirect /> },
    { path: '/dashboards/modern', exact: true, element: <ModernDash /> },
    { path: '/dashboards/ecommerce', exact: true, element: <EcommerceDash /> },

    // Apps
    { path: '/apps/chats', element: <Chats /> },
    { path: '/apps/notes', element: <Notes /> },
    { path: '/apps/calendar', element: <Calendar /> },
    { path: '/apps/email', element: <Email /> },
    { path: '/apps/tickets', element: <Tickets /> },
    { path: '/apps/contacts', element: <Contacts /> },
    { path: '/apps/kanban', element: <Kanban /> },

    // Ecommerce
    { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
    { path: '/apps/ecommerce/eco-product-list', element: <EcomProductList /> },
    { path: '/apps/ecommerce/eco-checkout', element: <EcomProductCheckout /> },
    { path: '/apps/ecommerce/add-product', element: <EcommerceAddProduct /> },
    { path: '/apps/ecommerce/edit-product', element: <EcommerceEditProduct /> },
    { path: '/apps/ecommerce/detail/:id', element: <EcommerceDetail /> },

    // Invoice
    { path: '/apps/invoice/list', element: <InvoiceList /> },
    { path: '/apps/invoice/create', element: <InvoiceCreate /> },
    { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
    { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },

    // User Profile
    { path: '/apps/followers', element: <Followers /> },
    { path: '/apps/friends', element: <Friends /> },
    { path: '/apps/gallery', element: <Gallery /> },
    { path: '/user-profile', element: <UserProfile /> },

    // Pages
    { path: '/pages/pricing', element: <Pricing /> },
    { path: '/pages/account-settings', element: <AccountSetting /> },
    { path: '/pages/faq', element: <Faq /> },

    // Widgets
    { path: '/widgets/cards', element: <WidgetCards /> },
    { path: '/widgets/banners', element: <WidgetBanners /> },
    { path: '/widgets/charts', element: <WidgetCharts /> },

    { path: '*', element: <Navigate to="/auth/404" /> },
  ],
};

export default dashboardRoutes;
