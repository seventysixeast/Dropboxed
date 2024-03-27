import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ImageTypes = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-12 mb-2">
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
          <div className="content-header-right col-md-6 col-12 d-flex justify-content-end align-items-center mb-2">
            <a href="/add-image-type" className="btn btn-info">Add New</a>
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
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Floor Plan</td>
                        <td>$185.00</td>
                        <td>Active</td>
                        <td>Image</td>
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