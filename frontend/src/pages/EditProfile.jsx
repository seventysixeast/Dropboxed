import React from "react";

const EditProfile = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          {/* users edit start */}
          <section className="users-edit">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <ul className="nav nav-tabs mb-2" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center active"
                        id="account-tab"
                        data-toggle="tab"
                        href="#account"
                        aria-controls="account"
                        role="tab"
                        aria-selected="true"
                      >
                        <i className="feather icon-user mr-25" />
                        <span className="d-none d-sm-block">Account</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center"
                        id="information-tab"
                        data-toggle="tab"
                        href="#information"
                        aria-controls="information"
                        role="tab"
                        aria-selected="false"
                      >
                        <i className="feather icon-info mr-25" />
                        <span className="d-none d-sm-block">Information</span>
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="account"
                      aria-labelledby="account-tab"
                      role="tabpanel"
                    >
                      {/* users edit media object start */}
                      <div className="media mb-2">
                        <a className="mr-2" href="#">
                          <img
                            src="../../../app-assets/images/portrait/small/avatar-s-26.png"
                            alt="users avatar"
                            className="users-avatar-shadow rounded-circle"
                            height={64}
                            width={64}
                          />
                        </a>
                        <div className="media-body">
                          <h4 className="media-heading">Avatar</h4>
                          <div className="col-12 px-0 d-flex">
                            <a href="#" className="btn btn-sm btn-primary mr-25">
                              Change
                            </a>
                            <a href="#" className="btn btn-sm btn-secondary">
                              Reset
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* users edit media object ends */}
                      {/* users edit account form start */}
                      <form noValidate="">
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <div className="controls">
                                <label>Username</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Username"
                                  defaultValue="dean3004"
                                  required=""
                                  data-validation-required-message="This username field is required"
                                />
                                <div className="help-block" />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="controls">
                                <label>Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  defaultValue="Dean Stanley"
                                  required=""
                                  data-validation-required-message="This name field is required"
                                />
                                <div className="help-block" />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="controls">
                                <label>E-mail</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email"
                                  defaultValue="deanstanley@gmail.com"
                                  required=""
                                  data-validation-required-message="This email field is required"
                                />
                                <div className="help-block" />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Role</label>
                              <select className="form-control">
                                <option>User</option>
                                <option>Staff</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Status</label>
                              <select className="form-control">
                                <option>Active</option>
                                <option>Banned</option>
                                <option>Close</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Company</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Company name"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="table-responsive">
                              <table className="table mt-1">
                                <thead>
                                  <tr>
                                    <th>Module Permission</th>
                                    <th>Read</th>
                                    <th>Write</th>
                                    <th>Create</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Users</td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox1"
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox1"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox2"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox2"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox3"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox3"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox4"
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox4"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Articles</td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox5"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox5"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox6"
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox6"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox7"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox7"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox8"
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox8"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Staff</td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox9"
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox9"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox10"
                                          className="custom-control-input"
                                          defaultChecked=""
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox10"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox11"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox11"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          id="users-checkbox12"
                                          className="custom-control-input"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="users-checkbox12"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                            <button
                              type="submit"
                              className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1"
                            >
                              Save changes
                            </button>
                            <button type="reset" className="btn btn-light">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                      {/* users edit account form ends */}
                    </div>
                    <div
                      className="tab-pane"
                      id="information"
                      aria-labelledby="information-tab"
                      role="tabpanel"
                    >
                      {/* users edit Info form start */}
                      <form noValidate="">
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <h5 className="mb-1">
                              <i className="feather icon-link mr-25" />
                              Social Links
                            </h5>
                            <div className="form-group">
                              <label>Twitter</label>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue="https://www.twitter.com/"
                              />
                            </div>
                            <div className="form-group">
                              <label>Facebook</label>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue="https://www.facebook.com/"
                              />
                            </div>
                            <div className="form-group">
                              <label>Google+</label>
                              <input className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                              <label>LinkedIn</label>
                              <input className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                              <label>Instagram</label>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue="https://www.instagram.com/"
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 mt-1 mt-sm-0">
                            <h5 className="mb-1">
                              <i className="feather icon-user mr-25" />
                              Personal Info
                            </h5>
                            <div className="form-group">
                              <div className="controls position-relative">
                                <label>Birth date</label>
                                <input
                                  type="text"
                                  className="form-control birthdate-picker picker__input"
                                  required=""
                                  placeholder="Birth date"
                                  data-validation-required-message="This birthdate field is required"
                                  readOnly=""
                                  id="P270512985"
                                  aria-haspopup="true"
                                  aria-readonly="false"
                                  aria-owns="P270512985_root"
                                />
                                <div
                                  className="picker"
                                  id="P270512985_root"
                                  aria-hidden="true"
                                >
                                  <div className="picker__holder" tabIndex={-1}>
                                    <div className="picker__frame">
                                      <div className="picker__wrap">
                                        <div className="picker__box">
                                          <div className="picker__header">
                                            <div className="picker__month">
                                              March
                                            </div>
                                            <div className="picker__year">2024</div>
                                            <div
                                              className="picker__nav--prev"
                                              data-nav={-1}
                                              tabIndex={0}
                                              role="button"
                                              aria-controls="P270512985_table"
                                              title="Previous month"
                                            >
                                              {" "}
                                            </div>
                                            <div
                                              className="picker__nav--next"
                                              data-nav={1}
                                              tabIndex={0}
                                              role="button"
                                              aria-controls="P270512985_table"
                                              title="Next month"
                                            >
                                              {" "}
                                            </div>
                                          </div>
                                          <table
                                            className="picker__table"
                                            id="P270512985_table"
                                            role="grid"
                                            aria-controls="P270512985"
                                            aria-readonly="true"
                                          >
                                            <thead>
                                              <tr>
                                                <th
                                                  className="picker__weekday"
                                                  scope="col"
                                                  title="Sunday"
                                                >
                                                  Sun
                                                </th>
                                                <th
                                                  className="picker__weekday"
                                                  scope="col"
                                                  title="Monday"
                                                >
                                                  Mon
                                                </th>
                                                <th
                                                  className="picker__weekday"
                                                  scope="col"
                                                  title="Tuesday"
                                                >
                                                  Tue
                                                </th>
                                                <th
                                                  className="picker__weekday"
                                                  scope="col"
                                                  title="Wednesday"
                                                >
                                                  Wed
                                                </th>
                                                <th
                                                  className="picker__weekday"
                                                  scope="col"
                                                  title="Thursday"
                                                >
                                                  Thu
                                                </th>
                                                <th
                                                  className="picker__weekday"
                                                  scope="col"
                                                  title="Friday"
                                                >
                                                  Fri
                                                </th>
                                                <th
                                                  className="picker__weekday"
                                                  scope="col"
                                                  title="Saturday"
                                                >
                                                  Sat
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1708799400000}
                                                    id="P270512985_1708799400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="February, 25, 2024"
                                                  >
                                                    25
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1708885800000}
                                                    id="P270512985_1708885800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="February, 26, 2024"
                                                  >
                                                    26
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1708972200000}
                                                    id="P270512985_1708972200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="February, 27, 2024"
                                                  >
                                                    27
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1709058600000}
                                                    id="P270512985_1709058600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="February, 28, 2024"
                                                  >
                                                    28
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1709145000000}
                                                    id="P270512985_1709145000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="February, 29, 2024"
                                                  >
                                                    29
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709231400000}
                                                    id="P270512985_1709231400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 1, 2024"
                                                  >
                                                    1
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709317800000}
                                                    id="P270512985_1709317800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 2, 2024"
                                                  >
                                                    2
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709404200000}
                                                    id="P270512985_1709404200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 3, 2024"
                                                  >
                                                    3
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709490600000}
                                                    id="P270512985_1709490600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 4, 2024"
                                                  >
                                                    4
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709577000000}
                                                    id="P270512985_1709577000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 5, 2024"
                                                  >
                                                    5
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709663400000}
                                                    id="P270512985_1709663400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 6, 2024"
                                                  >
                                                    6
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709749800000}
                                                    id="P270512985_1709749800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 7, 2024"
                                                  >
                                                    7
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709836200000}
                                                    id="P270512985_1709836200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 8, 2024"
                                                  >
                                                    8
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1709922600000}
                                                    id="P270512985_1709922600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 9, 2024"
                                                  >
                                                    9
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710009000000}
                                                    id="P270512985_1710009000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 10, 2024"
                                                  >
                                                    10
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710095400000}
                                                    id="P270512985_1710095400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 11, 2024"
                                                  >
                                                    11
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710181800000}
                                                    id="P270512985_1710181800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 12, 2024"
                                                  >
                                                    12
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710268200000}
                                                    id="P270512985_1710268200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 13, 2024"
                                                  >
                                                    13
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710354600000}
                                                    id="P270512985_1710354600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 14, 2024"
                                                  >
                                                    14
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710441000000}
                                                    id="P270512985_1710441000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 15, 2024"
                                                  >
                                                    15
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710527400000}
                                                    id="P270512985_1710527400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 16, 2024"
                                                  >
                                                    16
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710613800000}
                                                    id="P270512985_1710613800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 17, 2024"
                                                  >
                                                    17
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710700200000}
                                                    id="P270512985_1710700200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 18, 2024"
                                                  >
                                                    18
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710786600000}
                                                    id="P270512985_1710786600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 19, 2024"
                                                  >
                                                    19
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710873000000}
                                                    id="P270512985_1710873000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 20, 2024"
                                                  >
                                                    20
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1710959400000}
                                                    id="P270512985_1710959400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 21, 2024"
                                                  >
                                                    21
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711045800000}
                                                    id="P270512985_1711045800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 22, 2024"
                                                  >
                                                    22
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711132200000}
                                                    id="P270512985_1711132200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 23, 2024"
                                                  >
                                                    23
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711218600000}
                                                    id="P270512985_1711218600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 24, 2024"
                                                  >
                                                    24
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711305000000}
                                                    id="P270512985_1711305000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 25, 2024"
                                                  >
                                                    25
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711391400000}
                                                    id="P270512985_1711391400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 26, 2024"
                                                  >
                                                    26
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus picker__day--today picker__day--highlighted"
                                                    data-pick={1711477800000}
                                                    id="P270512985_1711477800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 27, 2024"
                                                    aria-activedescendant={
                                                      1711477800000
                                                    }
                                                  >
                                                    27
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711564200000}
                                                    id="P270512985_1711564200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 28, 2024"
                                                  >
                                                    28
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711650600000}
                                                    id="P270512985_1711650600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 29, 2024"
                                                  >
                                                    29
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711737000000}
                                                    id="P270512985_1711737000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 30, 2024"
                                                  >
                                                    30
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--infocus"
                                                    data-pick={1711823400000}
                                                    id="P270512985_1711823400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="March, 31, 2024"
                                                  >
                                                    31
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1711909800000}
                                                    id="P270512985_1711909800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="April, 1, 2024"
                                                  >
                                                    1
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1711996200000}
                                                    id="P270512985_1711996200000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="April, 2, 2024"
                                                  >
                                                    2
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1712082600000}
                                                    id="P270512985_1712082600000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="April, 3, 2024"
                                                  >
                                                    3
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1712169000000}
                                                    id="P270512985_1712169000000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="April, 4, 2024"
                                                  >
                                                    4
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1712255400000}
                                                    id="P270512985_1712255400000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="April, 5, 2024"
                                                  >
                                                    5
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    className="picker__day picker__day--outfocus"
                                                    data-pick={1712341800000}
                                                    id="P270512985_1712341800000"
                                                    tabIndex={0}
                                                    role="gridcell"
                                                    aria-label="April, 6, 2024"
                                                  >
                                                    6
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <div className="picker__footer">
                                            <button
                                              className="picker__button--today"
                                              type="button"
                                              data-pick={1711477800000}
                                              disabled=""
                                              aria-controls="P270512985"
                                            >
                                              Today
                                            </button>
                                            <button
                                              className="picker__button--clear"
                                              type="button"
                                              data-clear={1}
                                              disabled=""
                                              aria-controls="P270512985"
                                            >
                                              Clear
                                            </button>
                                            <button
                                              className="picker__button--close"
                                              type="button"
                                              data-close="true"
                                              disabled=""
                                              aria-controls="P270512985"
                                            >
                                              Close
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="help-block" />
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Country</label>
                              <select className="form-control" id="accountSelect">
                                <option>USA</option>
                                <option>India</option>
                                <option>Canada</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label>Languages</label>
                              <select
                                className="form-control select2-hidden-accessible"
                                id="users-language-select2"
                                multiple=""
                                data-select2-id="users-language-select2"
                                tabIndex={-1}
                                aria-hidden="true"
                              >
                                <option
                                  value="English"
                                  selected=""
                                  data-select2-id={2}
                                >
                                  English
                                </option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="Russian">Russian</option>
                                <option value="German">German</option>
                                <option
                                  value="Arabic"
                                  selected=""
                                  data-select2-id={3}
                                >
                                  Arabic
                                </option>
                                <option value="Sanskrit">Sanskrit</option>
                              </select>
                              <span
                                className="select2 select2-container select2-container--default"
                                dir="ltr"
                                data-select2-id={1}
                                style={{ width: "100%" }}
                              >
                                <span className="selection">
                                  <span
                                    className="select2-selection select2-selection--multiple"
                                    role="combobox"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    tabIndex={-1}
                                    aria-disabled="false"
                                  >
                                    <ul className="select2-selection__rendered">
                                      <li
                                        className="select2-selection__choice"
                                        title="English"
                                        data-select2-id={4}
                                      >
                                        <span
                                          className="select2-selection__choice__remove"
                                          role="presentation"
                                        >
                                          ×
                                        </span>
                                        English
                                      </li>
                                      <li
                                        className="select2-selection__choice"
                                        title="Arabic"
                                        data-select2-id={5}
                                      >
                                        <span
                                          className="select2-selection__choice__remove"
                                          role="presentation"
                                        >
                                          ×
                                        </span>
                                        Arabic
                                      </li>
                                      <li className="select2-search select2-search--inline">
                                        <input
                                          className="select2-search__field"
                                          type="search"
                                          tabIndex={0}
                                          autoComplete="off"
                                          autoCorrect="off"
                                          autoCapitalize="none"
                                          spellCheck="false"
                                          role="searchbox"
                                          aria-autocomplete="list"
                                          placeholder=""
                                          style={{ width: "0.75em" }}
                                        />
                                      </li>
                                    </ul>
                                  </span>
                                </span>
                                <span
                                  className="dropdown-wrapper"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <div className="form-group">
                              <div className="controls">
                                <label>Phone</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required=""
                                  placeholder="Phone number"
                                  defaultValue="(+656) 254 2568"
                                  data-validation-required-message="This phone number field is required"
                                />
                                <div className="help-block" />
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="controls">
                                <label>Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Address"
                                  data-validation-required-message="This Address field is required"
                                />
                                <div className="help-block" />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Website</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Website address"
                              />
                            </div>
                            <div className="form-group">
                              <label>Favourite Music</label>
                              <select
                                className="form-control select2-hidden-accessible"
                                id="users-music-select2"
                                multiple=""
                                data-select2-id="users-music-select2"
                                tabIndex={-1}
                                aria-hidden="true"
                              >
                                <option value="Rock">Rock</option>
                                <option
                                  value="Jazz"
                                  selected=""
                                  data-select2-id={7}
                                >
                                  Jazz
                                </option>
                                <option value="Disco">Disco</option>
                                <option value="Pop">Pop</option>
                                <option value="Techno">Techno</option>
                                <option
                                  value="Folk"
                                  selected=""
                                  data-select2-id={8}
                                >
                                  Folk
                                </option>
                                <option value="Hip hop">Hip hop</option>
                              </select>
                              <span
                                className="select2 select2-container select2-container--default"
                                dir="ltr"
                                data-select2-id={6}
                                style={{ width: "100%" }}
                              >
                                <span className="selection">
                                  <span
                                    className="select2-selection select2-selection--multiple"
                                    role="combobox"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    tabIndex={-1}
                                    aria-disabled="false"
                                  >
                                    <ul className="select2-selection__rendered">
                                      <li
                                        className="select2-selection__choice"
                                        title="Jazz"
                                        data-select2-id={9}
                                      >
                                        <span
                                          className="select2-selection__choice__remove"
                                          role="presentation"
                                        >
                                          ×
                                        </span>
                                        Jazz
                                      </li>
                                      <li
                                        className="select2-selection__choice"
                                        title="Folk"
                                        data-select2-id={10}
                                      >
                                        <span
                                          className="select2-selection__choice__remove"
                                          role="presentation"
                                        >
                                          ×
                                        </span>
                                        Folk
                                      </li>
                                      <li className="select2-search select2-search--inline">
                                        <input
                                          className="select2-search__field"
                                          type="search"
                                          tabIndex={0}
                                          autoComplete="off"
                                          autoCorrect="off"
                                          autoCapitalize="none"
                                          spellCheck="false"
                                          role="searchbox"
                                          aria-autocomplete="list"
                                          placeholder=""
                                          style={{ width: "0.75em" }}
                                        />
                                      </li>
                                    </ul>
                                  </span>
                                </span>
                                <span
                                  className="dropdown-wrapper"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Favourite movies</label>
                              <select
                                className="form-control select2-hidden-accessible"
                                id="users-movies-select2"
                                multiple=""
                                data-select2-id="users-movies-select2"
                                tabIndex={-1}
                                aria-hidden="true"
                              >
                                <option
                                  value="The Dark Knight"
                                  selected=""
                                  data-select2-id={12}
                                >
                                  The Dark Knight
                                </option>
                                <option
                                  value="Harry Potter"
                                  selected=""
                                  data-select2-id={13}
                                >
                                  Harry Potter
                                </option>
                                <option value="Airplane!">Airplane!</option>
                                <option value="Perl Harbour">Perl Harbour</option>
                                <option value="Spider Man">Spider Man</option>
                                <option
                                  value="Iron Man"
                                  selected=""
                                  data-select2-id={14}
                                >
                                  Iron Man
                                </option>
                                <option value="Avatar">Avatar</option>
                              </select>
                              <span
                                className="select2 select2-container select2-container--default"
                                dir="ltr"
                                data-select2-id={11}
                                style={{ width: "100%" }}
                              >
                                <span className="selection">
                                  <span
                                    className="select2-selection select2-selection--multiple"
                                    role="combobox"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    tabIndex={-1}
                                    aria-disabled="false"
                                  >
                                    <ul className="select2-selection__rendered">
                                      <li
                                        className="select2-selection__choice"
                                        title="The Dark Knight
                                                      "
                                        data-select2-id={15}
                                      >
                                        <span
                                          className="select2-selection__choice__remove"
                                          role="presentation"
                                        >
                                          ×
                                        </span>
                                        The Dark Knight
                                      </li>
                                      <li
                                        className="select2-selection__choice"
                                        title="Harry Potter"
                                        data-select2-id={16}
                                      >
                                        <span
                                          className="select2-selection__choice__remove"
                                          role="presentation"
                                        >
                                          ×
                                        </span>
                                        Harry Potter
                                      </li>
                                      <li
                                        className="select2-selection__choice"
                                        title="Iron Man"
                                        data-select2-id={17}
                                      >
                                        <span
                                          className="select2-selection__choice__remove"
                                          role="presentation"
                                        >
                                          ×
                                        </span>
                                        Iron Man
                                      </li>
                                      <li className="select2-search select2-search--inline">
                                        <input
                                          className="select2-search__field"
                                          type="search"
                                          tabIndex={0}
                                          autoComplete="off"
                                          autoCorrect="off"
                                          autoCapitalize="none"
                                          spellCheck="false"
                                          role="searchbox"
                                          aria-autocomplete="list"
                                          placeholder=""
                                          style={{ width: "0.75em" }}
                                        />
                                      </li>
                                    </ul>
                                  </span>
                                </span>
                                <span
                                  className="dropdown-wrapper"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                            <button
                              type="submit"
                              className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1"
                            >
                              Save changes
                            </button>
                            <button type="reset" className="btn btn-light">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                      {/* users edit Info form ends */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* users edit ends */}
        </div>
      </div>
    </div>

  );
};

export default EditProfile;
