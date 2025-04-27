import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Client from '../pages/client/ClientList';
import Project from '../pages/project/ProjectList';
import MainLayout from '../components/layout/MainLayout';
import AddOrUpdateClient from '../pages/client/AddOrUpdateClient';
import ClientDetails from '../pages/client/ClientDetails';
import AddProject from '../pages/project/AddProject';
import ProjectDetails from '../pages/project/projectDetails';

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
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'client',
        children: [
          {
            index: true,
            element: <Client />,
          },
          {
            path: 'add-or-update',
            element: <AddOrUpdateClient />,
          },
          {
            path: 'details',
            element: <ClientDetails />
          }
        ],
      },
      {
        path: 'project',
        children: [
          {
            index: true,
            element: <Project />
          },
          {
            path: "add-new",
            element: <AddProject />
          }, 
          {
            path: "details",
            element: <ProjectDetails />
          }
        ]
      },
    ],
  },
]);

export default router;
