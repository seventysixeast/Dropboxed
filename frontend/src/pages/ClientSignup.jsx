import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { clientSignup } from "../api/authApis";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import logoLight from "../assets/images/dropboxed-logo.png";


const ClientSignup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        business_name: "",
        password: "",
        confirm_password: "",
        subdomain: ""
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const url = window.location.hostname;
        const subdomain = url.split('.')[0];
        setUserData((prevData) => ({
            ...prevData,
            subdomain: subdomain,
        }));
    }, []);

    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        business_name: Yup.string().required("Business Name is required"),
        password: Yup.string()
        .required("Password is required")
        .matches(passwordRegex, "Password must be at least 6 characters and contain at least one special character (!@#$%^&*)"),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
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
            const response = await clientSignup(userData);
            if (response && response.success) {
                toast.success('Registration successful');
                navigate("/login");
            } else {
                toast.error(response.error);
                console.error("Registration failed:", response.error);
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setValidationErrors(validationErrors);
            } else {
                console.error("Signup failed:", error.message);
            }
            //toast.error(error.message);
        }
    };

    return (
        <div className="bg-full-screen-image" style={{ height: "130vh" }}>
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
                                                        name="name"
                                                        value={userData.name}
                                                        onChange={handleChange}
                                                        placeholder="Name"
                                                    />
                                                    <small className="text-danger text-center">{validationErrors.name}</small>
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
                                                    <small className="text-danger">{validationErrors.email}</small>
                                                </fieldset>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="user-phone"
                                                        name="phone"
                                                        value={userData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Phone"
                                                    />
                                                    <small className="text-danger">{validationErrors.phone}</small>
                                                </fieldset>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="user-business-name"
                                                        name="business_name"
                                                        value={userData.business_name}
                                                        onChange={handleChange}
                                                        placeholder="Business Name"
                                                    />
                                                    <small className="text-danger">{validationErrors.business_name}</small>
                                                </fieldset>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="user-password"
                                                        name="password"
                                                        value={userData.password}
                                                        onChange={handleChange}
                                                        placeholder="Password"
                                                    />
                                                    <small className="text-danger">{validationErrors.password}</small>
                                                </fieldset>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="user-confirm-password"
                                                        name="confirm_password"
                                                        value={userData.confirm_password}
                                                        onChange={handleChange}
                                                        placeholder="Confirm Password"
                                                    />
                                                    <small className="text-danger">{validationErrors.confirm_password}</small>
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

export default ClientSignup;
