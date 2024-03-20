import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";

const AuthRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/*", element: <Navigate to="/login" /> },
  ]);
  return <>{route}</>;
};

export default AuthRouter;
