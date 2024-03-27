import React from "react";

const Download = () => {
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
                  <table id="orders-list-datatable" className="table">
                    <thead>
                      <tr>
                        <th>O.No.</th>
                        <th>Collection</th>
                        <th>Package</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                        <th>Action</th>

                        <th className="d-none">last activity</th>
                        <th className="d-none">verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>300</td>
                        <td>Collection A</td>
                        <td>Package X</td>
                        <td>$100</td>
                        <td>2024-03-21</td>
                        <td>
                          <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                            <i className="feather icon-edit-1" />
                          </a>
                        </td>

                        <td className="d-none">
                          <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                            dean3004
                          </a>
                        </td>
                        <td className="d-none">No</td>
                      </tr>
                      <tr>
                        <td>301</td>
                        <td>Collection B</td>
                        <td>Package Y</td>
                        <td>$150</td>
                        <td>2024-03-20</td>
                        <td>
                          <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                            <i className="feather icon-edit-1" />
                          </a>
                        </td>

                        <td className="d-none">
                          <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                            zena0604
                          </a>
                        </td>
                        <td className="d-none">Yes</td>
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

export default Download;