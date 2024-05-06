import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import logoLight from "../assets/images/dropboxed-logo.png";
import { login } from "../api/authApis";
import { encryptToken } from "../helpers/tokenUtils";
import { getSubdomainFromUrl } from "../helpers/utils";
import { Link } from "react-router-dom";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const subdomain = getSubdomainFromUrl(window.location.href, BASE_URL);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    rememberMe: false
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  useEffect(() => {
    document.body.classList.remove("vertical-layout", "vertical-menu-modern", "2-columns", "fixed-navbar");
    const rememberMeCookie = Cookies.get("rememberMe");
    if (rememberMeCookie) {
      // Automatically populate username from cookie
      setUserData(prevData => ({
        ...prevData,
        userName: rememberMeCookie,
        rememberMe: true // Set rememberMe to true if cookie exists
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
        await validationSchema.validate(userData, { abortEarly: false });
        console.log("subdomain1>>>",subdomain)
        const loginData = subdomain ? { ...userData, subdomain } : userData;
        const { success, message, accessToken, user } = await login(loginData);
        //const { success, message, accessToken, user } = await login(userData);
        if(success){
          toast.success('Login successful');
          // Set rememberMe cookie if checked
          if (userData.rememberMe) {
            Cookies.set("rememberMe", userData.userName, { expires: 30 }); // Expires in 30 days
          } else {
            // Remove rememberMe cookie if not checked
            Cookies.remove("rememberMe");
          }
        } else{
          toast.error(message);
        }
        
        const userSubdomain = user.subdomain.toLowerCase().replace(/\s/g, '');
         const currentSubdomain = window.location.hostname.split('.')[0];
        //const baseUrl = window.location.protocol + "//" + window.location.hostname;

        //const DOMAIN_NAME = process.env.REACT_APP_DOMAIN_NAME
        // Check if the current URL already contains a subdomain
        //const redirectToSubdomain = currentSubdomain === DOMAIN_NAME ? `${userSubdomain}.` : "";
        //console.log("redirectToSubdomain",redirectToSubdomain, "<-->",currentSubdomain); return false
        //console.log("redirectToSubdomain",redirectToSubdomain)
        
        if(subdomain){
           // Save user data and access token in localStorage
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('isAuth', true);
          localStorage.setItem('user', JSON.stringify(user));
          // Set cookies with domain attribute
          /*document.cookie = `accessToken=${accessToken}; domain=.localhost; path=/`;
          document.cookie = `isAuth=true; domain=.localhost; path=/`;
          document.cookie = `user=${JSON.stringify(user)}; domain=.localhost; path=/`;*/
          const redirectUrl = `/dashboard`;
          window.location.href = redirectUrl;
        } else {
          const encryptedToken = encryptToken(accessToken);
          // Construct the redirection URL
         
          const redirectUrl = `${window.location.protocol}//${userSubdomain}.${window.location.host}?token=${encodeURIComponent(encryptedToken)}`;
          //console.log("redirectUrl",redirectUrl)
          window.location.href = redirectUrl; // Redirecting to subdomain
        }
        
    } catch (error) {
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
                      <span>Login with Dropboxed</span>
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
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                            placeholder="Your Email"
                          />
                          <div className="form-control-position">
                            <i className="feather icon-user" />
                          </div>
                          <small className="text-danger">{validationErrors.userName}</small>
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
                          />
                          <div className="form-control-position">
                            <i className="fa fa-key" />
                          </div>
                          <small className="text-danger">{validationErrors.password}</small>
                        </fieldset>
                        <div className="form-group row">
                          <div className="col-sm-6 col-12 text-center text-sm-left pr-0">
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
                          <div className="col-sm-6 col-12 float-sm-left text-center text-sm-right">
                            <Link
                              to="/forgot"
                              className="card-link"
                            >
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
                      <span>New to Dropboxed ?</span>
                    </p>
                    <div className="card-body">
                      <a
                        href={subdomain ? "/client-signup" : "/signup"}
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
