import React, { useEffect } from "react";
import Layout from "./layout/layout";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import Loader from "./elements/Loader";
import Dashboard from "./routes/Dashboard";
import Admin from "./routes/Admin";
import useAuth from "../hooks/useAuth";

const App = () => {
  let { user, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // TODO: Change redirect to Dashboard
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {user ? (
            <Route path="admin" element={<Admin />} />
          ) : (
            <Navigate to="/login" replace={true} />
          )}
          ;
          <Route path="*" element={<Navigate to="." replace />} />
        </Routes>
        <Loader />
      </Layout>
    </Router>
  );
};

export default App;
