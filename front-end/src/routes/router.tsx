import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Client from '../pages/client/Client';
import Project from '../pages/project/Project';
import MainLayout from '../components/layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'client',
        element: <Client />,
      },
      {
        path: 'project',
        element: <Project />,
      },
    ],
  },
]);

export default router;
