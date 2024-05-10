import React from "react";
import { MdDelete } from "react-icons/md";
// import "../app-assets/css/core/menu/menu-types/vertical-menu-modern.css";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import avatar5 from "../app-assets/images/portrait/small/avatar-s-14.png";
import avatar6 from "../app-assets/images/portrait/small/avatar-s-15.png";
import avatar7 from "../app-assets/images/portrait/small/avatar-s-4.png";
import avatar8 from "../app-assets/images/portrait/small/avatar-s-11.png";
import avatar9 from "../app-assets/images/portrait/small/avatar-s-19.png";
import avatar10 from "../app-assets/images/portrait/small/avatar-s-20.png";
import { Link } from "react-router-dom";

export const NotificationComponent = () => {
  return (
    <>
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Notifications</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Notifications</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="users-list-table">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered zero-configuration">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Notification</th>
                          <th>Action</th>
                          <th className="d-none">last activity</th>
                          <th className="d-none">verified</th>
                          <th className="d-none">role</th>
                          <th className="d-none">sad</th>
                          <th className="d-none">asd</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>21/01/2023</td>
                          <td>Notification Message</td>
                          <td className="d-flex justify-content-between">
                            <div className="btnsrow">
                              <button className="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                                <i className="fa fa-remove"></i>
                              </button>
                            </div>
                          </td>
                          <td className="d-none">amrit@mail.com</td>
                          <td className="d-none">No</td>
                          <td className="d-none">Staff</td>
                          <td className="d-none">
                            <span className="badge badge-success">Active</span>
                          </td>
                          <td className="d-none">
                            <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                              <i className="feather icon-edit-1" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>21/01/2023</td>
                          <td>Notification Message</td>
                          <td className="d-flex justify-content-between">
                            <div className="btnsrow">
                              <button className="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                                <i className="fa fa-remove"></i>
                              </button>
                            </div>
                          </td>
                          <td className="d-none">amrit@mail.com</td>
                          <td className="d-none">No</td>
                          <td className="d-none">Staff</td>
                          <td className="d-none">
                            <span className="badge badge-success">Active</span>
                          </td>
                          <td className="d-none">
                            <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                              <i className="feather icon-edit-1" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
