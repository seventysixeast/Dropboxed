import React, { useState } from "react";
import logoLight from "../assets/images/dropboxed-logo.png";
import signup from "../api/authApis";

const SignUp = () => {
  const [userData, setUserData] = useState({
    studioName: "",
    email: "",
    password: "",
    country: "USA",
    agreedToTerms: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(userData);
      // Optionally, you can redirect the user to another page after successful signup
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error("Signup failed:", error.message);
      // Handle signup failure, e.g., show error message to the user
    }
  };

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
                    <div className="card-body">
                      <form
                        className="form-horizontal"
                        onSubmit={handleSubmit}
                      >
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            id="user-name"
                            name="studioName"
                            value={userData.studioName}
                            onChange={handleChange}
                            placeholder="Studio Name"
                            required
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
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
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
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
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
                            value={userData.country}
                            onChange={handleChange}
                            required
                            aria-placeholder="Country"
                          >
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Japan">Japan</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Singapore">Singapore</option>
                          </select>
                        </fieldset>
                        <fieldset className="form-group position-relative">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              defaultChecked
                              name="agreedToTerms"
                              id="customCheck2"
                              onChange={(e) =>
                                setUserData((prevData) => ({
                                  ...prevData,
                                  agreedToTerms: e.target.checked,
                                }))
                              }
                            />
                            <label
                              className="custom-control-label"
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
