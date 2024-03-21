import React from "react";
// import "../app-assets/css/core/menu/menu-types/vertical-menu-modern.css";
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
                  {/* datatable start */}
                  <div className="table-responsive">
                    <table id="users-list-datatable" className="table">
                      <thead>
                        <tr>
                          <th>Booking Date</th>
                          <th>Booking Time</th>
                          <th>Address</th>
                          <th>Comment</th>
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
                          <td>
                            Essential Clothing Limited, Mouchak - Fulbaria Road,
                            Bangladesh
                          </td>
                          <td>Test Comment</td>
                          <td>
                            <button className="btn btn-red text-white mb-1">
                              Pending
                            </button>
                            <button className="btn btn-primary">
                              Turn into Gallery
                            </button>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        
                        </tr>
                        <tr>
                          <td>26-03-2024</td>
                          <td>03:00 pm - 06:00 am</td>
                          <td>First Canadian Place, Toronto, ON, Canada</td>
                          <td> </td>
                          <td>
                            <button className="btn btn-red text-white mb-1">
                              Pending
                            </button>
                            <button className="btn btn-primary">
                              Turn into Gallery
                            </button>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>30-11--0001</td>
                          <td>12:00 am - 12:00 am</td>
                          <td> </td>
                          <td> </td>
                          <td>
                            <button className="btn btn-red text-white mb-1">
                              Pending
                            </button>
                            <button className="btn btn-primary">
                              Turn into Gallery
                            </button>
                          </td>

                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>30-11--0001</td>
                          <td>12:00 am - 12:00 am</td>
                          <td> </td>
                          <td> </td>
                          <td>
                            <button className="btn btn-red text-white mb-1">
                              Pending
                            </button>
                            <button className="btn btn-primary">
                              Turn into Gallery
                            </button>
                          </td>

                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>26-01-2023</td>
                          <td>09:00 am - 04:30 pm</td>
                          <td>Closed Australia Day</td>
                          <td> </td>
                          <td>
                            <button className="btn btn-success text-white mb-1">
                              Confirmed
                            </button>
                            <button className="btn btn-primary">
                              Turn into Gallery
                            </button>
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
