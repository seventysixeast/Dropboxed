import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Invoice = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-6 mb-2">
            <h3 className="content-header-title mb-0">Invoice List</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Invoices</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
            <a href="#" className="btn btn-outline-primary">Create Invoice</a>
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
                        <th>Date</th>
                        <th>Order #</th>
                        <th>Client</th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Invoice Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2024-03-20</td>
                        <td>12345</td>
                        <td>John Doe</td>
                        <td>johndoe123</td>
                        <td>123 Main St, Cityville</td>
                        <td>$150</td>
                        <td>Shipped</td>
                        <td>
                          <a href="#">View Invoice</a>
                        </td>

                      </tr>
                      <tr>
                        <td>2024-03-21</td>
                        <td>67890</td>
                        <td>Jane Smith</td>
                        <td>janesmith456</td>
                        <td>456 Elm St, Townsville</td>
                        <td>$200</td>
                        <td>Processing</td>
                        <td>
                          <a href="#">View Invoice</a>
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

export default Invoice;
