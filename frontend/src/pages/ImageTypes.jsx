import React, { useEffect, useState, useMemo } from "react";
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
import LoadingOverlay from "../components/Loader";
import { Link } from "react-router-dom";

const ImageTypes = () => {
  const { authData } = useAuth();
  const { user, token: accesstoken } = authData;
  const subdomainId = user.subdomain_id;
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      if (accesstoken !== undefined) {
        let resp = await verifyToken(accesstoken);
        if (!resp.success) {
          toast.error("Session expired, please login again.");
          window.location.href = '/login';
        }
      }
    };

    fetchData();
  }, [accesstoken]);

  const getAllImageTypesData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("subdomain_id", subdomainId);
      const response = await getAllImageTypes(formData);
      setImageTypes(response.success ? response.data : []);
    } catch (error) {
      console.error("Failed to get all image types:", error.message);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const resetFormData = () => {
    setFormData({
      id: "",
      type: "",
      price: "",
      status: "Active",
      gallery_status: "Image",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("subdomain_id", subdomainId);
      const response = await createImageType(formDataToSend);
      if (response.success) {
        toast.success(response.message);
        resetFormData();
        document.getElementById("closeModal").click();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    getAllImageTypesData();
  };

  const getImageTypeData = async (id) => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);
      const response = await getImageType(formDataToSend);
      setFormData(response.data);
    } catch (error) {
      console.error("Failed to get Image Type:", error.message);
    }
    setLoading(false);
  };

  const deleteImageTypeData = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", imageTypeIdToDelete);
      const response = await deleteImageType(formDataToSend);
      if (response.success) {
        toast.success(response.message);
        setShowDeleteModal(false);
        getAllImageTypesData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const columns = useMemo(
    () => [
      { Header: "Type", accessor: "type" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => <span>{value || "Active"}</span>,
      },
      {
        Header: "Gallery Status",
        accessor: "gallery_status",
        Cell: ({ value }) => <span>{value || "Image"}</span>,
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <button
              className="btn btn-icon btn-outline-secondary mr-1 mb-1"
              style={{ padding: "0.5rem" }}
              title="Edit"
              onClick={() => getImageTypeData(row.original.id)}
              data-toggle="modal"
              data-target="#bootstrap"
            >
              <i className="feather white icon-edit"></i>
            </button>
            <button
              className="btn btn-icon btn-outline-danger mr-1 mb-1"
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

  const data = useMemo(() => imagesTypes, [imagesTypes]);

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-6">
              <h3 className="content-header-title mb-0">Image Types</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Image Types</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
              <ul className="list-inline mb-0">
                <li>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-toggle="modal"
                    data-target="#bootstrap"
                  >
                    Add New
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade text-left"
        id="bootstrap"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel35"
        aria-hidden="true"
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
                onClick={resetFormData}
              >
                <i className="feather icon-x" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <fieldset className="form-group floating-label-form-group">
                  <label htmlFor="type">Type *</label>
                  <input
                    id="type"
                    type="text"
                    className="form-control"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>
                <fieldset className="form-group floating-label-form-group">
                  <label htmlFor="price">Price *</label>
                  <input
                    id="price"
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>
                <fieldset className="form-group floating-label-form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
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
                  <label htmlFor="gallery_status">Gallery Status *</label>
                  <select
                    id="gallery_status"
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
                  onClick={resetFormData}
                />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={formData.id ? "Update" : "Add"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteImageTypeData}
        message="Are you sure you want to delete this image type?"
      />
      <TableCustom data={data} columns={columns} />
      <LoadingOverlay loading={loading} />
    </>
  );
};

export default ImageTypes;
