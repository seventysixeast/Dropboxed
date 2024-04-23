import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const AddService = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Form Wizard</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Page</a>
                    </li>
                    <li className="breadcrumb-item active">Form Wizard</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-12 mb-md-0 mb-2">
              <div
                className="btn-group float-md-right"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-outline-primary dropdown-toggle dropdown-menu-right"
                    id="btnGroupDrop1"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="feather icon-settings icon-left" /> Settings
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="btnGroupDrop1"
                  >
                    <a className="dropdown-item" href="card-bootstrap.html">
                      Bootstrap Cards
                    </a>
                    <a
                      className="dropdown-item"
                      href="component-buttons-extended.html"
                    >
                      Buttons Extended
                    </a>
                  </div>
                </div>
                <a
                  className="btn btn-outline-primary"
                  href="full-calender-basic.html"
                >
                  <i className="feather icon-mail" />
                </a>
                <a
                  className="btn btn-outline-primary"
                  href="timeline-center.html"
                >
                  <i className="feather icon-pie-chart" />
                </a>
              </div>
            </div>
          </div>
          <div className="content-body">
            {/* Form wizard with number tabs section start */}
            <section id="number-tabs">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">
                        Form wizard with number tabs
                      </h4>
                      <a className="heading-elements-toggle">
                        <i className="fa fa-ellipsis-h font-medium-3" />
                      </a>
                      <div className="heading-elements">
                        <ul className="list-inline mb-0">
                          <li>
                            <a data-action="collapse">
                              <i className="feather icon-minus" />
                            </a>
                          </li>
                          <li>
                            <a data-action="reload">
                              <i className="feather icon-rotate-cw" />
                            </a>
                          </li>
                          <li>
                            <a data-action="expand">
                              <i className="feather icon-maximize" />
                            </a>
                          </li>
                          <li>
                            <a data-action="close">
                              <i className="feather icon-x" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <form
                          action="#"
                          className="number-tab-steps wizard-circle"
                        >
                          {/* Step 1 */}
                          <h6>Step 1</h6>
                          <fieldset>
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
                                    <option value>Select City</option>
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
                          <h6>Step 2</h6>
                          <fieldset>
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
                          <h6>Step 3</h6>
                          <fieldset>
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
                                    <option value>Select City</option>
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
                          <h6>Step 4</h6>
                          <fieldset>
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Form wizard with number tabs section end */}
            {/* Form wizard with icon tabs section start */}
            <section id="icon-tabs">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Form wizard with icon tabs</h4>
                      <a className="heading-elements-toggle">
                        <i className="fa fa-ellipsis-h font-medium-3" />
                      </a>
                      <div className="heading-elements">
                        <ul className="list-inline mb-0">
                          <li>
                            <a data-action="collapse">
                              <i className="feather icon-minus" />
                            </a>
                          </li>
                          <li>
                            <a data-action="reload">
                              <i className="feather icon-rotate-cw" />
                            </a>
                          </li>
                          <li>
                            <a data-action="expand">
                              <i className="feather icon-maximize" />
                            </a>
                          </li>
                          <li>
                            <a data-action="close">
                              <i className="feather icon-x" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <form
                          action="#"
                          className="icons-tab-steps wizard-circle"
                        >
                          {/* Step 1 */}
                          <h6>
                            <i className="step-icon fa fa-home" /> Step 1
                          </h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="firstName2">
                                    First Name :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="firstName2"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="lastName2">Last Name :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName2"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="emailAddress3">
                                    Email Address :
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="emailAddress3"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="location2">
                                    Select City :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="location2"
                                    name="location"
                                  >
                                    <option value>Select City</option>
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
                                  <label htmlFor="phoneNumber2">
                                    Phone Number :
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneNumber2"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="date2">Date of Birth :</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="date2"
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 2 */}
                          <h6>
                            <i className="step-icon fa fa-pencil" />
                            Step 2
                          </h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="proposalTitle2">
                                    Proposal Title :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="proposalTitle2"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="emailAddress4">
                                    Email Address :
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="emailAddress4"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="videoUrl2">Video URL :</label>
                                  <input
                                    type="url"
                                    className="form-control"
                                    id="videoUrl2"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="jobTitle3">Job Title :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="jobTitle3"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="shortDescription2">
                                    Short Description :
                                  </label>
                                  <textarea
                                    name="shortDescription"
                                    id="shortDescription2"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 3 */}
                          <h6>
                            <i className="step-icon fa fa-tv" />
                            Step 3
                          </h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="eventName2">
                                    Event Name :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="eventName2"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventType2">
                                    Event Type :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventType2"
                                    data-placeholder="Type to search cities"
                                    name="eventType2"
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
                                  <label htmlFor="eventLocation2">
                                    Event Location :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventLocation2"
                                    name="location"
                                  >
                                    <option value>Select City</option>
                                    <option value="Amsterdam">Amsterdam</option>
                                    <option value="Berlin">Berlin</option>
                                    <option value="Frankfurt">Frankfurt</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Event Date - Time :</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control datetime"
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        <span className="feather icon-calendar" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventStatus2">
                                    Event Status :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventStatus2"
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
                                        name="status2"
                                        className="custom-control-input"
                                        id="staffing2"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="staffing2"
                                      >
                                        Staffing
                                      </label>
                                    </div>
                                    <div className="d-inline-block custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="status2"
                                        className="custom-control-input"
                                        id="catering2"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="catering2"
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
                          <h6>
                            <i className="step-icon fa fa-image" />
                            Step 4
                          </h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="meetingName2">
                                    Name of Meeting :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="meetingName2"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="meetingLocation2">
                                    Location :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="meetingLocation2"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="participants2">
                                    Names of Participants
                                  </label>
                                  <textarea
                                    name="participants"
                                    id="participants2"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="decisions2">
                                    Decisions Reached
                                  </label>
                                  <textarea
                                    name="decisions"
                                    id="decisions2"
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
                                        name="agenda2"
                                        className="custom-control-input"
                                        id="item21"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item21"
                                      >
                                        1st item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda2"
                                        className="custom-control-input"
                                        id="item22"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item22"
                                      >
                                        2nd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda2"
                                        className="custom-control-input"
                                        id="item23"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item23"
                                      >
                                        3rd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda2"
                                        className="custom-control-input"
                                        id="item24"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item24"
                                      >
                                        4th item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda2"
                                        className="custom-control-input"
                                        id="item25"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item25"
                                      >
                                        5th item
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Form wizard with icon tabs section end */}
            {/* Form wizard with step validation section start */}
            <section id="validation">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Validation Example</h4>
                      <a className="heading-elements-toggle">
                        <i className="fa fa-ellipsis-h font-medium-3" />
                      </a>
                      <div className="heading-elements">
                        <ul className="list-inline mb-0">
                          <li>
                            <a data-action="collapse">
                              <i className="feather icon-minus" />
                            </a>
                          </li>
                          <li>
                            <a data-action="reload">
                              <i className="feather icon-rotate-cw" />
                            </a>
                          </li>
                          <li>
                            <a data-action="expand">
                              <i className="feather icon-maximize" />
                            </a>
                          </li>
                          <li>
                            <a data-action="close">
                              <i className="feather icon-x" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <form
                          action="#"
                          className="steps-validation wizard-circle"
                        >
                          {/* Step 1 */}
                          <h6>Step 1</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="firstName3">
                                    First Name :
                                    <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="firstName3"
                                    name="firstName"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="lastName3">
                                    Last Name :<span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="lastName3"
                                    name="lastName"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="emailAddress5">
                                    Email Address :
                                    <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control required"
                                    id="emailAddress5"
                                    name="emailAddress"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="location">
                                    Select City :
                                    <span className="danger">*</span>
                                  </label>
                                  <select
                                    className="custom-select form-control required"
                                    id="location"
                                    name="location"
                                  >
                                    <option value>Select City</option>
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
                                  <label htmlFor="phoneNumber3">
                                    Phone Number :
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneNumber3"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="date3">Date of Birth :</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="date3"
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 2 */}
                          <h6>Step 2</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="proposalTitle3">
                                    Proposal Title :
                                    <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="proposalTitle3"
                                    name="proposalTitle"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="emailAddress6">
                                    Email Address :
                                    <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control required"
                                    id="emailAddress6"
                                    name="emailAddress"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="videoUrl3">Video URL :</label>
                                  <input
                                    type="url"
                                    className="form-control"
                                    id="videoUrl3"
                                    name="videoUrl"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="jobTitle5">
                                    Job Title :<span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="jobTitle5"
                                    name="jobTitle"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="shortDescription3">
                                    Short Description :
                                  </label>
                                  <textarea
                                    name="shortDescription"
                                    id="shortDescription3"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 3 */}
                          <h6>Step 3</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="eventName3">
                                    Event Name :
                                    <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="eventName3"
                                    name="eventName"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventType3">
                                    Event Type :
                                    <span className="danger">*</span>
                                  </label>
                                  <select
                                    className="custom-select form-control required"
                                    id="eventType3"
                                    name="eventType"
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
                                  <label htmlFor="eventLocation3">
                                    Event Location :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventLocation3"
                                    name="eventLocation"
                                  >
                                    <option value>Select City</option>
                                    <option value="Amsterdam">Amsterdam</option>
                                    <option value="Berlin">Berlin</option>
                                    <option value="Frankfurt">Frankfurt</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="eventDate">
                                    Event Date - Time :
                                    <span className="danger">*</span>
                                  </label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control datetime required"
                                      id="eventDate"
                                      name="eventDate"
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        <span className="feather icon-calendar" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventStatus3">
                                    Event Status :
                                    <span className="danger">*</span>
                                  </label>
                                  <select
                                    className="custom-select form-control required"
                                    id="eventStatus3"
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
                                        name="status3"
                                        className="custom-control-input"
                                        id="staffing3"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="staffing3"
                                      >
                                        Staffing
                                      </label>
                                    </div>
                                    <div className="d-inline-block custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="status3"
                                        className="custom-control-input"
                                        id="catering3"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="catering3"
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
                          <h6>Step 4</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="meetingName3">
                                    Name of Meeting :
                                    <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="meetingName3"
                                    name="meetingName"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="meetingLocation3">
                                    Location :<span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="meetingLocation3"
                                    name="meetingLocation"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="participants3">
                                    Names of Participants
                                  </label>
                                  <textarea
                                    name="participants"
                                    id="participants3"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="decisions3">
                                    Decisions Reached
                                  </label>
                                  <textarea
                                    name="decisions"
                                    id="decisions3"
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
                                        name="agenda3"
                                        className="custom-control-input"
                                        id="item31"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item31"
                                      >
                                        1st item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda3"
                                        className="custom-control-input"
                                        id="item32"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item32"
                                      >
                                        2nd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda3"
                                        className="custom-control-input"
                                        id="item33"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item33"
                                      >
                                        3rd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda3"
                                        className="custom-control-input"
                                        id="item34"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item34"
                                      >
                                        4th item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda3"
                                        className="custom-control-input"
                                        id="item35"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item35"
                                      >
                                        5th item
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Form wizard with step validation section end */}
            {/* Form wizard with vertical tabs section start */}
            <section id="vertical-tabs">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">
                        Form wizard with vertical tabs
                      </h4>
                      <a className="heading-elements-toggle">
                        <i className="fa fa-ellipsis-h font-medium-3" />
                      </a>
                      <div className="heading-elements">
                        <ul className="list-inline mb-0">
                          <li>
                            <a data-action="collapse">
                              <i className="feather icon-minus" />
                            </a>
                          </li>
                          <li>
                            <a data-action="reload">
                              <i className="feather icon-rotate-cw" />
                            </a>
                          </li>
                          <li>
                            <a data-action="expand">
                              <i className="feather icon-maximize" />
                            </a>
                          </li>
                          <li>
                            <a data-action="close">
                              <i className="feather icon-x" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <form
                          action="#"
                          className="vertical-tab-steps wizard-circle"
                        >
                          {/* Step 1 */}
                          <h6>Step 1</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="firstName4">
                                    First Name :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="firstName4"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="lastName4">Last Name :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastName4"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="emailAddress7">
                                    Email Address :
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="emailAddress7"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="location3">
                                    Select City :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="location3"
                                    name="location"
                                  >
                                    <option value>Select City</option>
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
                                  <label htmlFor="phoneNumber4">
                                    Phone Number :
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneNumber4"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="date4">Date of Birth :</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    id="date4"
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 2 */}
                          <h6>Step 2</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="proposalTitle4">
                                    Proposal Title :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="proposalTitle4"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="emailAddress8">
                                    Email Address :
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="emailAddress8"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="videoUrl4">Video URL :</label>
                                  <input
                                    type="url"
                                    className="form-control"
                                    id="videoUrl4"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="jobTitle6">Job Title :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="jobTitle6"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="shortDescription4">
                                    Short Description :
                                  </label>
                                  <textarea
                                    name="shortDescription"
                                    id="shortDescription4"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          {/* Step 3 */}
                          <h6>Step 3</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="eventName4">
                                    Event Name :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="eventName4"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventType4">
                                    Event Type :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventType4"
                                    data-placeholder="Type to search cities"
                                    name="eventType4"
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
                                  <label htmlFor="eventLocation4">
                                    Event Location :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventLocation4"
                                    name="location"
                                  >
                                    <option value>Select City</option>
                                    <option value="Amsterdam">Amsterdam</option>
                                    <option value="Berlin">Berlin</option>
                                    <option value="Frankfurt">Frankfurt</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Event Date - Time :</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control datetime"
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        <span className="feather icon-calendar" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="eventStatus4">
                                    Event Status :
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    id="eventStatus4"
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
                                        name="status4"
                                        className="custom-control-input"
                                        id="staffing4"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="staffing4"
                                      >
                                        Staffing
                                      </label>
                                    </div>
                                    <div className="d-inline-block custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="status4"
                                        className="custom-control-input"
                                        id="catering4"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="catering4"
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
                          <h6>Step 4</h6>
                          <fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="meetingName4">
                                    Name of Meeting :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="meetingName4"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="meetingLocation4">
                                    Location :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="meetingLocation4"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="participants4">
                                    Names of Participants
                                  </label>
                                  <textarea
                                    name="participants"
                                    id="participants4"
                                    rows={4}
                                    className="form-control"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="decisions4">
                                    Decisions Reached
                                  </label>
                                  <textarea
                                    name="decisions"
                                    id="decisions4"
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
                                        name="agenda4"
                                        className="custom-control-input"
                                        id="item41"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item41"
                                      >
                                        1st item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda4"
                                        className="custom-control-input"
                                        id="item42"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item42"
                                      >
                                        2nd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda4"
                                        className="custom-control-input"
                                        id="item43"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item43"
                                      >
                                        3rd item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda4"
                                        className="custom-control-input"
                                        id="item44"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item44"
                                      >
                                        4th item
                                      </label>
                                    </div>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        name="agenda4"
                                        className="custom-control-input"
                                        id="item45"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="item45"
                                      >
                                        5th item
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
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
      <div class="sidenav-overlay"></div>
      <div class="drag-target"></div>
    </>
  );
};

export default AddService;
