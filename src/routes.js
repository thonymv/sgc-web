import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Pnf from './pages/Pnf';
import RecoverPassword from './pages/RecoverPass';
import NewUser from './pages/NewUser';
import CreateContent from './pages/CreateContent';
import Historial from './pages/Historial';
import Estadisticas from './pages/Estadisticas';
import PlanEstudio from './pages/PlanesDeEstudio'
import NewPnf from './pages/NewPnf';
import Malla from './pages/Malla';
import CreateMalla from './pages/CreateMalla';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'Pnf', element: <Pnf /> },
        { path: 'NewUser', element: <NewUser /> },
        { path: 'CreateContent', element: <CreateContent /> },
        { path: 'Historial', element: <Historial /> },
        { path: 'Estadisticas', element: <Estadisticas /> },
        { path: 'planestudio', element: <PlanEstudio /> },
        { path: 'newpnf', element: <NewPnf /> },
        { path: 'Malla', element: <Malla /> },
        { path: 'CreateMalla', element: <CreateMalla /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'recoverpassword', element: <RecoverPassword /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'Pnf', element: <Pnf /> },
        { path: 'NewUser', element: <NewUser /> },
        { path: 'planestudio', element: <PlanEstudio /> },
        { path: 'newpnf', element: <NewPnf /> }

      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
