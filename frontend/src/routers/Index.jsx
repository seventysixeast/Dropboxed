// IndexRouter.js
import React from "react";
import { useAuth } from "../context/authContext";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const IndexRouter = () => {
  const {authData} = useAuth();
  const { isAuth } = authData;

  return isAuth ? <PrivateRoutes /> : <PublicRoutes />;
};

export default IndexRouter;
