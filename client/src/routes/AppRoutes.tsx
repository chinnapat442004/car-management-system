import Car from '../pages/Car';
import { BrandPage } from '../pages/BrandPage';
import { createBrowserRouter } from 'react-router';
import Layout from '../layouts/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Car /> },
      { path: 'brand', element: <BrandPage /> },
    ],
  },
]);
