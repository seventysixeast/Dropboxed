import React from "react";
import { useAuth } from '../context/authContext';
import logoLight from "../assets/images/dropboxed-logo-wt.png";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import avatar2 from "../app-assets/images/portrait/small/avatar-s-2.png";
import avatar3 from "../app-assets/images/portrait/small/avatar-s-3.png";
import avatar4 from "../app-assets/images/portrait/small/avatar-s-6.png";

const Header = () => {
  const { authData } = useAuth();
  const { logout } = useAuth();
  const { user } = authData;
  console.log(user);

  const handleLogout = (e) => {
      e.preventDefault();
      logout();
      window.location.href = '/login';
  };

  return (
    <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu fixed-top navbar-semi-dark navbar-shadow">
      <div className="navbar-wrapper">
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mobile-menu d-lg-none mr-auto">
              <a
                className="nav-link nav-menu-main menu-toggle hidden-xs"
                href="#"
              >
                <i className="feather icon-menu font-large-1"></i>
              </a>
            </li>
            <li className="nav-item mr-auto">
              <a
                className="navbar-brand"
                href="/dashboard"
              >
                <img
                  className="brand-logo dropLogo"
                  alt="stack admin logo"
                  src={logoLight}
                />
                {/* <h2 className="brand-text">Dropboxed</h2> */}
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
                    <img src={avatar1} alt="avatar" />
                    <i></i>
                  </div>
                  <span className="user-name">{user.userName}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="/edit-profile">
                    <i className="feather icon-user"></i> Edit Profile
                  </a>
                  <div className="dropdown-divider"></div>
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
