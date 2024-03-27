import React from "react";

export const AddImageType = () => {
  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Add Image Type</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Add Image Type</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <section id="form-action-layouts">
              <div className="row match-height">
                <div className="col-md-12 col-12">
                  <div className="card ">
                    <div className="card-content collpase show">
                      <div className="card-body">
                        <form className="form col-md-6 col-12">
                          <div className="form-body">
                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label htmlFor="type">Type *</label>
                                <input
                                  type="text"
                                  id="type"
                                  className="form-control border-primary"
                                  placeholder="Enter Type"
                                  name="type"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label>Price *</label>
                                <input
                                  type="text"
                                  id="price"
                                  className="form-control border-primary"
                                  placeholder="Enter Image Type"
                                  name="price"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label>Status *</label>
                                <input
                                  type="text"
                                  id="status"
                                  className="form-control border-primary"
                                  placeholder="Enter Status"
                                  name="status"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label>Gallery Status *</label>
                                <input
                                  type="text"
                                  id="galleryStatus"
                                  className="form-control border-primary"
                                  placeholder="Enter Gallery Status"
                                  name="galleryStatus"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-actions right">
                            <button
                              type="button"
                              className="btn btn-warning mr-1"
                            >
                              <i className="feather icon-x"></i> Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                              <i className="fa fa-check-square-o"></i> Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddImageType;