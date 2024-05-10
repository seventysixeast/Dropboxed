import React, { useEffect, useState } from "react";
import { getAllPhotographerAdmins, updatePhotographerAdmin, getPhotographerAdmin, deletePhotographerAdmin } from "../api/photographerAdminApis";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import TableCustom from "../components/Table";
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

  useEffect(() => {
    getAllPhotographerAdminsData();
  }, []);

  const getAllPhotographerAdminsData = async () => {
    try {
      let res = await getAllPhotographerAdmins();
      if (res && res.data) {
        setPhotographerAdmins(res.data);
      } else {
        setPhotographerAdmins("");
      }
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let photographerAdmin = { ...formData };
    if (name === "name") {
      photographerAdmin.name = value;
    } else if (name === "phone") {
      photographerAdmin.phone = value;
    } else if (name === "business_name") {
      photographerAdmin.business_name = value;
    } else if (name === "status") {
      photographerAdmin.status = value;
    }
    setFormData(photographerAdmin);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
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
      formDataToSend.append("id", formData.id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("business_name", formData.business_name);
      formDataToSend.append('profile_photo', formData.profile_photo);
      formDataToSend.append("status", formData.status);
      let res = await updatePhotographerAdmin(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        document.getElementById('closeModal').click();
        getAllPhotographerAdminsData();
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getPhotographerAdminData = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      let res = await getPhotographerAdmin(formDataToSend);
      if (res.data.profile_photo !== "") {
        let path = `${IMAGE_URL}/${res.data.profile_photo}`
        setPreviewImage(path)
      } else {
        setPreviewImage(null)
      }
      setFormData(res.data);
    } catch (error) {
      console.error("Failed to get photographer:", error.message);
    }
  };

  const deletePhotographerAdminData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", imageTypeIdToDelete);
      let res = await deletePhotographerAdmin(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllPhotographerAdminsData();
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
          <span className={row.original.status === "Deleted" ? "text-danger" : ""}>
            {row.original.status || "Active"}
          </span>
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
    ],
    []
  );

  const sortedData = React.useMemo(() => {
    return [...photographerAdmins].sort((a, b) => {
      if (a.status === "Deleted" && b.status !== "Deleted") return 1;
      if (a.status !== "Deleted" && b.status === "Deleted") return -1;
      return 0;
    });
  }, [photographerAdmins]);

  return (
    <>
      <div className="app-content content">
        <div className={`content-overlay`}></div>
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