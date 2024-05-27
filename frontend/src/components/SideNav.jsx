import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const SideNav = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const location = useLocation();

  return (
    <div
      className="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
      data-scroll-to-active="true"
    >
      <div className="main-menu-content">
        <ul
          className="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          {roleId === 5 && (
            <>
              <li className="navigation-header">
                <span>Photographers</span>
                <i
                  className="feather icon-minus"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="Photographers"
                ></i>
              </li>
              <li
                className={`nav-item  ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                <Link to="/dashboard">
                  <i className="feather icon-home"></i>
                  <span className="menu-title" data-i18n="Dashboard">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/booking-list-calendar" ? "active" : ""
                }`}
              >
                <Link to="/booking-list-calendar">
                  <i className="feather icon-zap"></i>
                  <span className="menu-title" data-i18n="Starter kit">
                    Booking List/Calendar
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/todo" ? "active" : ""
                }`}
              >
                <Link to="/todo">
                  <i className="feather icon-check-square"></i>
                  <span className="menu-title" data-i18n="Todo Application">
                    To Do
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/collections" ? "active" : ""
                }`}
              >
                <Link to="/collections">
                  <i className="feather icon-layout"></i>
                  <span className="menu-title" data-i18n="Layouts">
                    Collections
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/clients" ? "active" : ""
                }`}
              >
                <Link to="/clients">
                  <i className="feather icon-users"></i>
                  <span className="menu-title" data-i18n="Clients">
                    Clients
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/invoice" ? "active" : ""
                }`}
              >
                <Link to="/invoice">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Invoice">
                    Invoice List
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/services" ? "active" : ""
                }`}
              >
                <Link to="/services">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Services">
                    Services
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/image-types" ? "active" : ""
                }`}
              >
                <Link to="/image-types">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Image Types">
                    Image Types
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/photographers-team" ? "active" : ""
                }`}
              >
                <Link to="/photographers-team">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Photographers Team">
                    Photographers Team
                  </span>
                </Link>
              </li>
            </>
          )}

          {roleId === 2 && (
            <>
              <li className="navigation-header">
                <span>Photographers</span>
                <i
                  className="feather icon-minus"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="Photographers"
                ></i>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                <Link to="/dashboard">
                  <i className="feather icon-home"></i>
                  <span className="menu-title" data-i18n="Dashboard">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/booking-list-calendar" ? "active" : ""
                }`}
              >
                <Link to="/booking-list-calendar">
                  <i className="feather icon-zap"></i>
                  <span className="menu-title" data-i18n="Starter kit">
                    Booking List/Calendar
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/todo" ? "active" : ""
                }`}
              >
                <Link to="/todo">
                  <i className="feather icon-check-square"></i>
                  <span className="menu-title" data-i18n="Todo Application">
                    To Do
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/collections" ? "active" : ""
                }`}
              >
                <Link to="/collections">
                  <i className="feather icon-layout"></i>
                  <span className="menu-title" data-i18n="Layouts">
                    Collections
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/clients" ? "active" : ""
                }`}
              >
                <Link to="/clients">
                  <i className="feather icon-users"></i>
                  <span className="menu-title" data-i18n="Clients">
                    Clients
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/invoice" ? "active" : ""
                }`}
              >
                <Link to="/invoice">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Invoice">
                    Invoice List
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/services" ? "active" : ""
                }`}
              >
                <Link to="/services">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Services">
                    Services
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/image-types" ? "active" : ""
                }`}
              >
                <Link to="/image-types">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Image Types">
                    Image Types
                  </span>
                </Link>
              </li>
            </>
          )}

          {roleId === 3 && (
            <>
              <li className="navigation-header">
                <span>Clients</span>
                <i
                  className="feather icon-minus"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="Clients"
                ></i>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                <Link to="/dashboard">
                  <i className="feather icon-home"></i>
                  <span className="menu-title" data-i18n="Dashboard">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/todo" ? "active" : ""
                }`}
              >
                <Link to="/todo">
                  <i className="feather icon-check-square"></i>
                  <span className="menu-title" data-i18n="Todo Application">
                    To Do
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/services" ? "active" : ""
                }`}
              >
                <Link to="/services">
                  <i className="feather icon-monitor"></i>
                  <span className="menu-title" data-i18n="Templates">
                    Services
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/invoice" ? "active" : ""
                }`}
              >
                <Link to="/invoice">
                  <i className="feather icon-file-text"></i>
                  <span className="menu-title" data-i18n="Invoice">
                    Invoice List
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/booking-list-calendar" ? "active" : ""
                }`}
              >
                <Link to="/booking-list-calendar">
                  <i className="feather icon-zap"></i>
                  <span className="menu-title" data-i18n="Starter kit">
                    Booking List/Calendar
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/notifications-of-booking"
                    ? "active"
                    : ""
                }`}
              >
                <Link to="/notifications-of-booking">
                  <i className="feather icon-mail"></i>
                  <span className="menu-title" data-i18n="Email Application">
                    Notifications
                  </span>
                </Link>
              </li>
            </>
          )}

          {roleId === 1 && (
            <>
              <li className="navigation-header">
                <span>Master Admin</span>
                <i
                  className="feather icon-minus"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-original-title="Master Admin"
                ></i>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/manage-photographer-admins"
                    ? "active"
                    : ""
                }`}
              >
                <Link to="/manage-photographer-admins">
                  <i className="feather icon-users"></i>
                  <span className="menu-title" data-i18n="Layouts">
                    Manage Photographer Admins
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/change-password" ? "active" : ""
                }`}
              >
                <Link to="/change-password">
                  <i className="fa fa-key"></i>
                  <span className="menu-title" data-i18n="Layouts">
                    Change Password
                  </span>
                </Link>
              </li>
            </>
          )}
          <>
            {/* <li className=" navigation-header">
            <span>Master Admin</span>
            <i
              className=" feather icon-minus"
              data-toggle="tooltip"
              data-placement="right"
              data-original-title="Master Admin"
            ></i>
          </li> */}

            {/* <li className=" nav-item">
            <Link to="/Login">
              <i className="feather icon-layout"></i>
              <span className="menu-title" data-i18n="Layouts">
                Login
              </span>
            </Link>
          </li> */}

            {/* <li className=" nav-item">
            <Link to="/signup">
              <i className="feather icon-layout"></i>
              <span className="menu-title" data-i18n="Layouts">
                Sign Up
              </span>
            </Link>
          </li> */}

            {/* <li className=" nav-item">
            <Link to="/update-subscription-services-charges">
              <i className="feather icon-layout"></i>
              <span className="menu-title" data-i18n="Layouts">
                Update Subscription Services Charges
              </span>
            </Link>
          </li> */}

            {/* <li className=" nav-item">
            <Link to="/download">
              <i className="feather icon-layout"></i>
              <span className="menu-title" data-i18n="Layouts">
                Download
              </span>
            </Link>
          </li> */}

            {/* <li className=" nav-item">
            <Link to="/users">
              <i className="feather icon-user"></i>
              <span className="menu-title" data-i18n="Layouts">
                Users
              </span>
            </Link>
          </li> */}

            {/* <li className=" nav-item">
            <Link to="/add-collection">
              <i className="feather icon-mail"></i>
              <span className="menu-title" data-i18n="Collection Form">
                Add Collection
              </span>
            </Link>
          </li> */}
          </>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
