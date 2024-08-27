import { createBrowserRouter } from 'react-router-dom';

import queryClient from '~/data/client';
import MainLayout from '~/layout/Main';
import Dashboard from '~/screens/Dashboard';
import SignIn from '~/screens/SignIn';

import { authLoader } from './loaders/auth';
import { dashboardLoader } from './loaders/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Dashboard,
        loader: dashboardLoader(queryClient),
      },
    ],
  },
  {
    path: '/sign-in',
    Component: SignIn,
  },
]);

export default router;
