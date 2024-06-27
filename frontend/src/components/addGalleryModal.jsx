import React, { useEffect, useState } from "react";
import Select from "react-select";
import toolIcons from "../assets/images/i.png";
import {
  Switch,
  Checkbox,
  Tooltip,
  styled,
  tooltipClasses,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { getAllServices } from "../api/serviceApis";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import moment from "moment";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const AddGalleryModal = ({
  message,
  button,
  isOpen,
  formData,
  previewImage,
  clients,
  bookingTitles,
  services,
  photographers,
  isGalleryLocked,
  isNotifyChecked,
  loading,
  handleInputChange,
  handleBannerChange,
  handleGalleryLockChange,
  handleNotifyChange,
  handleSubmit,
  onClose,
}) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    handleBannerChange(file);
  };

  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;

  const [servicesData, setServicesData] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    multiple: false,
  });

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 300,
      fontSize: theme.typography.pxToRem(14),
      border: "1px solid #dadde9",
    },
  }));

  const CustomOption = ({ data, innerRef, innerProps }) => (
    <CustomTooltip
      title={data.show_price ? `Price: $${data.package_price}` : ""}
      arrow
      placement="left"
    >
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          height: "30px",
          marginTop: "4px",
          marginBottom: "4px",
          cursor: "pointer",
        }}
        className="customOptionClass"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-eye-fill"
          style={{
            marginLeft: "0.3rem",
            marginRight: "0.3rem",
          }}
          viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
        </svg>

        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data.label}
        </span>
      </div>
    </CustomTooltip>
  );

  const getServices = async () => {
    try {
      const formData = new FormData();
      formData.append("subdomain_id", subdomainId || user.id);
      formData.append("role_id", roleId);

      let services = await getAllServices(formData);

      if (services.success) {
        setServicesData(services.data);
      }
    } catch (error) {
      console.error("Error in getServices:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div
          className={`modal fade ${isOpen ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          id="bootstrap"
          aria-labelledby="myModalLabel35"
          aria-hidden="true"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <div className="modal-dialog modal-md " role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "#DEE6EE" }}
              >
                <h3 className="card-title mb-0">{message}</h3>
                <button
                  type="button"
                  className="close"
                  id="closeModalButton"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <i className="feather icon-x" aria-hidden="true" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <fieldset className="form-group floating-label-form-group">
                    <p>Client *</p>
                    {/* <select
                      className="select2 form-control"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">----Select----</option>
                      {clients &&
                        clients.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select> */}
                    {/* use react-select */}
                    <Select
                      className="select2 w-100"
                      name="client"
                      value={clients.find(
                        (option) => option.value === formData.client
                      )}
                      options={clients
                        .map((client) => ({
                          label: client.name,
                          value: client.id,
                          image: client.profile_photo,
                        }))
                        .sort((a, b) => (a.label < b.label ? -1 : 1))}
                      onChange={(selectedOption) => {
                        handleInputChange({
                          target: {
                            name: "client",
                            value: selectedOption ? selectedOption.value : "",
                          },
                        });
                      }}
                      components={{
                        Option: ({ data, innerRef, innerProps }) => (
                          <div
                            ref={innerRef}
                            {...innerProps}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            className="customOptionClass"
                          >
                            <img
                              src={
                                data.image
                                  ? `${IMAGE_URL}/${data.image}`
                                  : "../app-assets/images/portrait/medium/dummy.png"
                              }
                              alt="Profile"
                              style={{
                                marginRight: "10px",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                margin: "4px",
                              }}
                            />
                            <span>{data.label}</span>
                          </div>
                        ),
                      }}
                      isDisabled={loading}
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <p>Booking Title *</p>
                    <select
                      id="booking_title"
                      className="select2 form-control"
                      name="booking_title"
                      value={formData.booking_title}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    >
                      <option value="">----Select----</option>
                      {bookingTitles
                        .sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((item) => (
                          <option key={item.id} value={item.booking_title}>
                            {item.booking_title},{" "}
                            {moment(item.booking_date).format("DD/MM/YYYY")}
                          </option>
                        ))}
                    </select>
                    {loading && (
                      <div
                        style={{
                          position: "absolute",
                          right: "22px",
                          transform: "translateY(-111%)",
                        }}
                      >
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <p style={{ width: "10rem" }}>Services</p>
                    <Select
                      className="select2 w-100"
                      name="services"
                      value={services}
                      options={servicesData
                        .map((pkg) => ({
                          label: pkg.package_name,
                          value: pkg.id,
                          package_price: pkg.package_price,
                          show_price: pkg.show_price,
                        }))
                        .sort((a, b) => (a.label < b.label ? -1 : 1))}
                      onChange={(selectedOptions) => {
                        handleInputChange({
                          target: {
                            name: "services",
                            value: selectedOptions,
                          },
                        });
                      }}
                      components={{
                        Option: CustomOption,
                      }}
                      isMulti
                      // isDisabled
                      hideSelectedOptions
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <p style={{ width: "10rem" }}>Photographers</p>
                    <Select
                      className="select2 w-100"
                      name="photographers"
                      value={photographers}
                      onChange={handleInputChange}
                      options={
                        photographers &&
                        photographers
                          .map((photographer) => ({
                            label: photographer.label,
                            value: photographer.value,
                          }))
                          .sort((a, b) => (a.label < b.label ? -1 : 1))
                      }
                      isMulti
                      isDisabled
                      hideSelectedOptions
                      components={{
                        Option: ({ data, innerRef, innerProps }) => (
                          <div
                            ref={innerRef}
                            {...innerProps}
                            style={{
                              display: "flex form-select ",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={toolIcons}
                              className="mr-1 ml-1"
                              width={"14px"}
                              height={"14px"}
                              alt=""
                            />
                            <span>{data.label}</span>
                          </div>
                        ),
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <p>Gallery Title</p>
                    <input
                      type="text"
                      className="form-control"
                      name="gallery_title"
                      value={formData.gallery_title}
                      onChange={handleInputChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <p>Folder Link *</p>
                    <input
                      className="form-control"
                      placeholder="Enter Folder Link"
                      name="dropbox_link"
                      value={formData.dropbox_link}
                      onChange={handleInputChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <p>Video Link</p>
                    <input
                      className="form-control"
                      placeholder="Enter Video Link"
                      name="vimeo_video_link"
                      value={formData.vimeo_video_link}
                      onChange={handleInputChange}
                    />
                  </fieldset>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group w-100">
                        <p>Banner</p>
                        <div
                          {...getRootProps()}
                          className={`dropzone p-2 ${
                            previewImage ? "has-image" : ""
                          }`}
                          style={{ border: "1px solid gray" }}
                        >
                          <input
                            {...getInputProps()}
                            style={{ display: "none" }}
                          />
                          {previewImage ? (
                            <img
                              src={previewImage}
                              className="height-100 width-auto"
                              alt="banner"
                            />
                          ) : (
                            <p className="text-center">
                              Drag & drop an image here, or click to select one
                              <br />
                              <i
                                className="feather icon-download"
                                style={{ fontSize: "40px" }}
                              ></i>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Switch
                        name="lock_gallery"
                        checked={isGalleryLocked}
                        onChange={handleGalleryLockChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      Lock Gallery
                      <Checkbox
                        name="notify_client"
                        checked={isNotifyChecked}
                        onChange={handleNotifyChange}
                        color="primary"
                      />
                      Notify to Client
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {loading ? (
                    <div
                      className="spinner-border text-primary mr-2"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="submit"
                      className="btn btn-primary btn"
                      value={button}
                    />
                  )}

                  <input
                    type="reset"
                    className="btn btn-secondary btn"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}
                    value="Close"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryModal;
