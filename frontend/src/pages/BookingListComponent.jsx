import React from "react";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import avatar5 from "../app-assets/images/portrait/small/avatar-s-14.png";
import avatar6 from "../app-assets/images/portrait/small/avatar-s-15.png";
import avatar7 from "../app-assets/images/portrait/small/avatar-s-4.png";
import avatar8 from "../app-assets/images/portrait/small/avatar-s-11.png";
import avatar9 from "../app-assets/images/portrait/small/avatar-s-19.png";
import avatar10 from "../app-assets/images/portrait/small/avatar-s-20.png";
import { Link } from "react-router-dom";

export const BookingListComponent = () => {
  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Booking List</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Bookings</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <section id="events-examples">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <div id="fc-event-colors"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="app-content content">
        <div className="content-overlay" />
        <div className="content-wrapper">
          <div className="users-list-table">
            <div className="card">
              <h5 className="breadcrumb-item active p-1">Bookings</h5>
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="users-list-datatable" className="table">
                      <thead>
                        <tr>
                          <th>Booking Date</th>
                          <th>Booking Time</th>
                          <th>Customer</th>
                          <th>Code</th>
                          <th>Address</th>
                          <th>Comment</th>
                          {/* <th>Assign Photographer</th> */}
                          <th>Status</th>
                          <th className="d-none"></th>
                          <th className="d-none"></th>
                          <th className="d-none"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>22-03-2024</td>
                          <td>10:30 am - 01:00 pm</td>
                          <td>Client Name</td>
                          <td>
                            <span
                              className="bullet bullet-sm tooltip_color"
                              style={{ backgroundColor: "#000000" }}
                            ></span>
                          </td>
                          <td>
                            Essential Clothing Limited, Mouchak - Fulbaria Road,
                            Bangladesh
                          </td>
                          <td>Test Comment</td>
                          {/* <td>PhotoGrapher Dropdown</td> */}
                          <td>
                            <a href="#" className="table-button bg-red">
                              Pending
                            </a>
                            <a href="#" className="table-button bg-red">
                              Notify
                            </a>
                            <a href="#" className="table-button bg-success">
                              Booked
                            </a>
                            <a href="#" className="table-button ">
                              Edit
                            </a>
                            <a href="#" className="table-button ">
                              Delete
                            </a>

                            <a href="#" className="table-button">
                              Turn into Gallery
                            </a>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>26-03-2024</td>
                          <td>03:00 pm - 06:00 am</td>
                          <td>Client Name</td>
                          <td>
                            <span
                              className="bullet bullet-sm tooltip_color"
                              style={{ backgroundColor: "#000000" }}
                            ></span>
                          </td>
                          <td>First Canadian Place, Toronto, ON, Canada</td>
                          <td> </td>
                          {/* <td>PhotoGrapher Dropdown</td> */}
                          <td>
                            <a href="#" className="table-button bg-red">
                              Pending
                            </a>
                            <a href="#" className="table-button bg-red">
                              Notify
                            </a>
                            <a href="#" className="table-button bg-success">
                              Booked
                            </a>
                            <a href="#" className="table-button ">
                              Edit
                            </a>
                            <a href="#" className="table-button ">
                              Delete
                            </a>

                            <a href="#" className="table-button">
                              Turn into Gallery
                            </a>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
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
