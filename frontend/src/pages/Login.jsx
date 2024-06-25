import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import logoLight from "../assets/images/dropboxed-logo.png";
import { login } from "../api/authApis";
import { encryptToken } from "../helpers/tokenUtils";
import { getSubdomainFromUrl } from "../helpers/utils";
import { Link } from "react-router-dom";
import { decryptToken } from "../helpers/tokenUtils";
import { verifyToken } from "../api/authApis";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const subdomain = getSubdomainFromUrl(window.location.href, BASE_URL);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  useEffect(() => {
    // check if user is authenticated
    const accessToken = localStorage.getItem("accessToken");
    const isAuth = localStorage.getItem("isAuth");
    const user = localStorage.getItem("user");
    if (accessToken && isAuth && user) {
      window.location.href = "/dashboard";
    }
  }, []);

  useEffect(() => {
    const getTokenFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("token");
    };

    const handleTokenVerification = async (token) => {
      try {
        setLoading(true); // Show loader
        const decryptedToken = decryptToken(token);
        const { success, accessToken, user, message } = await verifyToken(
          decryptedToken
        );

        if (success) {
          // Save user data and access token in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("isAuth", true);
          localStorage.setItem("user", JSON.stringify(user));

          // Show success toast
          // toast.success('Token verification successful');

          // Redirect to dashboard
          window.location.href = "/dashboard";
          setLoading(false);
        } else {
          // Show error toast
          toast.error(`Token verification failed: ${message}`);
          // Redirect to login page
          window.location.href = "/login";
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Token verification failed:", error.message);
        // Show error toast
        toast.error("Token verification failed");
        // Redirect to login page
        window.location.href = "/login";
      }
    };

    const token = getTokenFromUrl();

    if (token) {
      handleTokenVerification(token);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove(
      "vertical-layout",
      "vertical-menu-modern",
      "2-columns",
      "fixed-navbar"
    );
    const rememberMeCookie = Cookies.get("rememberMe");
    if (rememberMeCookie) {
      // Automatically populate username from cookie
      setUserData((prevData) => ({
        ...prevData,
        userName: rememberMeCookie,
        rememberMe: true, // Set rememberMe to true if cookie exists
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Show loader
      await validationSchema.validate(userData, { abortEarly: false });
      const loginData = subdomain ? { ...userData, subdomain } : userData;
      const { success, message, accessToken, user } = await login(loginData);
      //const { success, message, accessToken, user } = await login(userData);
      if (success) {
        if (!accessToken) {
          toast.success("Login successful");
        }
        // Set rememberMe cookie if checked
        if (userData.rememberMe) {
          Cookies.set("rememberMe", userData.userName, { expires: 30 }); // Expires in 30 days
        } else {
          // Remove rememberMe cookie if not checked
          Cookies.remove("rememberMe");
        }
      } else {
        toast.error(message);
      }

      const userSubdomain = user.subdomain.toLowerCase().replace(/\s/g, "");
      const currentSubdomain = window.location.hostname.split(".")[0];
      //const baseUrl = window.location.protocol + "//" + window.location.hostname;

      //const DOMAIN_NAME = process.env.REACT_APP_DOMAIN_NAME
      // Check if the current URL already contains a subdomain
      //const redirectToSubdomain = currentSubdomain === DOMAIN_NAME ? `${userSubdomain}.` : "";
      //console.log("redirectToSubdomain",redirectToSubdomain, "<-->",currentSubdomain); return false
      //console.log("redirectToSubdomain",redirectToSubdomain)
      if (!user.is_verified) {
        toast.success("Account verification pending");
        return;
      }
      if (user.role_id === 1) {
        setLoading(false);
        const userDataWithProfilePhoto = {
          ...user,
          profile_photo: user.profile_photo || "",
        };
        // Save user data and access token in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("user", JSON.stringify(userDataWithProfilePhoto));
        const redirectUrl = `/manage-photographer-admins`;
        window.location.href = redirectUrl;
        return;
      }
      if (subdomain) {
        setLoading(false);
        // Save user data and access token in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("user", JSON.stringify(user));
        // Set cookies with domain attribute
        /*document.cookie = `accessToken=${accessToken}; domain=.localhost; path=/`;
          document.cookie = `isAuth=true; domain=.localhost; path=/`;
          document.cookie = `user=${JSON.stringify(user)}; domain=.localhost; path=/`;*/
        const redirectUrl = `/dashboard`;
        window.location.href = redirectUrl;
      } else {
        setLoading(false);
        const encryptedToken = encryptToken(accessToken);
        // Construct the redirection URL

        const redirectUrl = `${window.location.protocol}//${userSubdomain}.${
          window.location.host
        }/login?token=${encodeURIComponent(encryptedToken)}`;
        //console.log("redirectUrl",redirectUrl)
        window.location.href = redirectUrl; // Redirecting to subdomain
      }
    } catch (error) {
      setLoading(false);
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setValidationErrors(validationErrors);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  return (
    <div className="">
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
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
                        <Link to={BASE_URL}>
                          <img src={logoLight} alt="branding logo" />
                        </Link>
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                      <span>Login with Studiio.au</span>
                    </h6>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            style={{
                              borderColor: validationErrors.userName ? "red" : ""
                            }}
                            id="user-name"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                            placeholder="Your Email"
                          />
                          <div className="form-control-position">
                            <i className="feather icon-user" style={{color: validationErrors.userName ? "red" : ""}}/>
                          </div>
                          <small className="text-danger" >
                            {validationErrors.userName}
                          </small>
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            className="form-control"
                            style={{
                              borderColor: validationErrors.password ? "red" : ""
                            }}
                            id="user-password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                          />
                          <div className="form-control-position">
                            <i className="feather icon-lock" style={{ color: validationErrors.password ? "red" : ""}} />
                          </div>
                          <div
                            className="form-control-position"
                            style={{
                              right: "10px",
                              top: "4px",
                              position: "absolute",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={togglePasswordVisibility}
                          >
                            <i
                              className={`fa ${
                                isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                          <small className="text-danger">
                            {validationErrors.password}
                          </small>
                        </fieldset>
                        <div className="form-group row">
                          <div className="col-sm-6 col-6 text-center text-sm-left pr-0">
                            <fieldset className="form-group position-relative">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  name="rememberMe"
                                  id="rememberMe"
                                  checked={userData.rememberMe}
                                  onChange={handleChange}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="rememberMe"
                                >
                                  Remember Me
                                </label>
                              </div>
                            </fieldset>
                          </div>
                          <div className="col-sm-6 col-6 float-sm-left text-center text-sm-right">
                            <Link to="/forgot" className="card-link">
                              Forgot Password?
                            </Link>
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
                      <span>New to Studiio.au ?</span>
                    </p>
                    <div className="card-body">
                      <Link
                        to={subdomain ? "/client-signup" : "/signup"}
                        className="btn btn-outline-danger btn-block"
                      >
                        <i className="feather icon-user" /> Register
                      </Link>
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
