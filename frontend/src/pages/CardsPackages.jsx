import React from "react";

const CardsPackages = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-6 mb-2">
            <h3 className="content-header-title mb-0">Services & Prices</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Services & Prices</li>
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
                    Add Package
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
                          <h3 className="card-title">Add Package</h3>
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
                              <label>Package Type *</label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="user1">PACKAGE</option>
                                <option value="user2">SERVICE</option>
                              </select>
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label>Package Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Package Name"
                                required=""
                                data-validation-required-message="This field is required"
                              />
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label>Package Price *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Package Price"
                                required=""
                                data-validation-required-message="This field is required"
                              />
                            </fieldset>
                            <fieldset className="form-group floating-label-form-group">
                              <label>Image Type Details *</label>
                              <select
                                className="select2 form-control"
                                required
                              >
                                <option value="user1">Images</option>
                                <option value="user2">Floor Plan</option>
                              </select>
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
        <div class="row">
          <div class="col-xl-3 col-md-6 col-sm-12 ">
            <div class="card d-flex flex-column ">
              <div class="card-content flex-grow-1">
                <div class="card-body text-center package-card">
                  <h4 class="card-title">Studio Package</h4>
                  <h1 class="card-title">$385.00</h1>
                  <ul class="list-unstyled mt-2 mb-2">
                    <li>12 High resolution images</li>
                    <li>3 Aerial photos</li>
                    <li>1 Studio Floor plan</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 col-sm-12 ">
            <div class="card d-flex flex-column ">
              <div class="card-content flex-grow-1">
                <div class="card-body text-center package-card">
                  <h4 class="card-title">Premium Package</h4>
                  <h1 class="card-title">$900.00</h1>
                  <ul class="list-unstyled mt-2 mb-2">
                    <li>20 High resolution images</li>
                    <li>1 Standard Floor and Site Plan</li>
                    <li>8 High Resolution Aerial Photos</li>
                    <li>1 Property Video</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 col-sm-12 ">
            <div class="card d-flex flex-column ">
              <div class="card-content flex-grow-1">
                <div class="card-body text-center package-card">
                  <h4 class="card-title">Essential Package</h4>
                  <h1 class="card-title">$485.00</h1>
                  <ul class="list-unstyled mt-2 mb-2">
                    <li>20 High resolution images</li>
                    <li>5 Aerials</li>
                    <li>1 Floor plan and site plan</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 col-sm-12 ">
            <div class="card d-flex flex-column ">
              <div class="card-content flex-grow-1">
                <div class="card-body text-center package-card">
                  <h4 class="card-title">Builders architectural shoot</h4>
                  <h1 class="card-title">$350.00</h1>
                  <ul class="list-unstyled mt-2 mb-2">
                    <li>30 architectural images</li>
                    <li>10 Aerial Images</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 col-sm-12 ">
            <div class="card d-flex flex-column ">
              <div class="card-content flex-grow-1">
                <div class="card-body text-center package-card">
                  <h4 class="card-title">Rental Package</h4>
                  <h1 class="card-title">$350.00</h1>
                  <ul class="list-unstyled mt-2 mb-2">
                    <li>12 High resolution images</li>
                    <li>3 Aerial photos</li>
                    <li>1 60 Sec (3 CLIPS) Continuous Video</li>
                  </ul>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsPackages;
