import React, { useState } from "react";
import { toast } from 'react-toastify';
import logoLight from "../assets/images/dropboxed-logo.png";
import { forgotPassword } from "../api/authApis";

const ForgotPassword = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let c = { ...user };
    if (name === "email") {
      c.email = value;
    }
    setUser(c);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.email) {
        toast.error("Email is required.");
        return;
      }

      const res = await forgotPassword({ email: user.email });
      if (res.success) {
        toast.success(res.message);
        window.location.href = `/reset?email=${encodeURIComponent(user.email)}`;
      } else {
        toast.error("Password reset request failed. Please try again later.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="" style={{ overflowY: 'auto' }}>
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
                        <a href={BASE_URL}>
                          <img src={logoLight} alt="branding logo" />
                        </a>
                      </div>
                    </div>
                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                      <span>Enter Email for get OTP.</span>
                    </h6>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                        <button type="submit" className="btn btn-outline-primary btn-block">Send OTP</button>
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
