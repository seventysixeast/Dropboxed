import React, { useState,useEffect } from "react";
import { toast } from 'react-toastify';
import logoLight from "../assets/images/dropboxed-logo.png";
import { resetPassword } from "../api/authApis";

const ResetPassword = () => {
  const [user, setUser] = useState({
    email: "",
    otp: "",
    password: "",
    confirm_password: "",
    matched: "",
  });

  useEffect(() => {
    let c = { ...user };
    const email = new URLSearchParams(window.location.search).get("email");
    if (email) {
      c.email = email;
    } else {
      toast.error("Invalid address");
    }
    setUser(c)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    let c = { ...user };
    if (name == "otp") {
      c.otp = value;
    } else if (name == "confirm_password") {
      c.confirm_password = value;
      if (c.confirm_password != c.password) {
        c.matched = "no"
      } else {
        c.matched = ""
      }
    } else if (name == "password") {
      c.password = value;
    }
    setUser(c);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await resetPassword({ user });
      if (res.success) {
        toast.success(res.message);
        window.location.href = `/login`;
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-full-screen-image" style={{ height: "120vh" }}>
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
                      <span>Enter OTP with new password</span>
                    </h6>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            name="otp"
                            placeholder="OTP"
                            value={user.otp}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                        <fieldset className="form-group position-relative has-icon-left">
                          <input
                            type="text"
                            className="form-control"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={user.confirm_password}
                            onChange={handleChange}
                            required
                          />
                        </fieldset>
                        <span style={{ color: "red", fontSize: "12px" }} hidden={user.matched == "no" ? false : true}>
                          The password confirmation does not match
                        </span>
                        <button type="submit" className="btn btn-outline-primary btn-block">Submit</button>
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

export default ResetPassword;
