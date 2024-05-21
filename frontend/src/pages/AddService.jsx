import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import { getAllImageTypes } from "../api/imageTypeApis";
import { createService, getService } from "../api/serviceApis";
import { Tooltip, styled } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../components/Loader";

const AddService = () => {
  const { id } = useParams();
  const { authData } = useAuth();
  const { user } = authData;
  const subdomainId = user.subdomain_id;
  const [loading, setLoading] = useState(false);
  const [imageTypes, setImageTypes] = useState([]);
  const [cloneIndex, setCloneIndex] = useState(1);
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    imageTypeDetails: [{ type: "", label: "", count: "" }],
    status: "INACTIVE",
    totalPrice: 0,
    subdomainId: user.subdomain_id,
  });

  useEffect(() => {
    if (id != undefined) {
      getServiceById();
    }
  }, [id]);

  useEffect(() =>{
    if (id === undefined) {
      getAllImageTypesData();
    }
  }, [id])

  const getAllImageTypesData = async () => {
    try {
      let formData = new FormData();
      formData.append("subdomain_id", subdomainId);
      let allImageTypesData = await getAllImageTypes(formData);
      if (allImageTypesData.success) {
        setImageTypes(allImageTypesData.data);
      }
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const handleAddInstance = () => {
    setCloneIndex(cloneIndex + 1);
    setServiceData({
      ...serviceData,
      imageTypeDetails: [
        ...serviceData.imageTypeDetails,
        { type: "", label: "", count: "" },
      ],
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const isVideoArray = serviceData.imageTypeDetails.map((imageTypeDetail) => {
      return imageTypeDetail.type.isVideo;
    });

    let isVideo = false;
    if (isVideoArray.includes("Video Link")) {
      isVideo = true;
    }

    const imageTypeDetails = serviceData.imageTypeDetails.map(
      (imageTypeDetail) => {
        return {
          image_type: `${imageTypeDetail.type.value}`,
          image_type_label: `${imageTypeDetail.label}`,
          image_type_count: `${imageTypeDetail.count}`,
        };
      }
    );

    let package_slug = serviceData.serviceName.replace(/ /g, "-");

    formData.append("package_type", "SERVICE");
    formData.append("package_name", serviceData.serviceName);
    formData.append("package_slug", package_slug);
    formData.append("package_price", serviceData.totalPrice);
    formData.append("image_type_details", JSON.stringify(imageTypeDetails));
    formData.append("is_video", isVideo);
    formData.append("subdomain_id", subdomainId);
    formData.append("status", serviceData.status);
    formData.append("package_order", "0");
    if (id != undefined) {
      formData.append("id", id);
    }

    try {
      const response = await createService(formData);
      if ((response.status = 200)) {
        toast.success("Service added successfully!");
        setServiceData({
          serviceName: "",
          imageTypeDetails: [{ type: "", label: "", count: "" }],
          status: "INACTIVE",
          totalPrice: 0,
          subdomainId: user.subdomain_id,
        });
        setCloneIndex(1);
        window.location.href = "/services";
      } else {
        toast.error("Failed to add service!");
      }
    } catch (error) {
      console.error("Failed to:", error.message);
      toast.error("Failed to add service!");
    }
  };

  const getServiceById = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("subdomain_id", subdomainId);
    try {
      let service = await getService(formData);
      const data = service.data;

      data.image_type_details = JSON.parse(data.image_type_details);
      let typedata = await getAllImageTypes(formData);
      const updatedImageTypeDetails = data.image_type_details.map((detail) => {
        const imageType = typedata.data.find(
          (type) => type.id === parseInt(detail.image_type)
        );
        return {
          type: {
            value: detail.image_type,
            label: imageType ? imageType.type : "",
            price: imageType ? imageType.price : 0,
            isVideo: imageType ? imageType.gallery_status : false,
          },
          label: detail.image_type_label,
          count: detail.image_type_count,
        };
      });
      if (data.status == "Active") {
        data.status = "ACTIVE";
      } else {
        data.status = "INACTIVE";
      }

      setServiceData({
        serviceName: data.package_name,
        imageTypeDetails: updatedImageTypeDetails,
        status: data.status,
        totalPrice: data.package_price,
        subdomainId: data.subdomain_id,
      });
      setCloneIndex(updatedImageTypeDetails.length);
    } catch (error) {
      toast.error("Failed to get service!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageTypeChange = (index, selectedOption) => {
    const updatedImageTypeDetails = [...serviceData.imageTypeDetails];
    updatedImageTypeDetails[index].type = selectedOption;
    setServiceData({
      ...serviceData,
      imageTypeDetails: updatedImageTypeDetails,
    });
    let sum = 0;
    updatedImageTypeDetails.forEach(({ type }) => {
      sum += type.price;
    });
    setServiceData({
      ...serviceData,
      totalPrice: sum,
    });
  };

  const handleImageTypeLabelChange = (index, newValue) => {
    const updatedImageTypeDetails = [...serviceData.imageTypeDetails];
    updatedImageTypeDetails[index].label = newValue;
    setServiceData({
      ...serviceData,
      imageTypeDetails: updatedImageTypeDetails,
    });
  };

  const handleImageCountChange = (index, newValue) => {
    const updatedImageTypeDetails = [...serviceData.imageTypeDetails];
    updatedImageTypeDetails[index].count = newValue;
    setServiceData({
      ...serviceData,
      imageTypeDetails: updatedImageTypeDetails,
    });
  };

  const statusOptions = [
    { value: "INACTIVE", label: "Inactive" },
    { value: "ACTIVE", label: "Active" },
  ];

  const handleStatusChange = (selectedOption) => {
    setServiceData({
      ...serviceData,
      status: selectedOption.value,
    });
  };

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
    <CustomTooltip title={`Price: $${data.price}`} arrow placement="left">
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

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Add Service</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Add Service</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="col-md-12 my-1">
                            <div className="row">
                              <label
                                htmlFor="serviceName"
                                className="form-label col-md-2 col-sm-12"
                              >
                                Service Name
                              </label>
                              <input
                                type="text"
                                className="form-control col-md-3 col-sm-6 mr-1 mb-1"
                                id="serviceName"
                                name="serviceName"
                                value={serviceData.serviceName}
                                placeholder="Enter Service Name"
                                onChange={(e) =>
                                  setServiceData({
                                    ...serviceData,
                                    serviceName: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <p className="form-label col-md-12 col-sm-12 mr-1 mb-1">
                          Image Type Details
                        </p>
                        {Array.from({ length: cloneIndex }).map((_, index) => (
                          <div key={index}>
                            <div className="col-md-12 my-3 ">
                              <div className="row">
                                <div className="col-md-2"></div>
                                <Select
                                  className="select2 col-md-3 col-sm-6 mr-1 mb-1  p-0"
                                  styles={{ padding: "none !important" }}
                                  name={`imageType${index}`}
                                  id={`imageType${index}`}
                                  value={
                                    serviceData.imageTypeDetails[index].type
                                  }
                                  onChange={(selectedOption) =>
                                    handleImageTypeChange(index, selectedOption)
                                  }
                                  options={imageTypes
                                    .sort((a, b) =>
                                      a.type.localeCompare(b.type)
                                    )
                                    .map((imageType) => ({
                                      value: imageType.id,
                                      label: imageType.type,
                                      price: imageType.price,
                                      isVideo: imageType.gallery_status,
                                    }))}
                                  isSearchable
                                  components={{
                                    Option: CustomOption,
                                  }}
                                />
                                <input
                                  type="text"
                                  className="form-control col-md-3 col-sm-6 mr-1 mb-1"
                                  id={`imageTypeLabel${index}`}
                                  name={`imageTypeLabel${index}`}
                                  value={
                                    serviceData.imageTypeDetails[index].label
                                  }
                                  placeholder="Enter Type Label"
                                  onChange={(e) =>
                                    handleImageTypeLabelChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                />

                                <input
                                  type="number"
                                  className="form-control col-md-3 col-sm-6 mr-1 mb-1"
                                  id={`imageCount${index}`}
                                  name={`imageCount${index}`}
                                  value={
                                    serviceData.imageTypeDetails[index].count
                                  }
                                  placeholder="Enter Count"
                                  onChange={(e) =>
                                    handleImageCountChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="col-md-12 my-3 ">
                          <div className="row">
                            <div className="col-md-2 col-sm-3"></div>
                            <div className="col-md-2 col-sm-3">
                              <button
                                className="badge-primary border-primary"
                                type="button"
                                onClick={handleAddInstance}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 my-3 ">
                          <div className="row">
                            <label
                              htmlFor="status"
                              className="form-label col-md-2 col-sm-6"
                            >
                              Status
                            </label>
                            <Select
                              className="select2 col-md-3 col-sm-6 mr-1 mb-1  p-0"
                              name="status"
                              value={statusOptions.find(
                                (option) => option.value === serviceData.status
                              )}
                              onChange={handleStatusChange}
                              options={statusOptions}
                              isSearchable
                            />
                            <label
                              htmlFor="totalPrice"
                              className="form-label col-md-3 col-sm-6"
                            ></label>
                            <p className="form-control col-md-3 col-sm-6 mr-1 mb-1">{`$ ${serviceData.totalPrice}`}</p>
                          </div>
                        </div>
                      </form>
                      <div className="buttons d-flex justify-content-end mr-4">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="btn btn-outline-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};

export default AddService;
