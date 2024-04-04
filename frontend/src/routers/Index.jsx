// IndexRouter.js
import React from "react";
import AdminRouter from "./AdminRouter";
import AuthRouter from "./AuthRouter";
import { useAuth } from "../context/authContext";

const IndexRouter = () => {
  const {authData} = useAuth();
  const { isAuth } = authData;
  console.log("isAuth",useAuth())

  return isAuth ? <AdminRouter /> : <AuthRouter />;
};

export default IndexRouter;
