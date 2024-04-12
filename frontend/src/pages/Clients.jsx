import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAllClients, createClient, getClient, deleteClient } from "../api/clientApis";
import { toast } from 'react-toastify';
import DeleteModal from "../components/DeleteModal";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
const Clients = () => {

  const [clients, setClients] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientIdToDelete, setClientIdToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    business_name: '',
    profile_photo: ''
  });

  useEffect(() => {
    getAllClientsData();
  }, [])

  const getAllClientsData = async () => {
    try {
      let allClients = await getAllClients();
      setClients(allClients.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let client = { ...formData };
    if (name === "name") {
      client.name = value;
    } else if (name === "email") {
      client.email = value;
    } else if (name === 'phone') {
      client.phone = value
    } else if (name === 'business_name') {
      client.business_name = value
    }
    setFormData(client);
  };

  const handlePhotoChange = (e) => {
    setFormData({
      ...formData,
      profile_photo: e.target.files[0]
    });
  };

  const resetFormData = async () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      phone: '',
      business_name: '',
      profile_photo: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('business_name', formData.business_name);
      formDataToSend.append('profile_photo', formData.profile_photo);
      formDataToSend.append('role_id', 3);

      let res = await createClient(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        resetFormData();
        document.getElementById('closeModal').click();
        getAllClientsData();
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getClientData = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', id);
      let clientData = await getClient(formDataToSend);
      setFormData(clientData.data);
    } catch (error) {
      toast.error(error);
    }
  }

  const deleteClientData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', clientIdToDelete);
      let res = await deleteClient(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllClientsData();
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row mt-2">
          <div className="content-header-left col-md-6 col-6 mb-2">
            <h3 className="content-header-title mb-0">Clients</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Clients</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
            <ul className="list-inline mb-0">
              <li>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-block"
                    data-toggle="modal"
                    data-target="#bootstrap"
                  >
                    Add Client
                  </button>
                  <div
                    className="modal fade text-left"
                    id="bootstrap"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel35"
                    aria-hidden="true"
                    style={{ display: "none" }}
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3 className="card-title">{formData.id ? "Update" : "Add"} Client</h3>
                          <button
                            id="closeModal"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => resetFormData()}
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="modal-body">
                            <div className="form-group">
                              <label>Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Phone</label>
                              <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Business Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="business_name"
                                value={formData.business_name}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Profile Photo</label>
                              <input
                                type="file"
                                className="form-control-file"
                                name="profile_photo"
                                onChange={handlePhotoChange}
                                accept="image/*"
                              />
                              {formData.id && <img src={`${formData.profile_photo ? `${IMAGE_URL}/${formData.profile_photo}` : '../../../app-assets/images/portrait/medium/avatar-m-4.png'}`} className="rounded-circle height-150 mt-2" alt="Card image" />}
                            </div>
                          </div>
                          <div className="modal-footer">
                            <input
                              type="reset"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                              value="Close"
                              onClick={() => resetFormData()}
                            />
                            <input
                              type="submit"
                              className="btn btn-primary btn"
                              value={formData.id ? "Update" : "Add"}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          {clients &&
            clients.map((item) => (
              <div className="col-xl-3 col-md-6 col-12" key={item.id}>
                <div className="card d-flex flex-column">
                  <div className="text-center">
                    <div className="card-body">
                      <img
                        src={
                          item.profile_photo
                            ? `${IMAGE_URL}/${item.profile_photo}`
                            : "../../../app-assets/images/portrait/medium/avatar-m-4.png"
                        }
                        className="rounded-circle height-150"
                        alt="Card image"
                      />
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{item.name}</h4>
                      <h6 className="card-subtitle text-muted mb-2">
                        {item.business_name}
                      </h6>
                      <h6 className="card-subtitle text-muted">
                        Created On : {moment(item.created).format("DD-MM-YYYY")}
                      </h6>
                    </div>
                  </div>
                  <div className="text-center mt-auto">
                    <a
                      href={`mailto:${item.email}`}
                      className="btn btn-social-icon mr-1 mb-1"
                      title={item.email}
                    >
                      <span className="icon-envelope"></span>
                    </a>
                    <a
                      href={`tel:${item.phone}`}
                      className="btn btn-social-icon mr-1 mb-1"
                      title={item.phone}
                    >
                      <span className="icon-call-out"></span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-social-icon mr-1 mb-1"
                      title="View Collection"
                    >
                      <span className="icon-grid"></span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-social-icon mr-1 mb-1"
                      title="Edit"
                      onClick={() => getClientData(item.id)}
                      data-toggle="modal"
                      data-target="#bootstrap"
                    >
                      <span className="icon-note"></span>
                    </a>
                    <a
                      className="btn btn-social-icon mb-1"
                      title="Delete"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setClientIdToDelete(item.id);
                      }}
                    >
                      <span className="icon-trash"></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteClientData}
        message="Are you sure you want to delete this client?"
      />
    </div>
  );
};

export default Clients;