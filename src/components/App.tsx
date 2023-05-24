import React from 'react';
import Layout from './layout/layout';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import Admin from './routes/Admin';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
