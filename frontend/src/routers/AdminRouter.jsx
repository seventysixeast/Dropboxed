import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import { Dashboard } from "../pages/Dashboard";
import { BookingListComponent } from "../pages/BookingListComponent";
import ToDo from "../pages/ToDo";
import Clients from "../pages/Clients";
import Invoice from "../pages/Invoice";
import ImageTypes from "../pages/ImageTypes";
import PhotographersTeam from "../pages/PhotographersTeam";
import { ViewGallery } from "../pages/ViewGallery";
import { AddBooking } from "../pages/AddBooking";
import Services from "../pages/Services";
import { NotificationComponent } from "../pages/NotificationComponent";

import Collections from "../pages/Collections";
import Login from "../pages/Login";
import ManagePhotographerAdmins from "../pages/ManagePhotographerAdmins";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";
import { useAuth } from "../context/authContext";
import AddService from "../pages/AddService";
import DropboxOAuth from "../pages/DropboxAuth";
import GoogleOAuth from "../pages/GoogleOAuth";
import QuickBooksConnect from '../components/QuickBooksConnect';
import QuickBooksCallback from '../components/QuickBooksCallback';
import CreateInvoice from '../components/CreateInvoice';


const AdminRouter = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const location = useLocation();

  const route = useRoutes([
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/booking-list-calendar", element: <BookingListComponent /> },
    { path: "/todo", element: <ToDo /> },
    { path: "/clients", element: <Clients /> },
    { path: "/invoice", element: <Invoice /> },
    { path: "/image-types", element: <ImageTypes /> },
    { path: "/photographers-team", element: <PhotographersTeam /> },
    { path: "/view-gallery/:id", element: <ViewGallery /> },
    { path: "/view-gallery", element: <ViewGallery /> },

    { path: "/booking-for-photography", element: <AddBooking /> },
    { path: "/services", element: <Services /> },
    { path: "/notifications-of-booking", element: <NotificationComponent /> },
    { path: "/manage-photographer-admins", element: <ManagePhotographerAdmins /> },
    { path: "/edit-profile", element: <EditProfile /> },
    { path: "/change-password", element: <ChangePassword /> },
    { path: "/collections", element: <Collections /> },
    { path: "/services/add-service", element: <AddService /> },
    { path: "/services/edit-service/:id", element: <AddService /> },
    
    { path: "/services/*", element: <AddService /> },
    { path: "/dropbox", element: <DropboxOAuth /> },
    { path: "/google", element: <GoogleOAuth /> },
    { path: "/quickbooks/callback", element: <QuickBooksCallback /> },
    { path: "/create-invoice", element: <CreateInvoice /> },
    { path: "/login", element: <Login /> },
  ]);
  
  const shouldRenderHeaderAndSideNav = !location.pathname.startsWith('/view-gallery');

  return (
    <div className="wrapper-foot">
      {shouldRenderHeaderAndSideNav && <Header />}
      {shouldRenderHeaderAndSideNav && <SideNav />}
      <div id="script-warning"></div>
      <div className="content-foot">{route}</div>
      <Footer />
    </div>
  );
};

export default AdminRouter;
