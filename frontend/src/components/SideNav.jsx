import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
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
          <li className=" navigation-header">
            <span>General</span>
            <i
              className=" feather icon-minus"
              data-toggle="tooltip"
              data-placement="right"
              data-original-title="General"
            ></i>
          </li>
          <li className=" nav-item">
            <Link to="/dashboard">
              <i className="feather icon-home"></i>
              <span className="menu-title" data-i18n="Dashboard">
                Dashboard
              </span>
              {/* <span className="badge badge badge-primary badge-pill float-right mr-2">
              3
            </span> */}
            </Link>
          </li>
          <li className=" nav-item">
            <Link to="/services">
              <i className="feather icon-monitor"></i>
              <span className="menu-title" data-i18n="Templates">
                Service
              </span>
            </Link>
          </li>
          <li className=" nav-item">
            <Link to="/orders">
              <i className="feather icon-layout"></i>
              <span className="menu-title" data-i18n="Layouts">
                Orders
              </span>
            </Link>
          </li>

          <li className=" nav-item">
            <Link to="/download">
              <i className="feather icon-layout"></i>
              <span className="menu-title" data-i18n="Layouts">
                Download
              </span>
            </Link>
          </li>

          <li className=" nav-item">
            <Link to="/invoice">
              <i className="feather icon-file-text"></i>
              <span className="menu-title" data-i18n="Invoice">
                Invoice List
              </span>
            </Link>
          </li>

          <li className=" nav-item">
            <Link to="/booking-list">
              <i className="feather icon-zap"></i>
              <span className="menu-title" data-i18n="Starter kit">
                Booking List
              </span>
              <span className="badge badge badge-primary badge-pill float-right mr-2">
                2
              </span>
            </Link>
          </li>

          <li className=" nav-item">
            <Link to="/todo">
              <i className="feather icon-check-square"></i>
              <span className="menu-title" data-i18n="Todo Application">
                To Do
              </span>
            </Link>
          </li>

          <li className=" nav-item">
            <Link to="/notifications">
              <i className="feather icon-mail"></i>
              <span className="menu-title" data-i18n="Email Application">
                Notifications
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
