// src/routes/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Client from '../pages/client/Client';
import Project from '../pages/project/Project';

const isAuthenticated = () => !!localStorage.getItem('token'); // auth logic here

const router = createBrowserRouter([
  {
    path: '/login',
    element: isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />,
  },
  {
    path: '/register',
    element: isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
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
