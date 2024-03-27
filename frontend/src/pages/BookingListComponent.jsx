import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const BookingListComponent = () => {
  const [startdate, setStartdate] = useState(new Date());
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
            <div className="heading-elements content-header-right col-md-6 col-12 d-flex justify-content-end align-items-center mb-2">
              <ul className="list-inline mb-0">
                <li>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      data-toggle="modal"
                      data-target="#bootstrap"
                    >
                      New Booking
                    </button>

                    <div
                      className="modal fade text-left"
                      id="bootstrap"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="myModalLabel35"
                      aria-hidden="true"
                      style={{ display: "none" }}
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <form>
                            <div className="modal-body">
                              <label htmlFor="title">Title</label>
                              <input
                                type="text"
                                id="title"
                                className="form-control border-primary"
                                placeholder="Title"
                                name="title"
                                required
                              />
                            </div>
                            <div className="modal-body">
                              <label htmlFor="package">
                                Package (Optional)
                              </label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="Studio">Studio Package</option>
                                <option value="Essential">
                                  Essential Package
                                </option>
                                <option value="Premium">
                                  Premium Package
                                </option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="services">
                                Services (Optional)
                              </label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="Studio">
                                  Studio Photography
                                </option>
                                <option value="Essential">
                                  Essential Photography
                                </option>
                                <option value="Premium">
                                  Premium Photography
                                </option>
                                <option value="Studio">
                                  Studio Floor Plan
                                </option>
                                <option value="Essential">
                                  Essential Floor Plan
                                </option>
                                <option value="Premium">
                                  Premium Floor Plan
                                </option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label className="d-block">Preffered Date</label>
                              <DatePicker
                                className="form-control w-100 d-block"
                                id="datetimepicker4"
                                selected={startdate}
                                onChange={(date) => setStartdate(date)}
                              />
                            </div>
                            <div className="modal-footer">
                              <input
                                type="submit"
                                className="btn btn-outline-primary btn"
                                value="Save"
                              />
                              <input
                                type="reset"
                                className="btn btn-outline-secondary btn"
                                data-dismiss="modal"
                                value="Close"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
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
                    <table id="booking-list-datatable" className="table">
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
