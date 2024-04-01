import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ImageTypes = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-6 mb-2">
            <h3 className="content-header-title mb-0">Image Types</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Image Types</li>
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
                    className="btn btn-outline-primary"
                    data-toggle="modal"
                    data-target="#bootstrap"
                  >
                    Add New
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
                          <h3 className="card-title">Add Image Type</h3>
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
                              <label>Type *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Type"
                                required=""
                                data-validation-required-message="This field is required"
                              />
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label>Price *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Image Price"
                                required=""
                                data-validation-required-message="This field is required"
                              />
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label>Status *</label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="user1">Active</option>
                                <option value="user2">Inactive</option>
                              </select>
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label>Gallery Status *</label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="user1">Image</option>
                                <option value="user2">Video Link</option>
                              </select>
                            </fieldset>
                          </div>
                          <div className="modal-footer">
                            <input
                              type="submit"
                              className="btn btn-primary btn"
                              value="Add"
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
                  <table class="table table-striped table-bordered zero-configuration">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Gallery Status</th>
                        <th>Action</th>

                        <th className="d-none">Amount</th>
                        <th className="d-none">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Images</td>
                        <td>$0.00</td>
                        <td>Active</td>
                        <td>Image</td>
                        <td className="d-flex justify-content-between">
                          <div className="btnsrow">
                            <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                              <i className="fa fa-remove"></i>
                            </button>
                          </div>
                        </td>

                        <td className="d-none">$150</td>
                        <td className="d-none">Shipped</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Floor Plan</td>
                        <td>$185.00</td>
                        <td>Active</td>
                        <td>Image</td>
                        <td className="d-flex justify-content-between">
                          <div className="btnsrow">
                            <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                              <i className="fa fa-remove"></i>
                            </button>
                          </div>
                        </td>

                        <td className="d-none">$150</td>
                        <td className="d-none">Shipped</td>
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

export default ImageTypes;