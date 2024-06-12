import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import logoLight from "../assets/images/dropboxed-logo.png";
import { signup } from "../api/authApis";
import TermsOfServiceModal from "../components/TermsOfServiceModal";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";

const SignUp = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [showTermsOfServiceModal, setShowTermsOfServiceModal] = useState(false);
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [userData, setUserData] = useState({
    studioName: "",
    email: "",
    password: "",
    country: "USA",
    agreedToTerms: false,
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const [validationErrors, setValidationErrors] = useState({});
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  const validationSchema = Yup.object().shape({
    studioName: Yup.string()
      .required("Studio Name is required")
      .max(63, "Studio Name must be at most 63 characters")
      .matches(/^[a-zA-Z0-9\s-]+$/, "Invalid Studio Name format"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least 6 characters and contain at least one special character (!@#$%^&*)"
      ),
    country: Yup.string().required("Country is required"),
    agreedToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
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
      await validationSchema.validate(userData, { abortEarly: false });
      const subdomainValue = userData.studioName
        .toLowerCase()
        .replace(/\s/g, "");

      // Create a new object with studioName replaced
      const updatedUserData = { ...userData, studioName: subdomainValue };
      const response = await signup(updatedUserData);
      if (response.success) {
        toast.success(response.message);
        // Redirect to subdomain
        window.location.href = `http://${subdomainValue}.${window.location.host}/login`;
      } else {
        toast.error(response.message);
      }
      //window.location.href = `http://${window.location.host}/login`;
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setValidationErrors(validationErrors);
      } else {
        console.error("Signup failed:", error.message);
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className="bg-full-screen-image">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <section className=" flexbox-container">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0 mt-1 mb-1">
                <div className="card border-grey border-lighten-3 m-0">
                  <div className="card-header border-0">
                    <div className="card-title text-center">
                      <div className="p-1 logo black-logo">
                        <a href={BASE_URL}>
                          <img src={logoLight} alt="branding logo" />
                        </a>
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                      <span>Sign Up with Studiio.au</span>
                    </h6>
                  </div>

                  <div className="card-content">
                    <div className="card-body">
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            id="user-name"
                            name="studioName"
                            value={userData.studioName}
                            onChange={handleChange}
                            placeholder="Studio Name"
                          />
                          <div className="form-control-position">
                            <i className="feather icon-user" />
                          </div>
                          <small className="text-danger text-center">
                            {validationErrors.studioName}
                          </small>
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
                          />
                          <div className="form-control-position">
                            <i className="feather icon-mail" />
                          </div>
                          <small className="text-danger">
                            {validationErrors.email}
                          </small>
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            className="form-control"
                            id="user-password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                          />
                          <div className="form-control-position">
                            <i className="fa fa-lock" />
                          </div>
                          <small className="text-danger">
                            {validationErrors.password}
                          </small>
                          <div
                            className="form-control-position"
                            style={{
                              right: "10px",
                              top: "0px",
                              position: "absolute",
                              cursor: "pointer",
                            }}
                            onClick={togglePasswordVisibility}
                          >
                            <i
                              className={`fa ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                                }`}
                            />
                          </div>
                        </fieldset>
                        <fieldset className="form-group position-relative">
                          <select
                            name="country"
                            className="select2 form-control"
                            value={userData.country}
                            onChange={handleChange}
                          >
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Japan">Japan</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Singapore">Singapore</option>
                          </select>
                          <div className="form-control-position">
                            <i className="fa fa-chevron-down"></i>
                          </div>
                          <small className="text-danger">
                            {validationErrors.country}
                          </small>
                        </fieldset>
                        <fieldset className="form-group position-relative">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
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
                              I agree to the
                              <a
                                onClick={() => {
                                  setShowTermsOfServiceModal(true);
                                }}
                                style={{
                                  color: "#009c9f",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  transition: "color 0.3s, text-shadow 0.3s", // Smooth transition for hover effects
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.color = "#006f72";
                                  e.target.style.textShadow =
                                    "2px 2px 4px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.color = "#009c9f";
                                  e.target.style.textShadow = "none";
                                }}
                              >
                                {" "}
                                Terms of Service{" "}
                              </a>
                              and
                              <a
                                onClick={() => {
                                  setShowPrivacyPolicyModal(true);
                                }}
                                style={{
                                  color: "#009c9f",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  transition: "color 0.3s, text-shadow 0.3s", // Smooth transition for hover effects
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.color = "#006f72";
                                  e.target.style.textShadow =
                                    "2px 2px 4px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.color = "#009c9f";
                                  e.target.style.textShadow = "none";
                                }}
                              >
                                {" "}
                                Privacy Policy{" "}
                              </a>
                              for this site.
                            </label>
                          </div>
                          <small className="text-danger">
                            {validationErrors.agreedToTerms}
                          </small>
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
      <TermsOfServiceModal
        isOpen={showTermsOfServiceModal}
        onClose={() => setShowTermsOfServiceModal(false)}
      />
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicyModal}
        onClose={() => setShowPrivacyPolicyModal(false)}
      />
    </div>
  );
};

export default SignUp;
