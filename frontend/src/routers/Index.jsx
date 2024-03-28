import React, { useState } from "react";
import AdminRouter from "./AdminRouter";
import AuthRouter from "./AuthRouter";
import { useAuth } from "../context/authContext";

const IndexRouter = () => {
  const { isAuth } = useAuth();

  return isAuth ? <AdminRouter /> : <AuthRouter />;
};

export default IndexRouter;
