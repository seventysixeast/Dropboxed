import React from "react";

const Order = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-12 mb-2">
            <h3 className="content-header-title mb-0">Orders List</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Orders</li>
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
                  <table id="users-list-datatable" className="table">
                    <thead>
                      <tr>
                        <th>O.No.</th>
                        <th>Client</th>
                        <th>Collection</th>
                        <th>Package</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                        <th>Action</th>
                        <th className="d-none">verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>961</td>
                        <td>Pottsville Properties <br />
                          <b>Username:</b>Pottsville Properties</td>
                        <td>79-83 Tweed Coast Rd</td>
                        <td>Studio Photography- <br />
                          <b>$195.00</b></td>
                        <td>$195</td>
                        <td>18-03-2024</td>
                        <td>
                          <button class="delete-order-btn">Delete Order</button>
                        </td>
                        <td className="d-none">No</td>
                      </tr>
                      <tr>
                        <td>960</td>
                        <td>Harcourts Northern Rivers <br />
                          <b>Username:</b>HarcourtsNR</td>
                        <td>20A Hartigan St</td>
                        <td>Studio Photography- <br />
                          <b>$195.00</b></td>
                        <td>$195</td>
                        <td>18-03-2024</td>
                        <td>
                          <button class="delete-order-btn">Delete Order</button>
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

export default Order;