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
import CardsPackages from "../pages/Services";
import ImageTypes from "../pages/ImageTypes";
import PhotographersTeam from "../pages/PhotographersTeam";
import { ViewGallery } from "../pages/ViewGallery";
import { AddBooking } from "../pages/AddBooking";
import Services from "../pages/Services";
import { NotificationComponent } from "../pages/NotificationComponent";

import Collections from "../pages/Collections";
import Download from "../pages/Download";
import Users from "../pages/Users";
import Login from "../pages/Login";
import ManagePhotographersSubdomains from "../pages/ManagePhotographersSubdomains";
import EditProfile from "../pages/EditProfile";
import SignUp from "../pages/SignUp";
import { useAuth } from "../context/authContext";
import AddService from "../pages/AddService";

const AdminRouter = () => {
  const { authData } = useAuth();
  const { user } = authData;
  
  const route = useRoutes([
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/booking-list-calendar", element: <BookingListComponent /> },
    { path: "/todo", element: <ToDo /> },
    // { path: "/orders", element: <Orders /> },
    { path: "/clients", element: <Clients /> },
    { path: "/invoice", element: <Invoice /> },
    { path: "/image-types", element: <ImageTypes /> },
    { path: "/photographers-team", element: <PhotographersTeam /> },
    { path: "/view-gallery/:id", element: <ViewGallery /> },
    { path: "/view-gallery", element: <ViewGallery /> },

    { path: "/booking-for-photography", element: <AddBooking /> },
    { path: "/services", element: <Services /> },
    { path: "/notifications-of-booking", element: <NotificationComponent /> },
    { path: "/manage-photographers-subdomains", element: <ManagePhotographersSubdomains /> },
    { path: "/edit-profile", element: <EditProfile /> },
    //{ path: "/login", element: <Login /> },
    //{ path: "/signup", element: <SignUp /> },
    { path: "/collections", element: <Collections /> },
    // { path: "/download", element: <Download /> },
    // { path: "/users", element: <Users /> },
    // { path: "/*", element: <Navigate to="/dashboard" /> },
    { path: "/services/add-service", element: <AddService /> },
    { path: "/services/edit-service/:id", element: <AddService /> },
    { path: "/services/*", element: <AddService /> },


  ]);

  return (
    <div className="wrapper-foot">
      <Header />
      <SideNav />
      <div id="script-warning"></div>
      <div className="content-foot">{route}</div>
      <Footer />
    </div>
  );
};

export default AdminRouter;
