import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoute({ children }: any) {
  let { user, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return user ? children : <Navigate to="/login" replace={true}/>;
}

export default PrivateRoute;
