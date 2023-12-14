import React from "react";

import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogin = localStorage.getItem("isLogin");
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
