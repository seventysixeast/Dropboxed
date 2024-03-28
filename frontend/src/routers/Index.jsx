import React, { useState } from "react";
import AdminRouter from "./AdminRouter";
import AuthRouter from "./AuthRouter";

const IndexRouter = () => {
  const [isAuth, setIsAuth] = useState(false);

  return isAuth ? <AdminRouter /> : <AuthRouter />;
};

export default IndexRouter;
