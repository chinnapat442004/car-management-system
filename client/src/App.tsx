import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router';

import { router } from './routes/AppRoutes';

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
