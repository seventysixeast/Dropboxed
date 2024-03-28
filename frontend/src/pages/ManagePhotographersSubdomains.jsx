import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ManagePhotographersSubdomains = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-12 mb-2">
            <h3 className="content-header-title mb-0">Manage Photographers Subdomains</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Manage Photographers Subdomains</li>
                </ol>
              </div>
            </div>
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subdomain</th>
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
                        <td>76east.dropboxed.com</td>
                        <td className="d-flex justify-content-between">
                          <div className="btnsrow">
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
                        <td>abc.dropboxed.com</td>
                        <td className="d-flex justify-content-between">
                          <div className="btnsrow">
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

export default ManagePhotographersSubdomains;
