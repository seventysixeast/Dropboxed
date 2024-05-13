import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getUser, updateUser, changePassword } from "../api/userApis";
import { toast } from 'react-toastify';
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const EditProfile = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const userId = user.id
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    name: '',
    email: '',
    status: '',
    business_name: '',
    profile_photo: null
  });
  const [changePasswordData, setChangePasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  })

  useEffect(() => {
    getUserData();
  }, [])

  const getUserData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', userId);
      let userData = await getUser(formDataToSend);
      if (userData && userData.data) {
        setFormData(userData.data);
      } else {
        setFormData([]);
      }
      if (userData.data.profile_photo !== "") {
        let path = `${IMAGE_URL}/${userData.data.profile_photo}`
        setPreviewImage(path)
      } else {
        setPreviewImage(null)
      }
    } catch (error) {
      toast.error(error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let user = { ...formData };
    if (name === "username") {
      user.username = value;
    } else if (name === "name") {
      user.name = value;
    } else if (name === 'email') {
      user.email = value
    } else if (name === 'status') {
      user.status = value
    } else if (name === 'business_name') {
      user.business_name = value
    }
    setFormData(user);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          profile_photo: file
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData({
        ...formData,
        profile_photo: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', userId);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('business_name', formData.business_name);
      formDataToSend.append('profile_photo', formData.profile_photo);

      let res = await updateUser(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        const updatedUser = {
          ...user,
          userName: formData.name,
          profilePhoto: formData.profile_photo.name || user.profile_photo
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        getUserData();
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

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
        getUserData();
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
          <h3 className="content-header-title mb-0">Edit Profile</h3>
          <div className="row breadcrumbs-top">
            <div className="breadcrumb-wrapper col-12">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">Edit Profile</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="content-body">
          <section className="users-edit">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="media mb-2">
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : "../../../app-assets/images/portrait/medium/dummy.png"
                        }
                        className="rounded-circle height-100 width-100 mt-2"
                        alt="Preview"
                      />
                      <div className="media-body mt-3 ml-2">
                        <h4 className="media-heading">Profile Photo</h4>
                        <input
                          type="file"
                          className="form-control-file"
                          name="profile_photo"
                          onChange={handlePhotoChange}
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <div className="controls">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                            <div className="help-block" />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="controls">
                            <label>E-mail</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            <div className="help-block" />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <label>Status</label>
                          <select
                            className="form-control"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Business Name</label>
                          <input
                            className="form-control"
                            name="business_name"
                            value={formData.business_name}
                            onChange={handleInputChange}
                          />
                        </div>
                        {/* <div className="form-group">
                          <label>Subdomain</label>
                          <input
                            className="form-control"
                            name="subdomain"
                            value={formData.subdomain}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div> */}
                      </div>
                      <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                        <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <section className="users-edit">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="row">
                      <div className="col-md-3 form-group">
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
                      <div className="col-md-3 form-group">
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
                      <div className="col-md-3 form-group">
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
                      <div className="col-md-3 form-group d-flex align-items-end justify-content-end">
                        <button type="submit" className="btn btn-warning glow mb-1 mb-sm-0 mr-0 mr-sm-1">Change Password</button>
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

export default EditProfile;
