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
                      className="btn btn-outline-primary btn-block"
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
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h3 className="card-title">Add Booking</h3>
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
                              <label htmlFor="title">Booking Title *</label>
                              <input
                                type="text"
                                id="title"
                                className="form-control border-primary"
                                placeholder="Enter Client Address"
                                name="title"
                                required
                              />
                            </div>
                            <div className="modal-body">
                              <label htmlFor="package">
                                Package (Optional)
                              </label>
                              <select className="select2 form-control" required>
                                <option value="Studio">Studio Package</option>
                                <option value="Essential">
                                  Essential Package
                                </option>
                                <option value="Premium">Premium Package</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="services">
                                Services (Optional)
                              </label>
                              <select className="select2 form-control" required>
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
                              <label className="d-block">Preffered Date *</label>
                              <DatePicker
                                className="form-control w-100 d-block"
                                id="datetimepicker4"
                                selected={startdate}
                                onChange={(date) => setStartdate(date)}
                              />
                            </div>
                            <div className="modal-body">
                              <label>From Time *</label>
                              <select className="select2 form-control" required>
                                <option value="1">7:00</option>
                                <option value="2">7:30</option>
                                <option value="3">8:00</option>
                                <option value="3">8:30</option>
                                <option value="3">9:00</option>
                                <option value="3">9:30</option>
                                <option value="3">10:00</option>
                                <option value="3">10:30</option>
                                <option value="3">11:00</option>
                                <option value="3">11:30</option>
                                <option value="3">12:00</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label>To Time *</label>
                              <select className="select2 form-control" required>
                                <option value="1">7:00</option>
                                <option value="2">7:30</option>
                                <option value="3">8:00</option>
                                <option value="3">8:30</option>
                                <option value="3">9:00</option>
                                <option value="3">9:30</option>
                                <option value="3">10:00</option>
                                <option value="3">10:30</option>
                                <option value="3">11:00</option>
                                <option value="3">11:30</option>
                                <option value="3">12:00</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label >Select Client</label>
                              <select className="select2 form-control" required>
                                <option value="1">Peter</option>
                                <option value="2">Admin</option>
                                <option value="3">Belle</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="comment">Comment (optional)</label>
                              <input
                                type="text"
                                id="comment"
                                className="form-control border-primary"
                                placeholder="Write Comment"
                                name="comment"
                                required
                              />
                            </div>
                            <div className="modal-footer">
                              <input
                                type="submit"
                                className="btn btn-primary btn"
                                value="Save"
                              />
                              <input
                                type="reset"
                                className="btn btn-secondary btn"
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
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="users-list-table">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table class="table table-striped table-bordered zero-configuration">
                      <thead>
                        <tr>
                          <th>Booking Date</th>
                          <th>Booking Time</th>
                          <th>Client</th>
                          <th>Code</th>
                          <th>Address</th>
                          <th>Comment</th>
                          <th>Status</th>
                          <th>Action</th>
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
                          <td>
                            <span class="badge badge-warning">Pending</span>
                          </td>
                          <td>
                            <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                              <i className="fa fa-remove"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-primary mr-1 mb-1" title="Turn into Gallery">
                              <i class="fa fa-solid fa-image"></i>
                            </button>
                          </td>
                          <td className="d-none" ></td>
                          <td className="d-none" ></td>
                          <td className="d-none" ></td>
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
                          <td>
                            <span class="badge badge-danger">Notify</span>
                          </td>
                          <td>
                            <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                              <i className="fa fa-remove"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-primary mr-1 mb-1" title="Turn into Gallery">
                              <i class="fa fa-solid fa-image"></i>
                            </button>
                          </td>
                          <td className="d-none" ></td>
                          <td className="d-none" ></td>
                          <td className="d-none" ></td>
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
                          <td>
                            <span class="badge badge-success">Booked</span>
                          </td>
                          <td>
                            <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                              <i className="fa fa-remove"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-primary mr-1 mb-1" title="Turn into Gallery">
                              <i class="fa fa-solid fa-image"></i>
                            </button>
                          </td>
                          <td className="d-none" ></td>
                          <td className="d-none" ></td>
                          <td className="d-none" ></td>
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
