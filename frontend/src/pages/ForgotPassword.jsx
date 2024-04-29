import React from "react";
import logoLight from "../assets/images/dropboxed-logo.png";

const ForgotPassword = () => {
  return (
    <div className="bg-full-screen-image" style={{ height: "110vh" }}>
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <section className="flexbox-container">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0 mt-4 mb-4">
                <div className="card border-grey border-lighten-3 px-1 py-1 m-0 ">
                  <div className="card-header border-0">
                    <div className="card-title text-center">
                      <div className="p-1 logo black-logo">
                        <img src={logoLight} alt="branding logo" />
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                      <span>Forgot Password</span>
                    </h6>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form className="form-horizontal">
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            name="new_password"
                            placeholder="New Password"
                          // value={userData.new_password}
                          // onChange={handleChange}
                          />
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            name="confirm_password"
                            placeholder="Confirm Password"
                          // value={userData.confirm_password}
                          // onChange={handleChange}
                          />
                        </fieldset>
                        <button type="submit" className="btn btn-outline-primary btn-block"><i className="feather icon-unlock" /> Forgot</button>
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
  );
};

export default ForgotPassword;
