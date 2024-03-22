import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddBooking = () => {
  const [startdate, setStartdate] = useState(new Date());
  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">New Booking</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">New Booking</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <section id="form-action-layouts">
              <div className="row match-height">
                <div className="col-md-12 col-12">
                  <div className="card ">
                    <div className="card-content collpase show">
                      <div className="card-body">
                        <form className="form col-md-6 col-12">
                          <div className="form-body">
                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
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
                              <div className="form-group col-md-12 col-12 mb-2">
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
                              <div className="form-group col-md-12 col-12 mb-2">
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
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label className="d-block">Preffered Date</label>
                                <DatePicker
                                  className="form-control w-100 d-block"
                                  id="datetimepicker4"
                                  selected={startdate}
                                  onChange={(date) => setStartdate(date)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-actions right">
                            <button
                              type="button"
                              className="btn btn-warning mr-1"
                            >
                              <i className="feather icon-x"></i> Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                              <i className="fa fa-check-square-o"></i> Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
