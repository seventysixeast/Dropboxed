import React from "react";
import banner1 from "../assets/images/Web-08428_1711059614.jpg";
import banner2 from "../assets/images/DSC09293_1711016396.jpg";

const Collections = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-12 mb-2">
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
        </div>
        <div className="users-list-table">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table id="collection-list-datatable" className="table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Banner</th>
                        <th>Address</th>
                        <th>Packages With Images</th>
                        <th>Photographer</th>
                        <th>Assign Client	</th>
                        <th>Action</th>
                        <th className="d-none">verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>925</td>
                        <td><img src={banner1} style={{ width: "150px" }} /></td>
                        <td>6 Tara Downs, Lennox Head NSW, Australia</td>
                        <td>
                          <b>Essential Package - $485.00</b><br />
                          (20) High resolution images <br />
                          (5) Aerials <br />
                          (1) Floor plan and site plan <br />
                          <button className="btn btn-danger white">Create Invoice</button>
                        </td>
                        <td>Josh Griffiths </td>
                        <td>
                          Lois Bucket Real Estate <br />
                          <b>Username: </b>dylan@loisbuckett.com.au <br />
                          <b>22 Mar 2024 06:21 am</b>
                        </td>
                        <td>
                          <button class="btn btn-secondary white" style={{ width: "82px", padding: "5px", fontSize: "12px" }}>Edit</button>
                          <br />
                          <button class="btn btn-danger white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>Delete</button>
                          <br />
                          <button class="btn btn-warning white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>Copy Url</button>
                          <br />
                          <button class="btn btn-success white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>Notify Client</button>
                          <br />
                          <button class="btn btn-primary white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>View Gallery</button>
                        </td>
                        <td className="d-none">No</td>
                      </tr>
                      <tr>
                        <td>924</td>
                        <td><img src={banner2} style={{ width: "150px" }} /></td>
                        <td>60 Kingsley Street, Byron Bay NSW, Australia</td>
                        <td>
                          <b>Virtual 360 Tour - $275.00</b><br />
                          (1) Virtual Tour Locations <br />
                          <b>Premium Package - $900.00</b> <br />
                          (20) High resolution images <br />
                          (1) Standard Floor and Site Plan <br />
                          (8) High Resolution Aerial Photos <br />
                          (1) Property Video <br />
                          <button className="btn btn-danger white">Create Invoice</button>
                        </td>
                        <td>Peter Hogan </td>
                        <td>
                          Mcgrath Real Estate <br />
                          <b>Username: </b>Mcgrath Real Estate <br />
                          <b>21 Mar 2024 06:23 pm</b>
                        </td>
                        <td>
                          <button class="btn btn-secondary white" style={{ width: "82px", padding: "5px", fontSize: "12px" }}>Edit</button>
                          <br />
                          <button class="btn btn-danger white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>Delete</button>
                          <br />
                          <button class="btn btn-warning white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>Copy Url</button>
                          <br />
                          <button class="btn btn-success white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>Notify Client</button>
                          <br />
                          <button class="btn btn-primary white" style={{ width: "82px", padding: "5px", fontSize: "12px", marginTop: "3px" }}>View Gallery</button>
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