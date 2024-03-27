import React from "react";
import logoLight from "../assets/images/dropboxed-logo.png";

const Login = () => {
  return (
    <div className="bg-full-screen-image" style={{ height: "100vh" }}>
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <section className="row flexbox-container">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0 mt-4">
                <div className="card border-grey border-lighten-3 px-1 py-1 m-0 ">
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
                      <span>OR Using Account Details</span>
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
                            placeholder="Your Username"
                            required=""
                          />
                          <div className="form-control-position">
                            <i className="feather icon-user" />
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
                        <div className="form-group row">
                          <div className="col-sm-6 col-12 text-center text-sm-left pr-0">
                            <fieldset>
                              <div
                                className="icheckbox_square-blue"
                                style={{ position: "relative" }}
                              >
                                <input
                                  type="checkbox"
                                  id="remember-me"
                                  className="chk-remember"
                                  style={{ position: "absolute", opacity: 0 }}
                                />
                                <ins
                                  className="iCheck-helper"
                                  style={{
                                    position: "absolute",
                                    top: "0%",
                                    left: "0%",
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    margin: 0,
                                    padding: 0,
                                    background: "rgb(255, 255, 255)",
                                    border: 0,
                                    opacity: 0,
                                  }}
                                />
                              </div>
                              <label htmlFor="remember-me"> Remember Me</label>
                            </fieldset>
                          </div>
                          <div className="col-sm-6 col-12 float-sm-left text-center text-sm-right">
                            <a
                              href="recover-password.html"
                              className="card-link"
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-outline-primary btn-block"
                        >
                          <i className="feather icon-unlock" /> Login
                        </button>
                      </form>
                    </div>
                    <p className="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
                      <span>New to Dropboxed ?</span>
                    </p>
                    <div className="card-body">
                      <a
                        href="/signup"
                        className="btn btn-outline-danger btn-block"
                      >
                        <i className="feather icon-user" /> Register
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

export default Login;
