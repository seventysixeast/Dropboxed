import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { NotificationComponent } from "../pages/NotificationComponent";
import { BookingListComponent } from "../pages/BookingListComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Services from "../pages/Services";
import Orders from "../pages/Orders";
import Download from "../pages/Download";
import Invoice from "../pages/Invoice";
import SideNav from "../components/SideNav";
import Login from "../pages/Login";
import ToDo from "../pages/ToDo";

const AdminRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/services", element: <Services /> },
    { path: "/orders", element: <Orders /> },
    { path: "/download", element: <Download /> },
    { path: "/invoice", element: <Invoice /> },
    { path: "/todo", element: <ToDo /> },
    { path: "/notifications", element: <NotificationComponent /> },
    { path: "/booking-list", element: <BookingListComponent /> },
    // { path: "/login", element: <Login /> },
    { path: "/*", element: <Navigate to="/dashboard" /> },
  ]);
  return (
    <>
      <Header />
      <SideNav />
      <div id="script-warning"></div>
      {route}
      <Footer />
    </>
  );
};

export default AdminRouter;
