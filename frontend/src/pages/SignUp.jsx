import React from "react";
import logoLight from "../assets/images/dropboxed-logo.png";

const SignUp = () => {
  return (
    <div>
      <div className="content-overlay"></div>
      <div
        className="content-wrapper bg-full-screen-image"
        style={{ height: "100vh" }}
      >
        <div className="content-header row"></div>
        <div className="content-body">
          <section className="row flexbox-container">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0 mt-4">
                <div className="card border-grey border-lighten-3 m-0">
                  <div className="card-header border-0">
                    <div className="card-title text-center">
                      <div className="p-1 logo black-logo">
                        <img src={logoLight} alt="branding logo" />
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                      <span>Sign Up with Dropboxed</span>
                    </h6>
                  </div>

                  <div className="card-content">
                    {/* <div className="text-center">
                      <a
                        href="#"
                        className="btn btn-social-icon mr-1 mb-1 btn-outline-facebook"
                      >
                        <span className="fa fa-facebook" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-social-icon mr-1 mb-1 btn-outline-twitter"
                      >
                        <span className="fa fa-twitter" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-social-icon mr-1 mb-1 btn-outline-linkedin"
                      >
                        <span className="fa fa-linkedin font-medium-4" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-social-icon mr-1 mb-1 btn-outline-github"
                      >
                        <span className="fa fa-github font-medium-4" />
                      </a>
                    </div>
                    <p className="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
                      <span>OR Using Email</span>
                    </p> */}
                    <div className="card-body">
                      <form
                        className="form-horizontal"
                        action="index.html"
                        noValidate=""
                      >
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            id="user-name"
                            placeholder="Studio Name"
                          />
                          <div className="form-control-position">
                            <i className="feather icon-user" />
                          </div>
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="email"
                            className="form-control"
                            id="user-email"
                            placeholder="Your Email Address"
                            required=""
                          />
                          <div className="form-control-position">
                            <i className="feather icon-mail" />
                          </div>
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="password"
                            className="form-control"
                            id="user-password"
                            placeholder="Enter Password"
                            required=""
                          />
                          <div className="form-control-position">
                            <i className="fa fa-key" />
                          </div>
                        </fieldset>
                        <fieldset className="form-group position-relative">
                          <select
                            name="country"
                            className="select2 form-control"
                            required
                            aria-placeholder="Country"
                          >
                            <option value="Studio">USA</option>
                            <option value="Essential">UK</option>
                            <option value="Premium">Brazil</option>
                            <option value="Studio">Japan</option>
                            <option value="Essential">Taiwan</option>
                            <option value="Premium">Singapore</option>
                          </select>
                        </fieldset>
                        <fieldset className="form-group position-relative">
                          <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              defaultChecked
                              name="customCheck"
                              id="customCheck2"
                            />
                            <label
                              class="custom-control-label"
                              htmlFor="customCheck2"
                            >
                              I agree to the Terms of Service and Privacy Policy
                              for this site.
                            </label>
                          </div>
                        </fieldset>

                        <button
                          type="submit"
                          className="btn btn-outline-primary btn-block"
                        >
                          <i className="feather icon-user" /> Register
                        </button>
                      </form>
                      <a
                        href="/login"
                        className="btn btn-outline-danger btn-block mt-2"
                      >
                        <i className="feather icon-unlock" /> Login
                      </a>
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

export default SignUp;
