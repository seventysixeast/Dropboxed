import React, { useState } from "react";
import AdminRouter from "./AdminRouter";
import AuthRouter from "./AuthRouter";

const IndexRouter = () => {
  return <>{<AdminRouter />}</>;
  // return <>{<AuthRouter />}</>;
};

export default IndexRouter;
