import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Clients = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-12 mb-2">
            <h3 className="content-header-title mb-0">Clients</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Clients</li>
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
                    Add Client
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
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              required=""
                              data-validation-required-message="This name field is required"
                            />
                          </div>
                          <div className="modal-body">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email"
                              required=""
                              data-validation-required-message="This name field is required"
                            />
                          </div>
                          <div className="modal-body">
                            <label>Phone</label>
                            <input
                              type="phone"
                              className="form-control"
                              placeholder="Enter Phone"
                              required=""
                              data-validation-required-message="This name field is required"
                            />
                          </div>
                          <div className="modal-footer">
                            <input
                              type="submit"
                              className="btn btn-outline-primary btn"
                              value="Add"
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
        <div className="users-list-table">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="clients-list-datatable" className="table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>

                        <th className="d-none">Amount</th>
                        <th className="d-none">Status</th>
                        <th className="d-none">Invoice Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>John Doe</td>
                        <td>johndoe123@gmail.com</td>
                        <td>2222234321</td>
                        <td className="d-flex justify-content-between">
                          <div className="row">
                            <a href="#">
                              <FaEdit title="Edit" className="fa-lg" />
                            </a>
                            <a href="#">
                              <MdDelete title="Delete" className="fa-lg" />
                            </a>
                          </div>
                        </td>

                        <td className="d-none">$150</td>
                        <td className="d-none">Shipped</td>
                        <td className="d-none">
                          <a href="invoice_link_12345">View Invoice</a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jane Smith</td>
                        <td>janesmith456@gmail.com</td>
                        <td>2343444545</td>
                        <td className="d-flex justify-content-between">
                          <div className="row">
                            <a href="#">
                              <FaEdit title="Edit" className="fa-lg" />
                            </a>
                            <a href="#">
                              <MdDelete title="Delete" className="fa-lg" />
                            </a>
                          </div>
                        </td>

                        <td className="d-none">$200</td>
                        <td className="d-none">Processing</td>
                        <td className="d-none">
                          <a href="invoice_link_67890">View Invoice</a>
                        </td>
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

export default Clients;
