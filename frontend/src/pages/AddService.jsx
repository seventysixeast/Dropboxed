import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const AddService = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;

  return (
    <div className="app-content content">
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-12 mb-2">
            <h3 className="content-header-title mb-0">Add Service</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  
                  <li className="breadcrumb-item active">Add Service</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
        <div className="content-body">
          <section id="number-tabs">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Add Service</h4>
                    <a className="heading-elements-toggle">
                      <i className="fa fa-ellipsis-h font-medium-3" />
                    </a>
                  </div>
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        action="#"
                        className="number-tab-steps wizard-circle wizard clearfix"
                        role="application"
                        id="steps-uid-0"
                      >
                        <div className="steps clearfix">
                          <ul role="tablist">
                            <li
                              role="tab"
                              className="first current"
                              aria-disabled="false"
                              aria-selected="true"
                            >
                              <a
                                id="steps-uid-0-t-0"
                                href="#steps-uid-0-h-0"
                                aria-controls="steps-uid-0-p-0"
                              >
                                <span className="current-info audible">
                                  current step:{" "}
                                </span>
                                <span className="step">1</span> Step 1
                              </a>
                            </li>
                            <li
                              role="tab"
                              className="done"
                              aria-disabled="false"
                              aria-selected="false"
                            >
                              <a
                                id="steps-uid-0-t-1"
                                href="#steps-uid-0-h-1"
                                aria-controls="steps-uid-0-p-1"
                              >
                                <span className="step">2</span> Step 2
                              </a>
                            </li>
                            <li
                              role="tab"
                              className="done"
                              aria-disabled="false"
                              aria-selected="false"
                            >
                              <a
                                id="steps-uid-0-t-2"
                                href="#steps-uid-0-h-2"
                                aria-controls="steps-uid-0-p-2"
                              >
                                <span className="step">3</span> Step 3
                              </a>
                            </li>
                            <li
                              role="tab"
                              className="last done"
                              aria-disabled="false"
                              aria-selected="false"
                            >
                              <a
                                id="steps-uid-0-t-3"
                                href="#steps-uid-0-h-3"
                                aria-controls="steps-uid-0-p-3"
                              >
                                <span className="step">4</span> Step 4
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="content clearfix">
                          {/* Step 1 */}
                          <h6
                            id="steps-uid-0-h-0"
                            tabIndex={-1}
                            className="title current"
                          >
                            Step 1
                          </h6>
                          <fieldset
                            id="steps-uid-0-p-0"
                            role="tabpanel"
                            aria-labelledby="steps-uid-0-h-0"
                            className="body current"
                            aria-hidden="false"
                            style={{}}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="firstName1">
                                    First Name :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="firstName1"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="lastName1">Last Name :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName1"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="emailAddress1">
                                    Email Address :
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="emailAddress1"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="location1">
                                    Select City :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="location1"
                                    name="location"
                                  >
                                    <option value="">Select City</option>
                                    <option value="Amsterdam">Amsterdam</option>
                                    <option value="Berlin">Berlin</option>
                                    <option value="Frankfurt">Frankfurt</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="phoneNumber1">
                                    Phone Number :
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneNumber1"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="date1">Date of Birth :</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="date1"
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 2 */}
                          <h6
                            id="steps-uid-0-h-1"
                            tabIndex={-1}
                            className="title"
                          >
                            Step 2
                          </h6>
                          <fieldset
                            id="steps-uid-0-p-1"
                            role="tabpanel"
                            aria-labelledby="steps-uid-0-h-1"
                            className="body"
                            aria-hidden="true"
                            style={{ display: "none" }}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="proposalTitle1">
                                    Proposal Title :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="proposalTitle1"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="emailAddress2">
                                    Email Address :
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="emailAddress2"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="videoUrl1">Video URL :</label>
                                  <input
                                    type="url"
                                    className="form-control"
                                    id="videoUrl1"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="jobTitle1">Job Title :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="jobTitle1"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="shortDescription1">
                                    Short Description :
                                  </label>
                                  <textarea
                                    name="shortDescription"
                                    id="shortDescription1"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 3 */}
                          <h6
                            id="steps-uid-0-h-2"
                            tabIndex={-1}
                            className="title"
                          >
                            Step 3
                          </h6>
                          <fieldset
                            id="steps-uid-0-p-2"
                            role="tabpanel"
                            aria-labelledby="steps-uid-0-h-2"
                            className="body"
                            aria-hidden="true"
                            style={{ display: "none" }}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="eventName1">
                                    Event Name :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="eventName1"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventType1">
                                    Event Type :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventType1"
                                    data-placeholder="Type to search cities"
                                    name="eventType1"
                                  >
                                    <option value="Banquet">Banquet</option>
                                    <option value="Fund Raiser">
                                      Fund Raiser
                                    </option>
                                    <option value="Dinner Party">
                                      Dinner Party
                                    </option>
                                    <option value="Wedding">Wedding</option>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventLocation1">
                                    Event Location :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventLocation1"
                                    name="location"
                                  >
                                    <option value="">Select City</option>
                                    <option value="Amsterdam">Amsterdam</option>
                                    <option value="Berlin">Berlin</option>
                                    <option value="Frankfurt">Frankfurt</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="jobTitle2">
                                    Event Date - Time :
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control datetime"
                                      id="jobTitle2"
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        <span className="feather icon-calendar" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventStatus1">
                                    Event Status :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventStatus1"
                                    name="eventStatus"
                                  >
                                    <option value="Planning">Planning</option>
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                    <option value="Finished">Finished</option>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>Requirements :</label>
                                  <div className="c-inputs-stacked">
                                    <div className="d-inline-block custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="status1"
                                        className="custom-control-input"
                                        id="staffing1"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="staffing1"
                                      >
                                        Staffing
                                      </label>
                                    </div>
                                    <div className="d-inline-block custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="status1"
                                        className="custom-control-input"
                                        id="catering1"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="catering1"
                                      >
                                        Catering
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 4 */}
                          <h6
                            id="steps-uid-0-h-3"
                            tabIndex={-1}
                            className="title"
                          >
                            Step 4
                          </h6>
                          <fieldset
                            id="steps-uid-0-p-3"
                            role="tabpanel"
                            aria-labelledby="steps-uid-0-h-3"
                            className="body"
                            aria-hidden="true"
                            style={{ display: "none" }}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="meetingName1">
                                    Name of Meeting :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="meetingName1"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="meetingLocation1">
                                    Location :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="meetingLocation1"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="participants1">
                                    Names of Participants
                                  </label>
                                  <textarea
                                    name="participants"
                                    id="participants1"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="decisions1">
                                    Decisions Reached
                                  </label>
                                  <textarea
                                    name="decisions"
                                    id="decisions1"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Agenda Items :</label>
                                  <div className="c-inputs-stacked">
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda1"
                                        className="custom-control-input"
                                        id="item11"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item11"
                                      >
                                        1st item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda1"
                                        className="custom-control-input"
                                        id="item12"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item12"
                                      >
                                        2nd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda1"
                                        className="custom-control-input"
                                        id="item13"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item13"
                                      >
                                        3rd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda1"
                                        className="custom-control-input"
                                        id="item14"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item14"
                                      >
                                        4th item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda1"
                                        className="custom-control-input"
                                        id="item15"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item15"
                                      >
                                        5th item
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div className="actions clearfix">
                          <ul role="menu" aria-label="Pagination">
                            <li className="disabled" aria-disabled="true">
                              <a href="#previous" role="menuitem">
                                Previous
                              </a>
                            </li>
                            <li
                              aria-hidden="false"
                              aria-disabled="false"
                              className=""
                              style={{}}
                            >
                              <a href="#next" role="menuitem">
                                Next
                              </a>
                            </li>
                            <li aria-hidden="true" style={{ display: "none" }}>
                              <a href="#finish" role="menuitem">
                                Submit
                              </a>
                            </li>
                          </ul>
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
  );
};

export default AddService;
