import { CarPage } from '../pages/CarPage';
import { BrandPage } from '../pages/BrandPage';
import { createBrowserRouter } from 'react-router';
import Layout from '../layouts/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <CarPage /> },
      { path: 'brand', element: <BrandPage /> },
    ],
  },
]);
