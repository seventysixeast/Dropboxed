import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import { Dashboard } from "../pages/Dashboard";
import { BookingListComponent } from "../pages/BookingListComponent";
import ToDo from "../pages/ToDo";
import Orders from "../pages/Orders";
import Clients from "../pages/Clients";
import Invoice from "../pages/Invoice";
import CardsPackages from "../pages/CardsPackages";
import AddEditPackage from "../pages/AddEditPackage";
import ImageTypes from "../pages/ImageTypes";
import AddImageType from "../pages/AddImageType";
import AddGallery from "../pages/AddGallery";
import { AddBooking } from "../pages/AddBooking";
import Services from "../pages/Services";
import { NotificationComponent } from "../pages/NotificationComponent";
import Collections from "../pages/Collections";
import Download from "../pages/Download";
import { AddCollection } from "../pages/AddCollection";
import Users from "../pages/Users";
import Login from "../pages/Login";

const AdminRouter = ({ logoutUser = null }) => {
  const route = useRoutes([
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/booking-list-calendar", element: <BookingListComponent /> },
    { path: "/todo", element: <ToDo /> },
    // { path: "/orders", element: <Orders /> },
    { path: "/clients", element: <Clients /> },
    { path: "/invoice", element: <Invoice /> },
    { path: "/cards-packages", element: <CardsPackages /> },
    { path: "/add-edit-package", element: <AddEditPackage /> },
    { path: "/image-types", element: <ImageTypes /> },
    { path: "/add-image-type", element: <AddImageType /> },
    { path: "/add-gallery", element: <AddGallery /> },

    { path: "/booking-for-photography", element: <AddBooking /> },
    { path: "/services", element: <Services /> },
    { path: "/notifications-of-booking", element: <NotificationComponent /> },

    // { path: "/add-collection", element: <AddCollection /> },
    // { path: "/collections", element: <Collections /> },
    // { path: "/download", element: <Download /> },
    // { path: "/users", element: <Users /> },
    // { path: "/login", element: <Login /> },
    // { path: "/*", element: <Navigate to="/dashboard" /> },

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
