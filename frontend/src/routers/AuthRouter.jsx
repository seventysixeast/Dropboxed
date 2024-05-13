// AuthRouter.js
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SignUp from "../pages/SignUp";
import ClientSignup from "../pages/ClientSignup";
import DropboxOAuth from "../pages/DropboxAuth";
import GoogleOAuth from "../pages/GoogleOAuth";
import { ViewGallery } from "../pages/ViewGallery";

const AuthRouter = () => {
  const route = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/forgot", element: <ForgotPassword /> },
    { path: "/reset", element: <ResetPassword /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/client-signup", element: <ClientSignup /> },
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/dropbox", element: <DropboxOAuth /> },
    { path: "/google", element: <GoogleOAuth /> },
    { path: "*", element: <Navigate to="/login" /> },
    { path: "/view-gallery/:id", element: <ViewGallery /> }
  ]);

  return <>{route}</>;
};

export default AuthRouter;
