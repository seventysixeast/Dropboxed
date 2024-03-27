import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";


const AuthRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/*", element: <Navigate to="/login" /> },
    { path: "/signup", element: <SignUp /> },
  ]);
  return <>{route}</>;
};

export default AuthRouter;
