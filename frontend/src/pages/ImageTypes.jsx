import React, { useEffect, useState } from "react";
import {
  getAllImageTypes,
  createImageType,
  getImageType,
  deleteImageType,
} from "../api/imageTypeApis";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import TableCustom from "../components/Table";
import { useAuth } from "../context/authContext";
import { verifyToken } from "../api/authApis";

const ImageTypes = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id;
  const accesstoken = authData.token;
  const [imagesTypes, setImageTypes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageTypeIdToDelete, setImageTypeIdToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    price: "",
    status: "Active",
    gallery_status: "Image",
  });

  useEffect(() => {
    getAllImageTypesData();
  }, []);

  const getAllImageTypesData = async () => {
    try {
      const formData = new FormData();
      formData.append("subdomain_id", subdomainId);
      let allImageTypesData = await getAllImageTypes(formData);
      if (allImageTypesData && allImageTypesData.success) {
        setImageTypes(allImageTypesData.data);
      } else {
        setImageTypes([]);
      }
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let imageType = { ...formData };
    if (name === "type") {
      imageType.type = value;
    } else if (name === "price") {
      imageType.price = value;
    } else if (name === "status") {
      imageType.status = value;
    } else if (name === "gallery_status") {
      imageType.gallery_status = value;
    }
    setFormData(imageType);
  };

  const resetFormData = async () => {
    setFormData({
      id: "",
      type: "",
      price: "",
      status: "",
      gallery_status: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("gallery_status", formData.gallery_status);
      formDataToSend.append("subdomain_id", subdomainId);

      let res = await createImageType(formDataToSend);
      if(res && res.success){
        toast.success(res.message);
        resetFormData();
        document.getElementById("closeModal").click();
        getAllImageTypesData();
      }else{
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getImageTypeData = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      let imageTypeData = await getImageType(formDataToSend);
      setFormData(imageTypeData.data);
    } catch (error) {
      console.error("Failed to get ImageTypes:", error.message);
    }
  };

  const deleteImageTypeData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", imageTypeIdToDelete);
      let res = await deleteImageType(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllImageTypesData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Type", accessor: "type" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <span>{row.original.status || "Active"}</span>
        )
      },
      {
        Header: "Gallery Status",
        accessor: "gallery_status",
        Cell: ({ row }) => (
          <span>{row.original.gallery_status || "Image"}</span>
        )
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <button
              className="btn btn-icon btn-outline-secondary mr-1 mb-1"
              title="Edit"
              onClick={() => getImageTypeData(row.original.id)}
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

  const data = React.useMemo(() => imagesTypes, [imagesTypes]);

  useEffect( async () => {
    if (accesstoken !== undefined) {
      let resp = await verifyToken(accesstoken);
      if (!resp.success) {
        toast.error("Session expired, please login again.");
        window.location.href = "/login";
      }
    }
  }, [accesstoken]);

  return (
    <>
      <div className="app-content content">
        <div className={`content-overlay`}></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-6">
              <h3 className="content-header-title mb-0">Image Types</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Image Types</li>
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
                      Add New
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
                            <h3 className="card-title">Add Image Type</h3>
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
                                <label>Type *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="type"
                                  value={formData.type}
                                  onChange={handleInputChange}
                                  required
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Price *</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="price"
                                  value={formData.price}
                                  onChange={handleInputChange}
                                  required
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Status *</label>
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
                                <label>Gallery Status *</label>
                                <select
                                  className="select2 form-control"
                                  name="gallery_status"
                                  value={formData.gallery_status}
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option value="Image">Image</option>
                                  <option value="Video Link">Video Link</option>
                                </select>
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
        onConfirm={deleteImageTypeData}
        message="Are you sure you want to delete this imageType?"
      />
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
      <TableCustom data={data} columns={columns} />
    </>
  );
};

export default ImageTypes;