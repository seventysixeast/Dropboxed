// AuthRouter.js
import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const AuthRouter = () => {
  const route = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    // Add other authentication routes if needed
  ]);

  return <>{route}</>;
};

export default AuthRouter;
