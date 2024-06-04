import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import logoLight from "../assets/images/studiio-logo.png";
import { getClient, userStatusCheck } from "../api/clientApis";
import { useNavigate } from "react-router-dom";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const Header = () => {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { logout } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;

  const menuRef = useRef(null);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    checkUserStatus();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
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

  const handleMenuToggle = () => {
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("menu-open");
    body.classList.toggle("menu-hide");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      const body = document.getElementsByTagName("body")[0];
      if (body.classList.contains("menu-open")) {
        setTimeout(() => {
          body.classList.remove("menu-open");
          body.classList.add("menu-hide");
        }, 200);
      }
    }
    const navbarContainer = document.querySelector(".open-navbar-container");
    if (navbarContainer && !navbarContainer.contains(event.target)) {
      navbarContainer.classList.remove("collapsed");
    }
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse && !navbarCollapse.contains(event.target)) {
      navbarCollapse.classList.remove("show");
    }
  };

  return (
    <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top navbar-semi-dark navbar-shadow">
      <div className="navbar-wrapper">
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mobile-menu d-lg-none mr-auto">
              <a
                className="nav-link nav-menu-main toggle-menu hidden-xs"
                onClick={handleMenuToggle}
              >
                <i className="feather icon-menu font-large-1"></i>
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
                data-toggle="collapse"
              >
                <i
                  className="toggle-icon feather icon-toggle-right font-medium-3 white"
                  data-ticon="feather.icon-toggle-right"
                ></i>
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
              <li className="dropdown dropdown-user nav-item" ref={menuRef}>
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
                          : "../app-assets/images/portrait/medium/dummy.png"
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
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    <i className="feather icon-power"></i> Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
