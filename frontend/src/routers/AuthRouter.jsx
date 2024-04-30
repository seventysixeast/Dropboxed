// AuthRouter.js
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SignUp from "../pages/SignUp";
import ClientSignup from "../pages/ClientSignup";

const AuthRouter = () => {
  const route = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/forgot", element: <ForgotPassword /> },
    { path: "/reset", element: <ResetPassword /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/client-signup", element: <ClientSignup /> },
    { path: "/", element: <Navigate to="/login" /> }
    // Add other authentication routes if needed
  ]);

  return <>{route}</>;
};

export default AuthRouter;
