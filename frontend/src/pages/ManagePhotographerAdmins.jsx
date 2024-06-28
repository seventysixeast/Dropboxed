import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import TableCustom from "../components/Table";
import { Link } from "react-router-dom";
import {
  getAllPhotographerAdmins,
  updatePhotographerAdmin,
  getPhotographerAdmin,
  deletePhotographerAdmin,
  updateStatusPhotographerAdmin,
  unsubGoogleCalendar,
  unsubDropbox,
  unsubQuickbooks,
} from "../api/photographerAdminApis";
import ConfirmModal from "../components/ConfirmModal";
import ReTooltip from "../components/Tooltip";

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const ManagePhotographerAdmins = () => {
  const [photographerAdmins, setPhotographerAdmins] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnsubModal, setShowUnsubModal] = useState(false);
  const [imageTypeIdToDelete, setImageTypeIdToDelete] = useState(null);
  const [unsubTypeId, setUnsubTypeId] = useState(null);
  const [unsubType, setUnsubType] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    business_name: "",
    profile_photo: "",
    status: "Active",
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
      [name]: value,
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
          profile_photo: file,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        profile_photo: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const res = await updatePhotographerAdmin(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        document.getElementById("closeModal").click();
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
      setPreviewImage(
        data.profile_photo ? `${IMAGE_URL}/${data.profile_photo}` : null
      );
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

  const handleUnsubGoogle = async (id) => {
    setUnsubTypeId(id);
    setUnsubType("Google Calendar");
    setShowUnsubModal(true);
  };

  const handleUnsubDropbox = async (id) => {
    setUnsubTypeId(id);
    setUnsubType("Dropbox");
    setShowUnsubModal(true);
  };

  const handleUnsubQuickbooks = async (id) => {
    setUnsubTypeId(id);
    setUnsubType("Quickbooks");
    setShowUnsubModal(true);
    console.log(id);
  };

  const confirmUnsub = async () => {
    console.log("Here", unsubTypeId);
    setLoading(true);
    try {
      const dataToSend = {
        id: unsubTypeId,
      };
      let res;
      if (unsubType === "Google Calendar") {
        res = await unsubGoogleCalendar(dataToSend);
      } else if (unsubType === "Dropbox") {
        res = await unsubDropbox(dataToSend);
      } else if (unsubType === "Quickbooks") {
        res = await unsubQuickbooks(dataToSend);
      }

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
      setShowUnsubModal(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Profile Photo",
        accessor: "profile_photo",
        Cell: ({ row }) => (
          <span>
            <Link
              to={`/user-profile/${row.original.id}`}
              className="text-white"
            >
              <img
                src={
                  row.original.profile_photo
                    ? `${IMAGE_URL}/${row.original.profile_photo}`
                    : "../../../app-assets/images/portrait/medium/dummy.png"
                }
                className="rounded-circle width-50 height-50"
                alt="profile"
              />
            </Link>
          </span>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <Link to={`/user-profile/${row.original.id}`} className="text-white">
            {row.original.name}
          </Link>
        ),
      },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Business Name", accessor: "business_name" },
      { Header: "Subdomain", accessor: "subdomain" },
      {
        Header: "Unsubscribe",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <ReTooltip title="Unsubscribe from Google Calendar" placement="top">
              <button
                className="btn btn-icon btn-outline-secondary mr-1 mb-1"
                onClick={() => handleUnsubGoogle(row.original.id)}
              >
                <i className="feather white icon-calendar"></i>
              </button>
            </ReTooltip>
            <ReTooltip title="Unsubscribe from Dropbox" placement="top">
              <button
                className="btn btn-icon btn-outline-secondary mr-1 mb-1"
                onClick={() => handleUnsubDropbox(row.original.id)}
              >
                <i className="feather white icon-box"></i>
              </button>
            </ReTooltip>
            <ReTooltip title="Unsubscribe from Quickbooks" placement="top">
              <button
                className="btn btn-icon btn-outline-secondary mr-1 mb-1"
                onClick={() => handleUnsubQuickbooks(row.original.id)}
              >
                <i className="feather white icon-book-open"></i>
              </button>
            </ReTooltip>
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <select
            value={row.original.status}
            onChange={(e) =>
              handleStatusChange(row.original.id, e.target.value)
            }
            className={`form-control select2 ${
              row.original.status === "Deleted" ? "text-danger" : ""
            }`}
          >
            <option
              value="Active"
              className={
                row.original.status === "Deleted" ? "text-secondary" : ""
              }
            >
              Active
            </option>
            <option
              value="Inactive"
              className={
                row.original.status === "Deleted" ? "text-secondary" : ""
              }
            >
              Inactive
            </option>
            <option value="Deleted" style={{ color: "red" }}>
              Deleted
            </option>
          </select>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <ReTooltip title="Edit" placement="top">
              <button
                type="button"
                className="btn btn-icon btn-outline-primary mr-1 mb-1"
                data-toggle="modal"
                data-target="#default"
                onClick={() => getPhotographerAdminData(row.original.id)}
              >
                <i className="feather icon-edit-2"></i>
              </button>
            </ReTooltip>
            <ReTooltip title="Delete" placement="top">
              <button
                type="button"
                className="btn btn-icon btn-outline-danger mr-1 mb-1"
                onClick={() => {
                  setImageTypeIdToDelete(row.original.id);
                  setShowDeleteModal(true);
                }}
              >
                <i className="feather icon-trash-2"></i>
              </button>
            </ReTooltip>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Manage Photographer Admins</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <Link to="/dashboard">Home</Link> */}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <TableCustom columns={columns} data={photographerAdmins} />

      <div
        className="modal fade"
        id="default"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel1">
                Edit Photographer Admin
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="closeModal"
              >
                <span aria-hidden="true">&times;</span>
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
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Profile Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    name="profile_photo"
                    onChange={handlePhotoChange}
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-thumbnail mt-2"
                      width="100"
                    />
                  )}
                </div>
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deletePhotographerAdminData}
        message="Are you sure you want to delete this photographer admin?"
      />

      <ConfirmModal
        isOpen={showUnsubModal}
        onClose={() => setShowUnsubModal(false)}
        onConfirm={confirmUnsub}
        message={`Are you sure you want to unsubscribe this user from ${unsubType}?`}
      />
    </>
  );
};

export default ManagePhotographerAdmins;
