// Header.js
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import logoLight from "../assets/images/studiio-logo.png";
import { userStatusCheck } from "../api/clientApis";
import { useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const Header = () => {
  const navigate = useNavigate();
  const { authData, logout } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(true);
  const [hovering, setHovering] = useState(false);
  const ref = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", user.id);
      let res = await userStatusCheck(formDataToSend);
      if (res.data.status === "Inactive") {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  };

  const handleMenuClick = () => {
    setShowSidebar((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (isMenuExpanded === true) {
      body.classList.add("menu-expanded");
      body.classList.remove("menu-collapsed");
    } else {
      body.classList.add("menu-collapsed");
      body.classList.remove("menu-expanded");
    }
  }, [isMenuExpanded]);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <nav
        ref={ref}
        className="header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top navbar-semi-dark navbar-shadow"
      >
        <div className="navbar-wrapper">
          <div
            className={`navbar-header ${hovering ? "expanded" : ""}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item mobile-menu d-lg-none mr-auto">
                <a
                  className="nav-link nav-menu-main menu-toggle hidden-xs"
                  href="#"
                  onClick={handleMenuClick}
                >
                  <i className="feather icon-menu font-large-1" />
                </a>
              </li>
              <li className="nav-item mr-auto">
                <span
                  className="navbar-brand"
                  onClick={() => navigate("/dashboard")}
                >
                  <img
                    className="brand-logo dropLogo"
                    alt="stack admin logo"
                    src={logoLight}
                  />
                </span>
              </li>

              <li className="nav-item d-none d-lg-block nav-toggle">
                <a
                  className="nav-link modern-nav-toggle pr-0"
                  onClick={toggleMenu}
                >
                  {isMenuExpanded ? (
                    <i
                      className="toggle-icon feather icon-toggle-right font-medium-3 white"
                      data-ticon="feather.icon-toggle-right"
                    ></i>
                  ) : (
                    <i
                      className="toggle-icon font-medium-3 white feather icon-toggle-left"
                      data-ticon="feather.icon-toggle-right"
                    ></i>
                  )}
                </a>
              </li>

              <li className="nav-item d-lg-none">
                <a
                  className="nav-link open-navbar-container"
                  data-toggle="collapse"
                  data-target="#navbar-mobile"
                >
                  <i className="fa fa-ellipsis-v"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-container content">
            <div className="collapse navbar-collapse" id="navbar-mobile">
              <ul className="nav navbar-nav mr-auto float-left d-flex align-items-center"></ul>
              <ul className="nav navbar-nav float-right">
                <li className="dropdown dropdown-user nav-item">
                  <a
                    className="dropdown-toggle nav-link dropdown-user-link"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <div className="avatar avatar-online">
                      <img
                        src={
                          user.profilePhoto
                            ? `${IMAGE_URL}/${user.profilePhoto}`
                            : "../../../app-assets/images/portrait/medium/dummy.png"
                        }
                        style={{ width: "50px", height: "30px" }}
                        alt="profile"
                      />
                      <i></i>
                    </div>
                    <span className="user-name">{user.userName}</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    {(roleId === 2 ||
                      roleId === 3 ||
                      roleId === 4 ||
                      roleId === 5) && (
                      <>
                        <a className="dropdown-item" href="/edit-profile">
                          <i className="feather icon-user"></i> Edit Profile
                        </a>
                        <div className="dropdown-divider"></div>
                      </>
                    )}
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}
                    >
                      <i className="feather icon-power"></i> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <SideNav
        showSidebar={showSidebar}
        hovering={hovering}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        isMenuExpanded={isMenuExpanded}
      />
    </>
  );
};

export default Header;
