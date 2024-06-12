import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import moment from "moment";
import {
  getAllClients,
  createClient,
  getClient,
  deleteClient,
  activeInactiveClient,
} from "../api/clientApis";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import { useAuth } from "../context/authContext";
import { verifyToken } from "../api/authApis";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id;
  const accesstoken = authData.token;
  const [previewImage, setPreviewImage] = useState(null);
  const [filteredClients, setFilteredClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeClients, setActiveClients] = useState();
  const [inactiveClients, setInactiveClients] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientIdToDelete, setClientIdToDelete] = useState(null);
  const [checked, setChecked] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    business_name: "",
    profile_photo: "",
  });

  useEffect(() => {
    getAllClientsData();
  }, []);

  useEffect(() => {
    const filtered =
      clients &&
      clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.business_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const getAllClientsData = async () => {
    try {
      if (subdomainId === "") {
        let allClients = await getAllClients({ subdomainId: user.id });
        setClients(allClients.data);
        let activeClients = [];
        let inactiveClients = [];

        allClients.data.forEach((client) => {
          if (client.status === "Active") {
            activeClients.push(client);
          } else {
            inactiveClients.push(client);
          }
        });

        setActiveClients(activeClients);
        setInactiveClients(inactiveClients);
      } else {
        let allClients = await getAllClients({ subdomainId: subdomainId });
        setClients(allClients.data);
        let activeClients = [];
        let inactiveClients = [];

        allClients.data.forEach((client) => {
          if (client.status === "Active") {
            activeClients.push(client);
          } else {
            inactiveClients.push(client);
          }
        });

        setActiveClients(activeClients);
        setInactiveClients(inactiveClients);
      }
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
    } else if (name === "phone") {
      client.phone = value;
    } else if (name === "business_name") {
      client.business_name = value;
    }
    setFormData(client);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          profile_photo: file,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData({
        ...formData,
        profile_photo: "",
      });
    }
  };

  const resetFormData = async () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      business_name: "",
      profile_photo: null,
    });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("subdomainId", subdomainId);
      formDataToSend.append("id", formData.id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("business_name", formData.business_name);
      formDataToSend.append("profile_photo", formData.profile_photo);
      formDataToSend.append("role_id", 3);

      let res = await createClient(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        resetFormData();
        document.getElementById("closeModal").click();
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
      formDataToSend.append("id", id);
      let clientData = await getClient(formDataToSend);
      if (clientData.data.profile_photo !== "") {
        let path = `${IMAGE_URL}/${clientData.data.profile_photo}`;
        setPreviewImage(path);
      } else {
        setPreviewImage(null);
      }
      if (clientData.data.status === "Active") {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setFormData(clientData.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteClientData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", clientIdToDelete);
      formDataToSend.append("subdomainId", subdomainId);
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

  const handleStatusChange = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("subdomainId", subdomainId);
      const newStatus = checked ? "Inactive" : "Active";
      formDataToSend.append("status", newStatus);
      let res = await activeInactiveClient(formDataToSend);
      if (res.success) {
        setChecked(!checked);
        getAllClientsData();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (accesstoken !== undefined) {
        let resp = await verifyToken(accesstoken);
        if (!resp.success) {
          toast.error("Session expired, please login again.");
          window.location.href = "/login";
        }
      }
    };

    fetchData();
  }, [accesstoken]);

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row mt-2">
          <div className="content-header-left col-md-6 col-12 mb-2">
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
          <div className="content-header-right col-md-6 col-12 d-flex justify-content-end align-items-center mb-2">
            <ul className="list-inline mb-0">
              <li>
                <div className="mr-2 primary">
                  <h5>
                    {" "}
                    <a onClick={() => setFilterStatus("Active")}>
                      Active : {activeClients ? activeClients.length : 0}
                    </a>
                  </h5>
                </div>
              </li>
              <li>
                <div className="mr-2 primary">
                  <h5>
                    <a onClick={() => setFilterStatus("Inactive")}>
                      Inactive : {inactiveClients ? inactiveClients.length : 0}
                    </a>
                  </h5>
                </div>
              </li>
              <li>
                <div className="search-button mr-2 mb-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </li>
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
                          <h3 className="card-title">
                            {formData.id ? "Update" : "Add"} Client
                          </h3>
                          <button
                            id="closeModal"
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => resetFormData()}
                          >
                            <i className="feather icon-x" aria-hidden="true" />
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
                              {previewImage && (
                                <img
                                  src={previewImage}
                                  className="rounded-circle height-150 width-150 mt-2"
                                  alt="Preview"
                                />
                              )}
                            </div>
                          </div>
                          <div
                            className={
                              "text-right mr-2 mb-2" +
                              (checked ? " text-primary" : "")
                            }
                          >
                            {checked ? "Active" : "Inactive"}
                            <Switch
                              checked={checked}
                              onChange={handleStatusChange}
                              inputProps={{ "aria-label": "controlled" }}
                            />
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
          {filteredClients &&
            filteredClients
              .filter((item) => {
                if (filterStatus === "Active") {
                  return item.status === "Active";
                } else if (filterStatus === "Inactive") {
                  return item.status !== "Active";
                }
                return true;
              })
              .sort((a, b) => {
                if (a.status === "Active" && b.status !== "Active") return -1;
                if (a.status !== "Active" && b.status === "Active") return 1;
                return 0;
              })
              .map((item) => (
                <div className="col-xl-3 col-md-6 col-12" key={item.id}>
                  <div
                    className={`card d-flex flex-column ${
                      item.status === "Inactive" ? "dull-card" : ""
                    }`}
                  >
                    <div className="text-center">
                      <div className="card-body">
                        <img
                          src={
                            item.profile_photo
                              ? `${IMAGE_URL}/${item.profile_photo}`
                              : "../../../app-assets/images/portrait/medium/dummy.png"
                          }
                          className="rounded-circle width-150 height-150"
                          alt="Client image"
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{item.name}</h4>
                        <h6
                          className={`card-subtitle mb-2 ${
                            item.status === "Active" ? "text-muted" : ""
                          }`}
                        >
                          {item.business_name}
                        </h6>
                        <h6
                          className={`card-subtitle mb-2 ${
                            item.status === "Active" ? "text-muted" : ""
                          }`}
                        >
                          Created On :{" "}
                          {moment(item.created).format("DD-MM-YYYY")}
                        </h6>
                      </div>
                    </div>
                    <div className="text-center mt-auto">
                      <a
                        href={`mailto:${item.email}`}
                        className={`btn btn-social-icon mb-1 ${
                          item.status === "Inactive" ? "dull-card" : ""
                        }`}
                        title={item.email}
                      >
                        <span className="icon-envelope"></span>
                      </a>
                      <a
                        href={`tel:${item.phone}`}
                        className={`btn btn-social-icon mb-1 ${
                          item.status === "Inactive" ? "dull-card" : ""
                        }`}
                        title={item.phone}
                      >
                        <span className="icon-call-out"></span>
                      </a>
                      <a
                        href="#"
                        className={`btn btn-social-icon mb-1 ${
                          item.status === "Inactive" ? "dull-card" : ""
                        }`}
                        title="View Collection"
                      >
                        <span className="icon-grid"></span>
                      </a>
                      <a
                        href="#"
                        className={`btn btn-social-icon mb-1 ${
                          item.status === "Inactive" ? "dull-card" : ""
                        }`}
                        title="Edit"
                        onClick={() => getClientData(item.id)}
                        data-toggle="modal"
                        data-target="#bootstrap"
                      >
                        <span className="icon-note"></span>
                      </a>
                      <a
                        href="#"
                        className={`btn btn-social-icon mb-1 ${
                          item.status === "Inactive" ? "dull-card" : ""
                        }`}
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
