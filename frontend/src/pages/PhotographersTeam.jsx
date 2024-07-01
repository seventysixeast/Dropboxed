import React, { useEffect, useState } from "react";
import {
  getAllPhotographers,
  createPhotographer,
  getPhotographer,
  deletePhotographer,
} from "../api/photographerApis";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import TableCustom from "../components/Table";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../api/authApis";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const PhotographersTeam = () => {
  const { authData } = useAuth();
  const { user, token: accesstoken } = authData;
  const subdomainId = user.subdomain_id;
  const [photographers, setPhotographers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageTypeIdToDelete, setImageTypeIdToDelete] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    business_name: "",
    profile_photo: "",
    status: "Active",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAllPhotographersData();
  }, []);

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

  const getAllPhotographersData = async () => {
    setItemsLoading(true);
    try {
      let allPhotographers = await getAllPhotographers({
        subdomainId: user.id,
      });
      if (allPhotographers && allPhotographers.data) {
        setPhotographers(allPhotographers.data);
      } else {
        setPhotographers("");
      }
    } catch (error) {
      console.error("Failed to:", error.message);
    }
    setItemsLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let photographer = { ...formData };
    if (name === "name") {
      photographer.name = value;
    } else if (name === "email") {
      photographer.email = value;
    } else if (name === "phone") {
      photographer.phone = value;
    } else if (name === "business_name") {
      photographer.business_name = value;
    } else if (name === "status") {
      photographer.status = value;
    }
    setFormData(photographer);
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
      profile_photo: "",
      status: "Active",
    });
    setPreviewImage(null);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = null;
    }
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
      formDataToSend.append("status", formData.status);
      formDataToSend.append("role_id", 2);
      let res = await createPhotographer(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        resetFormData();
        document.getElementById("closeModal").click();
        getAllPhotographersData();
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getPhotographerData = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      let photographerData = await getPhotographer(formDataToSend);
      if (photographerData.data.profile_photo !== "") {
        let path = `${IMAGE_URL}/${photographerData.data.profile_photo}`;
        setPreviewImage(path);
      } else {
        setPreviewImage(null);
      }
      setFormData(photographerData.data);
    } catch (error) {
      console.error("Failed to get photographer:", error.message);
    }
  };

  const deletePhotographerData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", imageTypeIdToDelete);
      let res = await deletePhotographer(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllPhotographersData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Profile Photo",
        accessor: "profile_photo",
        Cell: ({ row }) => (
          <span>
            <img
              src={
                row.original.profile_photo &&
                row.original.profile_photo !== "null"
                  ? `${IMAGE_URL}/${row.original.profile_photo}`
                  : "../../../app-assets/images/portrait/medium/dummy.png"
              }
              className="rounded-circle width-50 height-50"
              alt="Photographer image"
            />
          </span>
        ),
      },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Business Name", accessor: "business_name" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => <span>{row.original.status || "Active"}</span>,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <button
              className="btn btn-icon btn-outline-secondary mr-1 my-1"
              style={{ padding: "0.5rem" }}
              title="Edit"
              onClick={() => getPhotographerData(row.original.id)}
              data-toggle="modal"
              data-target="#bootstrap"
            >
              <i className="feather white icon-edit"></i>
            </button>
            <button
              className="btn btn-icon btn-outline-danger mr-1 my-1"
              style={{ padding: "0.5rem" }}
              title="Delete"
              onClick={() => {
                setShowDeleteModal(true);
                setImageTypeIdToDelete(row.original.id);
              }}
            >
              <i className="feather white icon-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => photographers, [photographers]);

  return (
    <>
      <div className="app-content content">
        <div className={`content-overlay`}></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-6">
              <h3 className="content-header-title mb-0">Photographers Team</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Photographers Team
                    </li>
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
                      className="btn btn-outline-primary"
                      data-toggle="modal"
                      data-target="#bootstrap"
                    >
                      Add New Photographer
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
                            <h3 className="card-title">Add Photographer</h3>
                            <button
                              type="button"
                              className="close outline-none"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={() => resetFormData()}
                            >
                              <i
                                className="feather icon-x"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                              <fieldset className="form-group floating-label-form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                  autoComplete="name"
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                  autoComplete="email"
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label htmlFor="phone">Phone *</label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  maxLength="10"
                                  required
                                  autoComplete="tel"
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label htmlFor="business_name">
                                  Business Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="business_name"
                                  name="business_name"
                                  value={formData.business_name}
                                  onChange={handleInputChange}
                                  autoComplete="organization"
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                  className="select2 form-control"
                                  id="status"
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label htmlFor="profile_photo">
                                  Profile Photo
                                </label>
                                <input
                                  type="file"
                                  className="form-control-file"
                                  id="profile_photo"
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
                              </fieldset>
                            </div>
                            <div className="modal-footer">
                              <input
                                id="closeModal"
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
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deletePhotographerData}
        message="Are you sure you want to delete this photographer?"
      />
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
      <>
        {data.length > 0 ? (
          <TableCustom data={data} columns={columns} />
        ) : (
          <div
            className="app-content content content-wrapper d-flex justify-content-center overflow-hidden"
            style={{
              marginTop: "15rem",
              marginLeft: "15px",
              marginRight: "15px",
            }}
            role="status"
          >
            {itemsLoading ? (
              <div
                className="spinner-border primary overflow-hidden"
                role="status"
              >
                <span className="sr-only"></span>
              </div>
            ) : (
              <p>
                No Team Members added yet. Click Add New button to add a
                member.
              </p>
            )}
          </div>
        )}
      </>
    </>
  );
};

export default PhotographersTeam;
