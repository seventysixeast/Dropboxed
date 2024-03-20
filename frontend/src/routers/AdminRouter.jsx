import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { NotificationComponent } from "../pages/NotificationComponent";
import { BookingListComponent } from "../pages/BookingListComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/dashBoard", element: <Dashboard /> },
    { path: "/notifications", element: <NotificationComponent /> },
    { path: "/booking-list", element: <BookingListComponent /> },
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
