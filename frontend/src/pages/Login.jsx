import React from "react";
import logoLight from "../assets/images/dropboxed-logo.png";

const Login = () => {
  return (
    <div>
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <section className="row flexbox-container">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                <div className="card border-grey border-lighten-3 m-0">
                  <div className="card-header border-0">
                    <div className="card-title text-center">
                      <div className="p-1 logo black-logo">
                        <img src={logoLight} alt="branding logo" />
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                      <span>Login with Dropboxed</span>
                    </h6>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form
                        className="form-horizontal form-simple"
                        action="index.html"
                        novalidate
                      >
                        <fieldset className="form-group position-relative has-icon-left mb-0">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="user-name"
                            placeholder="Your Username"
                            required
                          />
                          <div className="form-control-position">
                            <i className="feather icon-user"></i>
                          </div>
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            id="user-password"
                            placeholder="Enter Password"
                            required
                          />
                          <div className="form-control-position">
                            <i className="fa fa-key"></i>
                          </div>
                        </fieldset>
                        <div className="form-group row">
                          <div className="col-sm-6 col-12 text-center text-sm-left">
                            <fieldset>
                              <input
                                type="checkbox"
                                id="remember-me"
                                className="chk-remember"
                              />
                              <label for="remember-me"> Remember Me</label>
                            </fieldset>
                          </div>
                          <div className="col-sm-6 col-12 text-center text-sm-right">
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
                          className="btn btn-primary btn-lg btn-block"
                        >
                          <i className="feather icon-unlock"></i> Login
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="">
                      <p className="float-sm-left text-center m-0">
                        <a href="recover-password.html" className="card-link">
                          Recover password
                        </a>
                      </p>
                      <p className="float-sm-right text-center m-0">
                        New to Dropboxed?{" "}
                        <a href="register-simple.html" className="card-link">
                          Sign Up
                        </a>
                      </p>
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
