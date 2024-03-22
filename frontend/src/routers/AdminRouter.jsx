import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { NotificationComponent } from "../pages/NotificationComponent";
import { BookingListComponent } from "../pages/BookingListComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Collections from "../pages/Collections";
import Orders from "../pages/Orders";
import Services from "../pages/Services";
import Download from "../pages/Download";
import Invoice from "../pages/Invoice";
import SideNav from "../components/SideNav";
// import Login from "../pages/Login";
import ToDo from "../pages/ToDo";
import { AddCollection } from "../pages/AddCollection";
import { AddBooking } from "../pages/AddBooking";
import Users from "../pages/Users";

const AdminRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/collections", element: <Collections /> },
    { path: "/orders", element: <Orders /> },
    { path: "/services", element: <Services /> },
    { path: "/download", element: <Download /> },
    { path: "/invoice", element: <Invoice /> },
    { path: "/todo", element: <ToDo /> },
    { path: "/users", element: <Users /> },
    { path: "/notifications", element: <NotificationComponent /> },
    { path: "/booking-list", element: <BookingListComponent /> },
    // { path: "/login", element: <Login /> },
    { path: "/*", element: <Navigate to="/dashboard" /> },
    { path: "/add-collection", element: <AddCollection /> },
    { path: "/add-booking", element: <AddBooking /> },

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
