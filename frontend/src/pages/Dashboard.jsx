import React from "react";
import "../app-assets/css/core/menu/menu-types/vertical-menu-modern.css";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import avatar5 from "../app-assets/images/portrait/small/avatar-s-14.png";
import avatar6 from "../app-assets/images/portrait/small/avatar-s-15.png";
import avatar7 from "../app-assets/images/portrait/small/avatar-s-4.png";
import avatar8 from "../app-assets/images/portrait/small/avatar-s-11.png";
import avatar9 from "../app-assets/images/portrait/small/avatar-s-19.png";
import avatar10 from "../app-assets/images/portrait/small/avatar-s-20.png";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      {/* <!-- BEGIN: Main Menu--> */}
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
              <Link to="/service">
                <i className="feather icon-monitor"></i>
                <span className="menu-title" data-i18n="Templates">
                  Service
                </span>
              </Link>
            </li>
            <li className=" nav-item">
              <Link to="/downloafd">
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
      {/* <!-- END: Main Menu--> */}

      {/* <!-- BEGIN: Content--> */}

      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            {/* <!-- Grouped multiple cards for statistics starts here --> */}
            <div className="row grouped-multiple-statistics-card">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-primary bg-darken-2">
                                <i className="icon-camera font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-primary white media-body">
                                <h5>Products</h5>
                                <h5 className="text-bold-400 mb-0">
                                  <i className="feather icon-plus"></i> 28
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-danger bg-darken-2">
                                <i className="icon-user font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-danger white media-body">
                                <h5>New Users</h5>
                                <h5 className="text-bold-400 mb-0">
                                  <i className="feather icon-arrow-up"></i>{" "}
                                  1,238
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-warning bg-darken-2">
                                <i className="icon-basket-loaded font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-warning white media-body">
                                <h5>New Orders</h5>
                                <h5 className="text-bold-400 mb-0">
                                  <i className="feather icon-arrow-down"></i>{" "}
                                  4,658
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-success bg-darken-2">
                                <i className="icon-wallet font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-success white media-body">
                                <h5>Total Profit</h5>
                                <h5 className="text-bold-400 mb-0">
                                  <i className="feather icon-arrow-up"></i> 5.6
                                  M
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="card-title assigned_gallery">Assigned Gallery</h4>
            {/* <!-- Grouped multiple cards for statistics ends here -->




     










            {/* <!-- active users and my task timeline cards starts here --> */}
            <div className="row match-height">
              {/* <!-- active users card --> */}
              <div className="col-xl-8 col-lg-12">
                <div className="card active-users">
                  <div className="card-header border-0">
                    <h4 className="card-title">Active Users</h4>
                    <a className="heading-elements-toggle">
                      <i className="fa fa-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">
                        <li>
                          <a data-action="reload">
                            <i className="feather icon-rotate-cw"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-content">
                    <div
                      id="audience-list-scroll"
                      className="table-responsive position-relative"
                    >
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Available Data</th>
                            <th>Downloads</th>
                            <th>Status</th>
                            <th>More</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar1}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Shwell Flintof
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>shwellFlint@gmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>450MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-success"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "55%" }}
                                >
                                  55%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-success">
                                Active
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <span>
                                  <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a className="dropdown-item" href="#">
                                      Subscription
                                    </a>
                                    <a className="dropdown-item" href="#">
                                      Extras
                                    </a>
                                    <a className="dropdown-item" href="#">
                                      Newslatter
                                    </a>
                                  </div>
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar5}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Ogasawara Katsumi
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>ogaats@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>457 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-warning"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "55%" }}
                                >
                                  55%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-warning">
                                Reported
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar6}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Stepan Assonov
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>stepan23@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>231 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-danger"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "65%" }}
                                >
                                  65%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-danger">Block</span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar7}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Mbe Tshinguta
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>tshinguta@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>723 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-success"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "78%" }}
                                >
                                  78%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-success">
                                Active
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar8}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">Marco Alves</span>
                            </td>
                            <td className="align-middle">
                              <span>maralv@dmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>120 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-warning"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "51%" }}
                                >
                                  51%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-warning">
                                Reported
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-truncate">
                              <div className="avatar avatar-md mr-1">
                                <img
                                  className="rounded-circle"
                                  src={avatar9}
                                  alt="Generic placeholder image"
                                />
                              </div>
                              <span className="text-truncate">
                                Lucas Pacheco
                              </span>
                            </td>
                            <td className="align-middle">
                              <span>pacheco@hmail.com</span>
                            </td>
                            <td className="align-middle">
                              <span>532 MB</span>
                            </td>
                            <td className="align-middle">
                              <div className="progress my-75">
                                <div
                                  className="progress-bar progress-bar-striped bg-danger"
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="20"
                                  aria-valuemax="100"
                                  style={{ width: "47%" }}
                                >
                                  47%
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <span className="badge badge-danger">
                                Blocked
                              </span>
                            </td>
                            <td className="align-middle">
                              <div className="dropdown">
                                <span
                                  className="feather icon-more-vertical dropdown-toggle"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></span>
                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a className="dropdown-item" href="#">
                                    Subscription
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Extras
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Newslatter
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- my task Timeline --> */}
              <div className="col-xl-4 col-lg-12">
                <div className="card">
                  <div className="card-header border-0">
                    <h4 className="card-title">My Tasks</h4>
                    <div className="heading-elements">
                      <ul className="list-inline">
                        <li>
                          <a data-action="reload">
                            <i className="feather icon-rotate-cw"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="widget-timeline">
                        <ul>
                          <li className="timeline-items timeline-icon-success">
                            <p className="timeline-time">Monday 12:12pm</p>
                            <div className="timeline-title">
                              Catch Up With Brain
                            </div>
                            <div className="timeline-subtitle">
                              Mobile Project
                            </div>
                            <div>
                              <ul className="list-unstyled users-list cursor-pointer m-0 d-flex align-items-center">
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Ogasawara"
                                  />
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="timeline-items timeline-icon-danger">
                            <p className="timeline-time">2 days ago</p>
                            <div className="timeline-title">Make new icons</div>
                            <div className="timeline-subtitle">Web Apps</div>
                          </li>
                          <li className="timeline-items timeline-icon-warning">
                            <p className="timeline-time">Yesterday</p>
                            <div className="timeline-title">
                              <span>Design explorations</span>
                              <span className="badge badge-pill badge-sm badge-success">
                                Completed
                              </span>
                            </div>
                            <div className="timeline-subtitle">
                              Company Website
                            </div>
                          </li>
                          <li className="timeline-items timeline-icon-info">
                            <p className="timeline-time">5 hours ago</p>
                            <div className="timeline-title">
                              Lunch with Mary
                            </div>
                            <div className="timeline-subtitle">Grill House</div>
                            <div>
                              <ul className="list-unstyled users-list cursor-pointer m-0 d-flex align-items-center">
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Ogasawara"
                                  />
                                </li>
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Stepan"
                                  />
                                </li>
                                <li className="avatar avatar-sm pull-up my-0">
                                  <img
                                    className="rounded-circle"
                                    src={avatar10}
                                    alt="Generic placeholder image"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Kimberly"
                                  />
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- active users and my task timeline cards ends here --> */}
          </div>
        </div>
      </div>

      {/* <!-- END: Content--> */}

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
