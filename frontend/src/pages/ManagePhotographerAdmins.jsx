import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import TableCustom from "../components/Table";
import {
  getAllPhotographerAdmins,
  updatePhotographerAdmin,
  getPhotographerAdmin,
  deletePhotographerAdmin,
  updateStatusPhotographerAdmin
} from "../api/photographerAdminApis";

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const ManagePhotographerAdmins = () => {
  const [photographerAdmins, setPhotographerAdmins] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageTypeIdToDelete, setImageTypeIdToDelete] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    business_name: "",
    profile_photo: "",
    status: "Active"
  });
  const [loading, setLoading] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    getAllPhotographerAdminsData();
  }, []);

  const getAllPhotographerAdminsData = async () => {
    setLoading(true);
    try {
      const res = await getAllPhotographerAdmins();
      setPhotographerAdmins(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch photographer admins:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          profile_photo: file
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile_photo: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      const res = await updatePhotographerAdmin(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        document.getElementById('closeModal').click();
        getAllPhotographerAdminsData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to update photographer admin:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPhotographerAdminData = async (id) => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      const res = await getPhotographerAdmin(formDataToSend);
      const data = res.data;
      setPreviewImage(data.profile_photo ? `${IMAGE_URL}/${data.profile_photo}` : null);
      setFormData(data);
    } catch (error) {
      console.error("Failed to get photographer admin data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePhotographerAdminData = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", imageTypeIdToDelete);
      const res = await deletePhotographerAdmin(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllPhotographerAdminsData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete photographer admin:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      formDataToSend.append("status", newStatus);
      const res = await updateStatusPhotographerAdmin(formDataToSend);
      if (res.success) {
        toast.success("Status updated successfully");
        getAllPhotographerAdminsData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to update status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => [
    {
      Header: "Profile Photo",
      accessor: "profile_photo",
      Cell: ({ row }) => (
        <span>
          <img
            src={
              row.original.profile_photo
                ? `${IMAGE_URL}/${row.original.profile_photo}`
                : "../../../app-assets/images/portrait/medium/dummy.png"
            }
            className="rounded-circle width-50 height-50"
            alt="profile"
          />
        </span>
      )
    },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Business Name", accessor: "business_name" },
    { Header: "Subdomain", accessor: "subdomain" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <select
          value={row.original.status}
          onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
          className={`form-control select2 ${row.original.status === "Deleted" ? "text-danger" : ""}`}
        >
          <option value="Active" className={row.original.status === "Deleted" ? "text-secondary" : ""}>Active</option>
          <option value="Inactive" className={row.original.status === "Deleted" ? "text-secondary" : ""}>Inactive</option>
          <option value="Deleted" style={{ color: "red" }}>Deleted</option>
        </select>
      )
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="btnsrow">
          <button
            className="btn btn-icon btn-outline-secondary mr-1 mb-1"
            title="Edit"
            onClick={() => getPhotographerAdminData(row.original.id)}
            data-toggle="modal"
            data-target="#bootstrap"
          >
            <i className="feather white icon-edit"></i>
          </button>
          <button
            className="btn btn-icon btn-outline-danger mr-1 mb-1"
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
  ], []);

  const sortedData = useMemo(() => {
    let filteredData = photographerAdmins;
    if (showDeleted) {
      filteredData = filteredData.filter(admin => admin.status === 'Deleted');
    } else {
      filteredData = filteredData.filter(admin => admin.status !== 'Deleted');
    }
    return filteredData.sort((a, b) => {
      if (a.status === "Deleted" && b.status !== "Deleted") return 1;
      if (a.status !== "Deleted" && b.status === "Deleted") return -1;
      return 0;
    });
  }, [photographerAdmins, showDeleted]);

  return (
    <>
      <div className="app-content content">
        <div className={`content-overlay ${loading ? "loading-overlay" : ""}`}></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-6 mb-2">
              <h3 className="content-header-title mb-0">Manage Photographer Admins</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Manage Photographer Admins</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
              <ul className="list-inline mb-0">
                <button
                  className={`btn ${!showDeleted ? "btn-danger" : "btn-primary"} mb-2`}
                  onClick={() => setShowDeleted(!showDeleted)}
                >
                  {showDeleted ? "Show All Accounts" : "Show Deleted Accounts"}
                </button>
                <li>
                  <div className="form-group">
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
                            <h3 className="card-title">Update Photographer</h3>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                              <fieldset className="form-group floating-label-form-group">
                                <label>Name *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Phone *</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  required
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Business Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="business_name"
                                  value={formData.business_name}
                                  onChange={handleInputChange}
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Status</label>
                                <select
                                  className="select2 form-control"
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
                              </fieldset>
                            </div>
                            <div className="modal-footer">
                              <input
                                id="closeModal"
                                type="reset"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                value="Close"
                              />
                              <input
                                type="submit"
                                className="btn btn-primary btn"
                                value="Update"
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
        onConfirm={deletePhotographerAdminData}
        message="Are you sure you want to delete this photographer admin?"
      />
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
      <TableCustom data={sortedData} columns={columns} />
    </>
  );
};

export default ManagePhotographerAdmins;