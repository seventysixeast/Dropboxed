import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SignUp from "../pages/SignUp";
import VerifyEmail from "../pages/VerifyEmail";
import ClientSignup from "../pages/ClientSignup";
import DropboxOAuth from "../pages/DropboxAuth";
import GoogleOAuth from "../pages/GoogleOAuth";
import ViewGallery from "../pages/ViewGallery";
import QuickBooksCallback from "../components/QuickBooksCallback";
import GoogleDriveOAuth from "../pages/GoogleDriveOAuth";

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
    { path: "/google-drive", element: <GoogleDriveOAuth /> },
    { path: "*", element: <Navigate to="/login" /> },
    { path: "/view-gallery/:id", element: <ViewGallery /> },
    { path: "/quickbooks/callback", element: <QuickBooksCallback /> },
  ]);

  return (
    <Suspense
      fallback={
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              border: "8px solid #f3f3f3",
              borderTop: "8px solid #3498db",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 2s linear infinite",
            }}
          ></div>
        </div>
      }
    >
      {route}
    </Suspense>
  );
};

export default AuthRouter;
