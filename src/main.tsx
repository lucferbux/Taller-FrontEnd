import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './components/App';
import { AuthProvider } from './context/AuthContext';
import './main.css';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
