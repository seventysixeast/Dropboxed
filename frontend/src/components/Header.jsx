import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import logoLight from "../assets/images/studiio-logo.png";
import { getClient } from "../api/clientApis";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const Header = () => {
  const { authData } = useAuth();
  const { logout } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    window.location.href = "/login";
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", user.id);
      let res = await getClient(formDataToSend);
      if (res.data.status == "Inactive") {
        logout();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  };

  const handleMenuToggle = (e) => {
    e.preventDefault(); 
    const menuToggleElement = document.querySelector(
      ".nav-link.nav-menu-main.hidden-xs"
    );
    console.log(e);

    const body = document.getElementsByTagName("body")[0];

    console.log(body);

    if (menuToggleElement) {
      menuToggleElement.classList.toggle("is-active");
      console.log(menuToggleElement);

      if (body.classList.contains("menu-hide")) {
        body.classList.add("menu-open");
        body.classList.remove("menu-hide");
        
      } else {
        body.classList.remove("menu-open");
        body.classList.add("menu-hide");
      }
    }

    const sidenavOverlay = document.querySelector(".sidenav-overlay");
    console.log(sidenavOverlay);
    if (sidenavOverlay) {
      if (
        !sidenavOverlay.classList.contains("d-none") &&
        !sidenavOverlay.classList.contains("d-block")
      ) {
        sidenavOverlay.classList.add("d-block");
      } else if (sidenavOverlay.classList.contains("d-none")) {
        sidenavOverlay.classList.remove("d-none");
        sidenavOverlay.classList.add("d-block");
      } else {
        sidenavOverlay.classList.remove("d-block");
        sidenavOverlay.classList.add("d-none");
      }
    }
  };

  return (
    <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top navbar-semi-dark navbar-shadow">
      <div className="navbar-wrapper">
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mobile-menu  d-lg-none mr-auto">
              <a
                className="nav-link nav-menu-main menu-toggle hidden-xs"
              >
                <i className="feather icon-menu font-large-1"></i>
              </a>
            </li>
            <li className="nav-item mr-auto">
              <a className="navbar-brand" href="/dashboard">
                <img
                  className="brand-logo dropLogo"
                  alt="stack admin logo"
                  src={logoLight}
                />
              </a>
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
            <ul className="nav navbar-nav mr-auto float-left d-flex align-items-center">
              {/* <li className="nav-item d-none d-md-block">
                <a className="nav-link nav-link-expand" href="#">
                  <i className="ficon feather icon-maximize"></i>
                </a>
              </li> */}
              {/* <li className="nav-item d-none d-md-block">
                <a className="nav-link nav-link-expand py-0" href="#">
                  <button className="btn btn-blue text-white glow ">+ New Gallery</button>
                </a>
              </li>
              <li className="nav-item d-none d-md-block">
                <a className="nav-link nav-link-expand py-0" href="#">
                  <button className="btn btn-secondary glow">+ New Booking</button>
                </a>
              </li>
              <li className="nav-item d-none d-md-block">
                <a className="nav-link nav-link-expand py-0" href="#">
                  <button className="btn btn-red text-white glow ">+ New Task</button>
                </a>
              </li>
              <li className="nav-item d-none d-md-block">
                <a className="nav-link nav-link-expand py-0" href="#">
                  <button className="btn btn-blue text-white glow">+ New Client</button>
                </a>
              </li> */}
            </ul>
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
