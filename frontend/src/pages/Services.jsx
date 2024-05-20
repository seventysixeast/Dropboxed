import React, { useState, useEffect } from "react";
import { deleteService, getAllServices } from "../api/serviceApis";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api/authApis";

const CardsPackages = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const accessToken = authData.token;
  const [servicesData, setServicesData] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getServices();
    verifyToken(accessToken);
  }, []);

  const getServices = async () => {
    const formData = new FormData();
    if (subdomainId !== '') {
      formData.append("subdomain_id", subdomainId);
    } else {
      formData.append("subdomain_id", user.id);
    }
    formData.append("role_id", roleId);
    const response = await getAllServices(formData);
    if (response.success) {
      const servicesWithParsedImages = response.data.map((service) => ({
        ...service,
        image_type_details: JSON.parse(service.image_type_details),
      }));
      setServicesData(servicesWithParsedImages);
    } else {
      toast.error("Failed to get services!");
    }
  };

  const handleEditService = (service) => {
    navigate(`/services/edit-service/${service.id}`);
  };

  const handleDeleteService = (service) => {
    setServiceId(service.id);
    setShowDeleteModal(true);
  };

  const deleteServiceId = async () => {
    const formData = new FormData();
    formData.append("id", serviceId);
    const response = await deleteService(formData);
    if (response.success) {
      toast.success("Service deleted successfully!");
      getServices();
    } else {
      toast.error("Failed to delete service!");
    }
    setShowDeleteModal(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setServiceId(null);
  };

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-7 mb-2">
              <h3 className="content-header-title mb-0">Services & Prices</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                    <li className="breadcrumb-item">Services & Prices</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-5 d-flex justify-content-end align-items-center mb-2">
              <ul className="list-inline mb-0">
                <li>
                  <div className="form-group">
                    {roleId !== 3 && (
                      <a
                        type="button"
                        className="btn btn-outline-primary btn-block"
                        href="/services/add-service"
                      >
                        Add Service
                      </a>
                    )}

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
                            <h3 className="card-title">Add Package</h3>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <form>
                            <div className="modal-body">
                              <fieldset className="form-group floating-label-form-group">
                                <label>Package Type *</label>
                                <select
                                  className="select2 form-control"
                                  required
                                >
                                  <option value="user1">PACKAGE</option>
                                  <option value="user2">SERVICE</option>
                                </select>
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Package Name *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Package Name"
                                  required=""
                                  data-validation-required-message="This field is required"
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Package Price *</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Package Price"
                                  required=""
                                  data-validation-required-message="This field is required"
                                />
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Image Type Details *</label>
                                <select
                                  className="select2 form-control"
                                  required
                                >
                                  <option value="user1">Images</option>
                                  <option value="user2">Floor Plan</option>
                                </select>
                              </fieldset>
                              <fieldset className="form-group floating-label-form-group">
                                <label>Status *</label>
                                <select
                                  className="select2 form-control"
                                  required
                                >
                                  <option value="user1">Active</option>
                                  <option value="user2">Inactive</option>
                                </select>
                              </fieldset>
                            </div>
                            <div className="modal-footer">
                              <input
                                type="submit"
                                className="btn btn-primary btn"
                                value="Add"
                              />
                              <input
                                type="reset"
                                className="btn btn-secondary btn"
                                data-dismiss="modal"
                                value="Close"
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
            {servicesData.length > 0 ? (
              servicesData.map((service) => (
                <div className="col-xl-3 col-md-6 col-sm-12" key={service.id}>
                  <div className="card d-flex flex-column">
                    <div className="card-content flex-grow-1">
                      <div className="card-body text-center package-card">
                        <h1 className="card-title" style={{ fontSize: '1.5rem' }}>{service.package_name}</h1>
                        <h1 className="card-title" style={{ fontSize: '1.5rem' }}>
                          ${service.package_price.toFixed(2)}
                        </h1>
                        <ul className="list-unstyled">
                          {service.image_type_details.map((imageType) => (
                            <li key={imageType.image_type}>
                              {imageType.image_type_count}{" "}
                              {imageType.image_type_label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {roleId !== 3 && (
                      <div className="card-footer d-flex justify-content-between">
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditService(service)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleDeleteService(service)}
                          >
                            Delete
                          </button>
                        </>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No services found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteModalClose}
        onConfirm={deleteServiceId}
        message="Are you sure you want to delete this appointment?"
      />
    </>
  );
};

export default CardsPackages;
