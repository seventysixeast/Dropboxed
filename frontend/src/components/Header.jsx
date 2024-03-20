import React from "react";
import logoLight from "../app-assets/images/logo/stack-logo-light.png";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import avatar2 from "../app-assets/images/portrait/small/avatar-s-2.png";
import avatar3 from "../app-assets/images/portrait/small/avatar-s-3.png";
import avatar4 from "../app-assets/images/portrait/small/avatar-s-6.png";

const Header = () => {
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
                href="../../../html/ltr/vertical-modern-menu-template/index.html"
              >
                <img
                  className="brand-logo"
                  alt="stack admin logo"
                  src={logoLight}
                />
                <h2 className="brand-text">Stack</h2>
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
            <ul className="nav navbar-nav mr-auto float-left">
              <li className="dropdown nav-item mega-dropdown d-none d-lg-block">
                <a
                  className="dropdown-toggle nav-link"
                  href="#"
                  data-toggle="dropdown"
                >
                  Mega
                </a>
                <ul className="mega-dropdown-menu dropdown-menu row p-1">
                  <li className="col-md-4 bg-mega p-2">
                    <h3 className="text-white mb-1 font-weight-bold">
                      Mega Menu Sidebar
                    </h3>
                    <p className="text-white line-height-2">
                      Candy canes bonbon toffee. Cheesecake dragée gummi bears
                      chupa chups powder bonbon. Apple pie cookie sweet.
                    </p>
                    <button className="btn btn-outline-white">
                      Learn More
                    </button>
                  </li>
                  <li className="col-md-5 px-2">
                    <h6 className="font-weight-bold font-medium-2 ml-1">
                      Apps
                    </h6>
                    <ul className="row mt-2">
                      <li className="col-6 col-xl-4">
                        <a
                          className="text-center mb-2 mb-xl-3"
                          href="app-email.html"
                          target="_blank"
                        >
                          <i className="feather icon-mail font-large-1 mr-0"></i>
                          <p className="font-medium-2 mt-25 mb-0">Email</p>
                        </a>
                      </li>
                      <li className="col-6 col-xl-4">
                        <a
                          className="text-center mb-2 mb-xl-3"
                          href="app-chat.html"
                          target="_blank"
                        >
                          <i className="feather icon-message-square font-large-1 mr-0"></i>
                          <p className="font-medium-2 mt-25 mb-0">Chat</p>
                        </a>
                      </li>
                      <li className="col-6 col-xl-4">
                        <a
                          className="text-center mb-2 mb-xl-3 mt-75 mt-xl-0"
                          href="app-todo.html"
                          target="_blank"
                        >
                          <i className="feather icon-check-square font-large-1 mr-0"></i>
                          <p className="font-medium-2 mt-25 mb-0">Todo</p>
                        </a>
                      </li>
                      <li className="col-6 col-xl-4">
                        <a
                          className="text-center mb-2 mt-75 mt-xl-0"
                          href="app-kanban.html"
                          target="_blank"
                        >
                          <i className="feather icon-file-plus font-large-1 mr-0"></i>
                          <p className="font-medium-2 mt-25 mb-50">Kanban</p>
                        </a>
                      </li>
                      <li className="col-6 col-xl-4">
                        <a
                          className="text-center mb-2 mt-75 mt-xl-0"
                          href="app-contacts.html"
                          target="_blank"
                        >
                          <i className="feather icon-users font-large-1 mr-0"></i>
                          <p className="font-medium-2 mt-25 mb-50">Contacts</p>
                        </a>
                      </li>
                      <li className="col-6 col-xl-4">
                        <a
                          className="text-center mb-2 mt-75 mt-xl-0"
                          href="invoice-template.html"
                          target="_blank"
                        >
                          <i className="feather icon-printer font-large-1 mr-0"></i>
                          <p className="font-medium-2 mt-25 mb-50">Invoice</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="col-md-3">
                    <h6 className="font-weight-bold font-medium-2">
                      Components
                    </h6>
                    <ul className="row mt-1 mt-xl-2">
                      <li className="col-12 col-xl-6 pl-0">
                        <ul className="mega-component-list">
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-alerts.html"
                              target="_blank"
                            >
                              Alert
                            </a>
                          </li>
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-callout.html"
                              target="_blank"
                            >
                              Callout
                            </a>
                          </li>
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-buttons-basic.html"
                              target="_blank"
                            >
                              Buttons
                            </a>
                          </li>
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-carousel.html"
                              target="_blank"
                            >
                              Carousel
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="col-12 col-xl-6 pl-0">
                        <ul className="mega-component-list">
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-dropdowns.html"
                              target="_blank"
                            >
                              Drop Down
                            </a>
                          </li>
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-list-group.html"
                              target="_blank"
                            >
                              List Group
                            </a>
                          </li>
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-modals.html"
                              target="_blank"
                            >
                              Modals
                            </a>
                          </li>
                          <li className="mega-component-item">
                            <a
                              className="mb-1 mb-xl-2"
                              href="component-pagination.html"
                              target="_blank"
                            >
                              Pagination
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="nav-item d-none d-md-block">
                <a className="nav-link nav-link-expand" href="#">
                  <i className="ficon feather icon-maximize"></i>
                </a>
              </li>
              <li className="nav-item nav-search">
                <a className="nav-link nav-link-search" href="#">
                  <i className="ficon feather icon-search"></i>
                </a>
                <div className="search-input">
                  <input
                    className="input"
                    type="text"
                    placeholder="Explore Stack..."
                    tabIndex="0"
                    data-search="template-search"
                  />
                  <div className="search-input-close">
                    <i className="feather icon-x"></i>
                  </div>
                  <ul className="search-list"></ul>
                </div>
              </li>
            </ul>
            <ul className="nav navbar-nav float-right">
              <li className="dropdown dropdown-language nav-item">
                <a
                  className="dropdown-toggle nav-link"
                  id="dropdown-flag"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="flag-icon flag-icon-gb"></i>
                  <span className="selected-language"></span>
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown-flag">
                  <a className="dropdown-item" href="#" data-language="en">
                    <i className="flag-icon flag-icon-us"></i> English
                  </a>
                  <a className="dropdown-item" href="#" data-language="fr">
                    <i className="flag-icon flag-icon-fr"></i> French
                  </a>
                  <a className="dropdown-item" href="#" data-language="pt">
                    <i className="flag-icon flag-icon-pt"></i> Portuguese
                  </a>
                  <a className="dropdown-item" href="#" data-language="de">
                    <i className="flag-icon flag-icon-de"></i> German
                  </a>
                </div>
              </li>
              <li className="dropdown dropdown-notification nav-item">
                <a
                  className="nav-link nav-link-label"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="ficon feather icon-bell"></i>
                  <span className="badge badge-pill badge-danger badge-up">
                    5
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                  <li className="dropdown-menu-header">
                    <h6 className="dropdown-header m-0">
                      <span className="grey darken-2">Notifications</span>
                      <span className="notification-tag badge badge-danger float-right m-0">
                        5 New
                      </span>
                    </h6>
                  </li>
                  <li className="scrollable-container media-list">
                    <a href="#">
                      <div className="media">
                        <div className="media-left align-self-center">
                          <i className="feather icon-plus-square icon-bg-circle bg-cyan"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">You have new order!</h6>
                          <p className="notification-text font-small-3 text-muted">
                            Lorem ipsum dolor sit amet, consectetuer elit.
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              30 minutes ago
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="media">
                        <div className="media-left align-self-center">
                          <i className="feather icon-download-cloud icon-bg-circle bg-red bg-darken-1"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading red darken-1">
                            99% Server load
                          </h6>
                          <p className="notification-text font-small-3 text-muted">
                            Aliquam tincidunt mauris eu risus.
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Five hour ago
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="media">
                        <div className="media-left align-self-center">
                          <i className="feather icon-alert-triangle icon-bg-circle bg-yellow bg-darken-3"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading yellow darken-3">
                            Warning notifixation
                          </h6>
                          <p className="notification-text font-small-3 text-muted">
                            Vestibulum auctor dapibus neque.
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Today
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="media">
                        <div className="media-left align-self-center">
                          <i className="feather icon-check-circle icon-bg-circle bg-cyan"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Complete the task</h6>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Last week
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="media">
                        <div className="media-left align-self-center">
                          <i className="feather icon-file icon-bg-circle bg-teal"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">
                            Generate monthly report
                          </h6>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Last month
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-menu-footer">
                    <a
                      className="dropdown-item text-muted text-center"
                      href="#"
                    >
                      Read all notifications
                    </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown dropdown-notification nav-item">
                <a
                  className="nav-link nav-link-label"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="ficon feather icon-mail"></i>
                  <span className="badge badge-pill badge-warning badge-up">
                    3
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                  <li className="dropdown-menu-header">
                    <h6 className="dropdown-header m-0">
                      <span className="grey darken-2">Messages</span>
                      <span className="notification-tag badge badge-warning float-right m-0">
                        4 New
                      </span>
                    </h6>
                  </li>
                  <li className="scrollable-container media-list">
                    <a href="#">
                      <div className="media">
                        <div className="media-left">
                          <div className="avatar avatar-online avatar-sm rounded-circle">
                            <img src={avatar1} alt="avatar" />
                            <i></i>
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Margaret Govan</h6>
                          <p className="notification-text font-small-3 text-muted">
                            I like your portfolio, let's start.
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Today
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="media">
                        <div className="media-left">
                          <span className="avatar avatar-sm avatar-busy rounded-circle">
                            <img src={avatar2} alt="avatar" />
                            <i></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Bret Lezama</h6>
                          <p className="notification-text font-small-3 text-muted">
                            I have seen your work, there is
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Tuesday
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="media">
                        <div className="media-left">
                          <div className="avatar avatar-online avatar-sm rounded-circle">
                            <img src={avatar3} alt="avatar" />
                            <i></i>
                          </div>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Carie Berra</h6>
                          <p className="notification-text font-small-3 text-muted">
                            Can we have call in this week ?
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Friday
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                    <a href="#">
                      <div className="media">
                        <div className="media-left">
                          <span className="avatar avatar-sm avatar-away rounded-circle">
                            <img src={avatar4} alt="avatar" />
                            <i></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="media-heading">Eric Alsobrook</h6>
                          <p className="notification-text font-small-3 text-muted">
                            We have project party this saturday.
                          </p>
                          <small>
                            <time
                              className="media-meta text-muted"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              last month
                            </time>
                          </small>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="dropdown-menu-footer">
                    <a
                      className="dropdown-item text-muted text-center"
                      href="#"
                    >
                      Read all messages
                    </a>
                  </li>
                </ul>
              </li>
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
                  <span className="user-name">John Doe</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="user-profile.html">
                    <i className="feather icon-user"></i> Edit Profile
                  </a>
                  <a className="dropdown-item" href="app-email.html">
                    <i className="feather icon-mail"></i> My Inbox
                  </a>
                  <a className="dropdown-item" href="user-cards.html">
                    <i className="feather icon-check-square"></i> Task
                  </a>
                  <a className="dropdown-item" href="app-chat.html">
                    <i className="feather icon-message-square"></i> Chats
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="login-with-bg-image.html">
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
