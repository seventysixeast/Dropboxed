import React from "react";

const EditProfile = () => {
  return (
    <div className="app-content content">
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          {/* users edit start */}
          <section className="users-edit">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media mb-2">
                    <a className="mr-2" href="#">
                      <img
                        src="../../../app-assets/images/portrait/small/avatar-s-26.png"
                        alt="users avatar"
                        className="users-avatar-shadow rounded-circle"
                        height={64}
                        width={64}
                      />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Avatar</h4>
                      <div className="col-12 px-0 d-flex">
                        <a href="#" className="btn btn-sm btn-primary mr-25">
                          Change
                        </a>
                        <a href="#" className="btn btn-sm btn-secondary">
                          Reset
                        </a>
                      </div>
                    </div>
                  </div>
                  <form noValidate="">
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <div className="controls">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              defaultValue="Dean Stanley"
                              required=""
                              data-validation-required-message="This name field is required"
                            />
                            <div className="help-block" />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="controls">
                            <label>E-mail</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              defaultValue="deanstanley@gmail.com"
                              required=""
                              data-validation-required-message="This email field is required"
                            />
                            <div className="help-block" />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <label>Status</label>
                          <select className="form-control">
                            <option>Active</option>
                            <option>Banned</option>
                            <option>Close</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Subdomain</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Subdomain"
                          />
                        </div>
                      </div>
                      <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                        <button
                          type="submit"
                          className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1"
                        >
                          Save changes
                        </button>
                        <button type="reset" className="btn btn-light">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* users edit ends */}
        </div>
      </div>
    </div>

  );
};

export default EditProfile;
