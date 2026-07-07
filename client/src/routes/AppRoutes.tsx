import Car from '../pages/Car';
import { Brand } from '../pages/Brand';
import { createBrowserRouter } from 'react-router';
import Layout from '../layouts/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Car /> },
      { path: 'brand', element: <Brand /> },
    ],
  },
]);
