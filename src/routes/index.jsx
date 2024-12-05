import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import DashboardLayout from '../layouts/DashboardLayout';
import AddProduct from '../pages/AddProduct';
import { Login } from '../pages/Login';
import ProductDetail from '../pages/ProductDetail';
import Products from '../pages/Products';

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
        { element: <Products /> , index:true},
        { path: 'add-product', element: <AddProduct /> },
        { path: 'product', element: <ProductDetail /> },
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
