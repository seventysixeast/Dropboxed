import React, { Suspense } from "react";
import { useLocation, useRoutes, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/authContext";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const BookingListComponent = React.lazy(() =>
  import("../pages/BookingListComponent")
);
const ToDo = React.lazy(() => import("../pages/ToDo"));
const Clients = React.lazy(() => import("../pages/Clients"));
const Invoice = React.lazy(() => import("../pages/Invoice"));
const ImageTypes = React.lazy(() => import("../pages/ImageTypes"));
const PhotographersTeam = React.lazy(() =>
  import("../pages/PhotographersTeam")
);
const ViewGallery = React.lazy(() => import("../pages/ViewGallery"));
const AddBooking = React.lazy(() => import("../pages/AddBooking"));
const Services = React.lazy(() => import("../pages/Services"));
const NotificationComponent = React.lazy(() =>
  import("../pages/NotificationComponent")
);
const ManagePhotographerAdmins = React.lazy(() =>
  import("../pages/ManagePhotographerAdmins")
);
const EditProfile = React.lazy(() => import("../pages/EditProfile"));
const UserProfile = React.lazy(() => import("../pages/UserProfile"));
const ChangePassword = React.lazy(() => import("../pages/ChangePassword"));
const Collections = React.lazy(() => import("../pages/Collections"));
const AddService = React.lazy(() => import("../pages/AddService"));
const DropboxOAuth = React.lazy(() => import("../pages/DropboxAuth"));
const GoogleOAuth = React.lazy(() => import("../pages/GoogleOAuth"));
const QuickBooksCallback = React.lazy(() =>
  import("../components/QuickBooksCallback")
);
const CreateInvoice = React.lazy(() => import("../components/CreateInvoice"));
const GoogleDriveOAuth = React.lazy(() => import("../pages/GoogleDriveOAuth"));
const Login = React.lazy(() => import("../pages/Login"));

const AdminRouter = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const location = useLocation();

  const roleBasedRoutes = {
    1: [
      {
        path: "/manage-photographer-admins",
        element: <ManagePhotographerAdmins />,
      },
      { path: "/change-password", element: <ChangePassword /> },
    ],
    2: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/booking-list-calendar", element: <BookingListComponent /> },
      { path: "/todo", element: <ToDo /> },
      { path: "/collections", element: <Collections /> },
      { path: "/clients", element: <Clients /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/services", element: <Services /> },
      { path: "/image-types", element: <ImageTypes /> },
    ],
    3: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/todo", element: <ToDo /> },
      { path: "/services", element: <Services /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/booking-list-calendar", element: <BookingListComponent /> },
      { path: "/notifications-of-booking", element: <NotificationComponent /> },
    ],
    5: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/booking-list-calendar", element: <BookingListComponent /> },
      { path: "/todo", element: <ToDo /> },
      { path: "/collections", element: <Collections /> },
      { path: "/clients", element: <Clients /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/services/add-service", element: <AddService /> },
      { path: "/services/edit-service/:id", element: <AddService /> },
      { path: "/services", element: <Services /> },
      { path: "/image-types", element: <ImageTypes /> },
      { path: "/photographers-team", element: <PhotographersTeam /> },
    ],
  };

  const roleRoutes = roleBasedRoutes[user.role_id] || [];

  const routes = [
    ...roleRoutes,
    { path: "/view-gallery/:id", element: <ViewGallery /> },
    { path: "/view-gallery", element: <ViewGallery /> },
    { path: "/booking-for-photography", element: <AddBooking /> },
    { path: "/edit-profile", element: <EditProfile /> },
    { path: "/user-profile/:id", element: <UserProfile /> },
    { path: "/client-collections/:id", element: <Collections /> },
    { path: "/dropbox", element: <DropboxOAuth /> },
    { path: "/google", element: <GoogleOAuth /> },
    { path: "/google-drive", element: <GoogleDriveOAuth /> },
    { path: "/quickbooks/callback", element: <QuickBooksCallback /> },
    { path: "/create-invoice", element: <CreateInvoice /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/dashboard" replace /> },
  ];

  const route = useRoutes(routes);

  const shouldRenderHeaderAndSideNav =
  !location.pathname.startsWith("/view-gallery") &&
  !location.pathname.startsWith("/login");


  return (
    <div className="wrapper-foot">
      {shouldRenderHeaderAndSideNav && <Header />}
      <div id="script-warning"></div>
      <div className="content-foot">
        <Suspense
          fallback={
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  border: "8px solid #f3f3f3",
                  borderTop: "8px solid #3498db",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  animation: "spin 2s linear infinite",
                }}
              ></div>
            </div>
          }
        >
          {route}
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default AdminRouter;
