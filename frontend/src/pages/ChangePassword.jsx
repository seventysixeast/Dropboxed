import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { changePassword } from "../api/userApis";
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const userId = user.id
  const [changePasswordData, setChangePasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  })

  const handlePasswordChanges = (e) => {
    let c = { ...changePasswordData };
    let { name, value } = e.target;
    if (name === 'old_password') {
      c.old_password = value
    } else if (name === 'new_password') {
      c.new_password = value
    } else if (name === 'confirm_password') {
      c.confirm_password = value
    }
    setChangePasswordData(c);
  }

  const resetChangePasswordFormData = () => {
    const c = { ...changePasswordData }
    c.old_password = '';
    c.new_password = '';
    c.confirm_password = '';
    setChangePasswordData(c);
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', userId);
      formDataToSend.append('old_password', changePasswordData.old_password);
      formDataToSend.append('new_password', changePasswordData.new_password);
      formDataToSend.append('confirm_password', changePasswordData.confirm_password);
      let res = await changePassword(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        resetChangePasswordFormData();
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="app-content content">
      <div className="content-overlay" />
      <div className="content-wrapper">
        <div className="content-header-left col-md-6 col-6 mb-2 mt-2">
          <h3 className="content-header-title mb-0">Change Password</h3>
          <div className="row breadcrumbs-top">
            <div className="breadcrumb-wrapper col-12">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">Change Password</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="content-body">
          <section className="users-edit">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="col-md-12 form-group">
                          <label>Old Password</label>
                          <input
                            type="text"
                            className="form-control"
                            name="old_password"
                            value={changePasswordData.old_password}
                            onChange={handlePasswordChanges}
                            required
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label>New Password</label>
                          <input
                            type="text"
                            className="form-control"
                            name="new_password"
                            value={changePasswordData.new_password}
                            onChange={handlePasswordChanges}
                            required
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label>Confirm Password</label>
                          <input
                            type="text"
                            className="form-control"
                            name="confirm_password"
                            value={changePasswordData.confirm_password}
                            onChange={handlePasswordChanges}
                            required
                          />
                        </div>
                        <div className="col-md-12 form-group d-flex align-items-end justify-content-end">
                        <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Change</button>
                      </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
