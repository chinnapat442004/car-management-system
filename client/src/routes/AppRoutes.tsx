import Car from '../pages/Car';
import { Brand } from '../pages/Brand';
import { createBrowserRouter } from 'react-router';
export const router = createBrowserRouter([
  {
    path: '/',

    children: [
      { index: true, element: <Car /> },
      { path: 'brand', element: <Brand /> },
    ],
  },
]);
