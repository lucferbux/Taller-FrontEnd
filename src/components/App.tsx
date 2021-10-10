import React from "react";
import Layout from "./layout/layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Loader from "./elements/Loader";
import Dashboard from "./routes/Dashboard";
import Admin from "./routes/Admin";

const App = () => {
  
  // TODO: Change redirect to Dashboard
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <Redirect from="*" to="/" />
        </Switch>
        <Loader/>
      </Layout>
    </Router>
  );
};

export default App;
