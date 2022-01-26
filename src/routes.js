import { Navigate, useRoutes, useLocation } from 'react-router-dom';
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
import Preloader from './pages/Preloader';
import RecoverPassword from './pages/RecoverPass';
import NewUser from './pages/NewUser';
import CreateContent from './pages/CreateContent';
import Historial from './pages/Historial';
import Estadisticas from './pages/Estadisticas';
import PlanEstudio from './pages/PlanesDeEstudio'
import NewPnf from './pages/NewPnf';
import Malla from './pages/Malla';
import CreateMalla from './pages/CreateMalla';
import api from './services/api';
import { useEffect, useState } from 'react';
import { element } from 'prop-types';
// ----------------------------------------------------------------------

export default function Router() {
  const [status, setStatus] = useState(1) // 0 no logueado / 1 cargando / 2 logueado
  const location = useLocation()

  useEffect(() => {
    api.get('api/user', { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        if (response.data?.id) {
          setStatus(2)
        } else {
          setStatus(0)
        }
      })
      .catch((err) => {
        setStatus(0)
      })
  }, [location])

  const handleDashboard = (element, status) =>
    status == 0
      ? <Navigate to="/login" replace />
      : status == 2
        ? element
        : <Preloader />
  const handleLogin = (element, status) =>
    status == 0
      ? element
      : status == 2
        ? <Navigate to="/dashboard/app" replace />
        : <Preloader />
  const handleRedirectDashborad = (status, routes) => routes.map(route => {
    return {
      path: route.path,
      element: handleDashboard(route.element, status)
    }
  })
  return useRoutes([
    {
      path: '/dashboard',
      element: status < 2 ? <LogoOnlyLayout /> : <DashboardLayout />,
      children: handleRedirectDashborad(status, [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'contenido', element: <Pnf /> },
        { path: 'NewUser', element: <NewUser /> },
        { path: 'CreateContent', element: <CreateContent /> },
        { path: 'Historial', element: <Historial /> },
        { path: 'Estadisticas', element: <Estadisticas /> },
        { path: 'planestudio', element: <PlanEstudio /> },
        { path: 'newpnf', element: <NewPnf /> },
        { path: 'Malla', element: <Malla /> },
        { path: 'CreateMalla', element: <CreateMalla /> }
      ])
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: handleLogin(<Login />, status) },
        { path: 'recoverpassword', element: handleLogin(<RecoverPassword />, status) },
        { path: '404', element: <NotFound /> },
        { path: '/', element: handleDashboard(<Navigate to="/dashboard" />, status) },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
