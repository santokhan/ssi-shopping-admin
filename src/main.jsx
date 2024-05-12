import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import { AuthProvider } from './context/auth-context.jsx';
import AxiosProvider from './context/axios-context.jsx';
import PrivateRoutes from './router/private.jsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ✅ Right order. Wrap whole app by AuthProvider */}
    <AuthProvider>
      <AxiosProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
        <ToastContainer />
      </AxiosProvider>
    </AuthProvider>
  </React.StrictMode>,
);
