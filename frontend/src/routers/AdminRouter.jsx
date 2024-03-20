import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/dashBoard", element: <Dashboard /> },
    { path: "/*", element: <Navigate to="/dashboard" /> },
  ]);
  return (
    <>
      <Header />
      {route}
      <Footer />
    </>
  );
};

export default AdminRouter;
