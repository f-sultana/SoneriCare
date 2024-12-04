import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import DashboardLayout from '../layouts/DashboardLayout';
import { Login } from '../pages/Login';

// ----------------------------------------------------------------------

export const HomePage = lazy(()=>import("../pages/Home"))

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {  element: <HomePage/>,index:true },
      ],
    },
    {
      path: 'login',
      element: (
          <Login/>
  
      ),
    },
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);
}
