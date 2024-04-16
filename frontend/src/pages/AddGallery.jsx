import React from "react";

export const AddGallery = () => {
  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
        <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Add Gallery</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Add Gallery</li>
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
                                <label htmlFor="address">Address</label>
                                <input
                                  type="text"
                                  id="address"
                                  className="form-control border-primary"
                                  placeholder="address"
                                  name="address"
                                />
                              </div>
                              <div className="form-group col-md-12 col-12 mb-2">
                                <select className="select2 form-control">
                                  <option value="Gurvinder">Gurvinder</option>
                                  <option value="Mannu">Mannu</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label htmlFor="imagefolder">Image Folder</label>
                                <input
                                  type="text"
                                  id="imagefolder"
                                  className="form-control border-primary"
                                  placeholder="Image Folder"
                                  name="imagefolder"
                                  required
                                />
                              </div>
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label htmlFor="title">Title</label>
                                <input
                                  type="text"
                                  id="title"
                                  className="form-control border-primary"
                                  placeholder="Title"
                                  name="title"
                                  required
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label htmlFor="package">Package</label>
                                <select
                                  className="select2 form-control"
                                  required
                                >
                                  <option value="Studio">Studio Package</option>
                                  <option value="Essential">
                                    Essential Package
                                  </option>
                                  <option value="Premium">
                                    Premium Package
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label htmlFor="services">Services</label>
                                <select
                                  className="select2 form-control"
                                  required
                                >
                                  <option value="Studio">
                                    Studio Photography
                                  </option>
                                  <option value="Essential">
                                    Essential Photography
                                  </option>
                                  <option value="Premium">
                                    Premium Photography
                                  </option>
                                  <option value="Studio">
                                    Studio Floor Plan
                                  </option>
                                  <option value="Essential">
                                    Essential Floor Plan
                                  </option>
                                  <option value="Premium">
                                    Premium Floor Plan
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="row">
                              <div className="form-group col-md-12 col-12 mb-2">
                                <label htmlFor="bannerInput">
                                  Banner
                                </label>
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    multiple
                                    required
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="inputGroupFile01"
                                  >
                                    Choose file
                                  </label>
                                </div>
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

export default AddGallery;