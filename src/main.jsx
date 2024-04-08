import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import { AuthProvider } from './context/auth-context.jsx';
import CreatePropertyProvider from './context/properties-form-context/create-properties-context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ✅ Right order. Wrap whole app by AuthProvider */}
    <AuthProvider>
      <CreatePropertyProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </CreatePropertyProvider>
    </AuthProvider>
  </React.StrictMode>,
);
