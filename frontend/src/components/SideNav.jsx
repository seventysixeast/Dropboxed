// SideNav.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const SideNav = ({
  showSidebar,
  hovering,
  onMouseEnter,
  onMouseLeave,
  isMenuExpanded,
}) => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const location = useLocation();

  const menus = {
    1: [
      {
        to: "/manage-photographer-admins",
        icon: "users",
        title: "Manage Photographer Admins",
      },
      { to: "/change-password", icon: "key", title: "Change Password" },
    ],
    2: [
      { to: "/dashboard", icon: "home", title: "Dashboard" },
      {
        to: "/booking-list-calendar",
        icon: "zap",
        title: "Booking List/Calendar",
      },
      { to: "/todo", icon: "check-square", title: "To Do" },
      { to: "/collections", icon: "layout", title: "Collections" },
      { to: "/clients", icon: "users", title: "Clients" },
      { to: "/invoice", icon: "file-text", title: "Invoice List" },
      { to: "/services", icon: "file-text", title: "Services" },
      { to: "/image-types", icon: "file-text", title: "Image Types" },
    ],
    3: [
      { to: "/dashboard", icon: "home", title: "Dashboard" },
      { to: "/todo", icon: "check-square", title: "To Do" },
      { to: "/services", icon: "monitor", title: "Services" },
      { to: "/invoice", icon: "file-text", title: "Invoice List" },
      {
        to: "/booking-list-calendar",
        icon: "zap",
        title: "Booking List/Calendar",
      },
      { to: "/notifications-of-booking", icon: "mail", title: "Notifications" },
    ],
    5: [
      { to: "/dashboard", icon: "home", title: "Dashboard" },
      {
        to: "/booking-list-calendar",
        icon: "zap",
        title: "Booking List/Calendar",
      },
      { to: "/todo", icon: "check-square", title: "To Do" },
      { to: "/collections", icon: "layout", title: "Collections" },
      { to: "/clients", icon: "users", title: "Clients" },
      { to: "/invoice", icon: "book-open", title: "Invoice List" },
      { to: "/services", icon: "file-text", title: "Services" },
      { to: "/image-types", icon: "image", title: "Image Types" },
      {
        to: "/photographers-team",
        icon: "camera",
        title: "Photographers Team",
      },
    ],
  };

  const roles = {
    1: "Master Admin",
    2: "Photographer",
    3: "Client",
    5: "Photographer Admin",
  };

  const MenuItem = ({ to, icon, title, isActive }) => (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link to={to} className="d-flex ">
        <i className={`feather icon-${icon}  mb-0 pb-0`}></i>
        <p className="menu-title mb-0 pb-0" data-i18n={title}>
          {hovering || isMenuExpanded ? title : null}
        </p>
      </Link>
    </li>
  );

  return (
    <div
      className={`main-menu menu-fixed menu-dark menu-accordion menu-shadow ${
        showSidebar ? "menu-fix" : "menu-fix-close"
      } ${hovering ? "expanded" : ""}`}
      data-scroll-to-active="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="main-menu-content">
        <ul
          className="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          {menus[roleId] &&
            menus[roleId].map((menu, index) => (
              <MenuItem
                key={index}
                to={menu.to}
                icon={menu.icon}
                title={menu.title}
                isActive={location.pathname === menu.to}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
