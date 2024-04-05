import React, { useEffect, useState } from "react";
import { getAllImageTypes, createImageType, getImageType, deleteImageType } from "../api/imageTypeApis";
import { toast } from 'react-toastify';
import DeleteModal from "../components/DeleteModal";

const ImageTypes = () => {
  const [imagesTypes, setImageTypes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageTypeIdToDelete, setImageTypeIdToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    type: '',
    price: '',
    status: 'Active',
    gallery_status: 'Image'
  });

  useEffect(() => {
    getAllImageTypesData();
  }, [])

  const getAllImageTypesData = async () => {
    try {
      let allImageTypesData = await getAllImageTypes();
      setImageTypes(allImageTypesData.data);
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
    } else if (name === 'status') {
      imageType.status = value
    } else if (name === 'gallery_status') {
      imageType.gallery_status = value
    }
    setFormData(imageType);
  };

  const resetFormData = async () => {
    setFormData({
      id: '',
      type: '',
      price: '',
      status: '',
      gallery_status: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('gallery_status', formData.gallery_status);

      let res = await createImageType(formDataToSend);
      toast.success(res.message);
      resetFormData();
      document.getElementById('closeModal').click();
      getAllImageTypesData();
    } catch (error) {
      toast.error(error);
    }
  };

  const getImageTypeData = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', id);
      let imageTypeData = await getImageType(formDataToSend);
      setFormData(imageTypeData.data);
    } catch (error) {
      console.error("Failed to get ImageTypes:", error.message);
    }
  }

  const deleteImageTypeData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', imageTypeIdToDelete);
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

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div className="content-header row">
          <div className="content-header-left col-md-6 col-6 mb-2">
            <h3 className="content-header-title mb-0">Image Types</h3>
            <div className="row breadcrumbs-top">
              <div className="breadcrumb-wrapper col-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item">Image Types</li>
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
                                type="text"
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
        <div className="users-list-table">
          <div className="card">
            <div className="card-content">
              <div className="card-body">
                <div className="table-responsive">
                  <table class="table table-inverse table-striped mb-0 black">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Gallery Status</th>
                        <th>Action</th>

                        <th className="d-none">Amount</th>
                        <th className="d-none">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {imagesTypes && imagesTypes.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.type}</td>
                          <td>{item.price}</td>
                          <td>{item.status}</td>
                          <td>{item.gallery_status}</td>
                          <td className="d-flex justify-content-between">
                            <div className="btnsrow">
                              <button
                                class="btn btn-sm btn-outline-secondary mr-1 mb-1"
                                title="Edit"
                                onClick={() => getImageTypeData(item.id)}
                                data-toggle="modal"
                                data-target="#bootstrap"
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-outline-danger mr-1 mb-1"
                                title="Delete"
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setImageTypeIdToDelete(item.id);
                                }}
                              >
                                <i className="fa fa-remove"></i>
                              </button>
                            </div>
                          </td>

                          <td className="d-none">$150</td>
                          <td className="d-none">Shipped</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
    </div>
  );
};

export default ImageTypes;