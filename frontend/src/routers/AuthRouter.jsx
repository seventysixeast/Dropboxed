// AuthRouter.js
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import TokenVerification from "../components/TokenVerification";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SignUp from "../pages/SignUp";
import VerifyEmail from "../pages/VerifyEmail";
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
    { path: "/verify-email/:verificationToken", element: <VerifyEmail /> },
    { path: "/client-signup", element: <ClientSignup /> },
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/dropbox", element: <DropboxOAuth /> },
    { path: "/google", element: <GoogleOAuth /> },
    { path: "*", element: <Navigate to="/login" /> },
    { path: "/view-gallery/:id", element: <ViewGallery /> },
    { path: "/token-verification", element: <TokenVerification /> }
  ]);

  return <>{route}</>;
};

export default AuthRouter;
