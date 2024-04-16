import React from "react";
import Switch from '@mui/material/Switch';
import banner1 from "../assets/images/Web-08428_1711059614.jpg";
import banner2 from "../assets/images/DSC09293_1711016396.jpg";

const Collections = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row mt-2">
          <div className="content-header-left col-md-6 col-6 mb-2">
            <h3 className="content-header-title mb-0">Collection List</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Collection List</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
            <ul className="list-inline mb-0">
              <li>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-block"
                    data-toggle="modal"
                    data-target="#bootstrap"
                  >
                    Add Gallery
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
                          <h3 className="card-title">Download from Dropbox & Add in Gallery</h3>
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
                            <fieldset className="form-group floating-label-form-group">
                              <label htmlFor="title">
                                Title *
                              </label>
                              <textarea
                                className="form-control"
                                id="title"
                                rows="1"
                                placeholder="Title"
                              ></textarea>
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label>Clients</label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="client1">Client 1</option>
                                <option value="client2">Client 2</option>
                                <option value="client3">Client 3</option>
                              </select>
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label htmlFor="address">
                                Address
                              </label>
                              <textarea
                                className="form-control"
                                id="address"
                                rows="1"
                                placeholder="Address"
                              ></textarea>
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label htmlFor="package">Package</label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="Studio">
                                  Studio Package
                                </option>
                                <option value="Essential">
                                  Essential Package
                                </option>
                                <option value="Premium">
                                  Premium Package
                                </option>
                              </select>
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label htmlFor="services">Services</label>
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
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label htmlFor="link">
                                Dropbox Link
                              </label>
                              <textarea
                                className="form-control"
                                id="link"
                                rows="1"
                                placeholder="Link"
                              ></textarea>
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label htmlFor="link">
                                Vimeo Video Link
                              </label>
                              <textarea
                                className="form-control"
                                id="link"
                                rows="1"
                                placeholder="Link"
                              ></textarea>
                            </fieldset>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="projectinput2">Banner</label><br />
                                  <input type="file" name="banner" id="banner" />
                                  <input type="hidden" name="bannerimage" value="" />
                                </div>
                              </div>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Status *</label>
                                <select
                                  className="select2 form-control"
                                  required
                                >
                                  <option value="on">On</option>
                                  <option value="off">Off</option>
                                </select>
                              </fieldset>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <input
                              type="submit"
                              className="btn btn-primary btn"
                              value="Download"
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
        <div className="users-list-table">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table class="table table-striped table-bordered zero-configuration table-inverse">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Banner</th>
                        <th>Gallery Title</th>
                        <th>Photographer</th>
                        <th>Client</th>
                        <th>Booking Title</th>
                        <th>Services</th>
                        <th>Lock/Unlock</th>
                        <th>Notify</th>
                        <th>Action</th>
                        <th className="d-none">verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>925</td>
                        <td><img src={banner1} style={{ width: "150px" }} /></td>
                        <td>Pre Wedding</td>
                        <td>Pete</td>
                        <td>
                          Lois Bucket Real Estate <br />
                          <b>Username: </b>dylan@loisbuckett.com.au <br />
                          <b>22 Mar 2024 06:21 am</b>
                        </td>
                        <td>6 Tara Downs, Lennox Head NSW, Australia</td>
                        <td><b>Essential Package - $485.00</b></td>
                        <td>
                          <Switch
                            checked={true}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </td>
                        <td>
                        <div className="badge badge-pill badge-light-primary">Notify</div>
                        </td>
                        <td>
                          <button class="btn btn-icon btn-outline-secondary mr-1 mb-1" title="Edit">
                            <i className="feather white icon-edit"></i>
                          </button>
                          <button class="btn btn-icon btn-outline-danger mr-1 mb-1" title="Delete">
                            <i className="feather white icon-trash"></i>
                          </button>
                          <button class="btn btn-icon btn-outline-warning mr-1 mb-1" title="Copy Url">
                            <i className="feather white icon-copy"></i>
                          </button>
                        </td>
                        <td className="d-none">No</td>
                      </tr>
                      <tr>
                        <td>924</td>
                        <td><img src={banner2} style={{ width: "150px" }} /></td>
                        <td>Birthday Party</td>
                        <td>Josh</td>
                        <td>60 Kingsley Street, Byron Bay NSW, Australia</td>
                        <td>
                          <b>Virtual 360 Tour - $275.00</b> <br />
                          <b>Premium Package - $900.00</b>
                        </td>
                        <td>
                          Mcgrath Real Estate <br />
                          <b>Username: </b>Mcgrath Real Estate <br />
                          <b>21 Mar 2024 06:23 pm</b>
                        </td>
                        <td>
                          <Switch
                            checked={true}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </td>
                        <td>
                        <div className="badge badge-pill badge-light-primary">Notified</div>
                        </td>
                        <td>
                          <button class="btn btn-icon btn-outline-secondary mr-1 mb-1" title="Edit">
                            <i className="feather white icon-edit"></i>
                          </button>
                          <button class="btn btn-icon btn-outline-danger mr-1 mb-1" title="Delete">
                            <i className="feather white icon-trash"></i>
                          </button>
                          <button class="btn btn-icon btn-outline-warning mr-1 mb-1" title="Copy Url">
                            <i className="feather white icon-copy"></i>
                          </button>
                        </td>
                        <td className="d-none">No</td>
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
  );
};

export default Collections;