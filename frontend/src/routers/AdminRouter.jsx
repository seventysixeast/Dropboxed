import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Services from "../pages/Services";
import SideNav from "../components/SideNav";
import Login from "../pages/Login";
import ToDo from "../pages/ToDo";

const AdminRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/dashBoard", element: <Dashboard /> },
    { path: "/services", element: <Services /> },
    { path: "/todo", element: <ToDo /> },
    { path: "/*", element: <Navigate to="/dashboard" /> },
  ]);
  return (
    <>
      <Header />
      <SideNav />
      {route}
      <Footer />
    </>
  );
};

export default AdminRouter;
