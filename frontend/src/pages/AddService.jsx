import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import { getAllImageTypes } from "../api/imageTypeApis";

const AddService = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const [imageTypes, setImageTypes] = useState([]);
  const [cloneIndex, setCloneIndex] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    imageTypeDetails: [
      { type: { label: "", price: "", value: "" }, label: "", count: "" },
    ],
    status: "INACTIVE",
    totalPrice: 0,
  });

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

  const getAllImageTypesData = async () => {
    try {
      let allImageTypesData = await getAllImageTypes();
      setImageTypes(allImageTypesData.data);
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  useEffect(() => {
    getAllImageTypesData();
  }, []);

  const handleTabSelect = (index) => {
    setTabIndex(index);
  };

  const handleNext = () => {
    setTabIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setTabIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = () => {
    console.log("Service Data:", serviceData);
    toast.success("Service added successfully!");
  };

  const handleImageTypeChange = (index, selectedOption) => {
    console.log(selectedOption);
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

  return (
    <>
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
            <section id="number-tabs">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <Tabs
                          selectedIndex={tabIndex}
                          onSelect={handleTabSelect}
                          style={{ minHeight: "20rem" }}
                        >
                          <TabList
                            style={{
                              backgroundColor: "#DEE6EE",
                              border: "1px transparent",
                              borderRadius: "0.5rem 0.5rem 0 0 ",
                            }}
                          >
                            <Tab
                              style={{
                                borderRadius: "0.5rem 0.5rem 0 0 ",
                              }}
                            >
                              Basic
                            </Tab>
                            <Tab>Details</Tab>
                            <Tab>Status</Tab>
                          </TabList>
                          <form onSubmit={handleSubmit}>
                            <TabPanel>
                              <div className="col-6 my-3 d-flex">
                                <label
                                  htmlFor="serviceName"
                                  className="form-label align-self-center"
                                  style={{ width: "10rem" }}
                                >
                                  Service Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="serviceName"
                                  name="serviceName"
                                  value={serviceData.serviceName}
                                  onChange={(e) =>
                                    setServiceData({
                                      ...serviceData,
                                      serviceName: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </TabPanel>
                            <TabPanel>
                              {Array.from({ length: cloneIndex }).map(
                                (_, index) => (
                                  <div key={index}>
                                    <div className="col-12 my-3 d-flex">
                                      <label
                                        htmlFor={`imageType${index}`}
                                        className="form-label align-self-center"
                                        style={{ width: "10rem" }}
                                      >
                                        Image Type Details
                                      </label>
                                      <div
                                        className="w-25 mr-1"
                                        style={{ height: "3rem" }}
                                      >
                                        <Select
                                          className="select2"
                                          style
                                          name={`imageType${index}`}
                                          id={`imageType${index}`}
                                          value={
                                            serviceData.imageTypeDetails[index]
                                              .type
                                          }
                                          onChange={(selectedOption) =>
                                            handleImageTypeChange(
                                              index,
                                              selectedOption
                                            )
                                          }
                                          options={imageTypes
                                            .sort((a, b) =>
                                              a.type.localeCompare(b.type)
                                            )
                                            .map((imageType) => ({
                                              value: imageType.id,
                                              label: imageType.type,
                                              price: imageType.price,
                                            }))}
                                          isSearchable
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        className="form-control w-25 mr-1"
                                        id={`imageTypeLabel${index}`}
                                        name={`imageTypeLabel${index}`}
                                        value={
                                          serviceData.imageTypeDetails[index]
                                            .label
                                        }
                                        placeholder="Enter Image Count"
                                        onChange={(e) =>
                                          handleImageTypeLabelChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                      <input
                                        type="number"
                                        className="form-control w-25"
                                        id={`imageCount${index}`}
                                        name={`imageCount${index}`}
                                        value={
                                          serviceData.imageTypeDetails[index]
                                            .count
                                        }
                                        placeholder="Enter Image Type Label"
                                        onChange={(e) =>
                                          handleImageCountChange(
                                            index,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                              <div className="my-3 ml-3">
                                <button
                                  className="badge-primary border-primary"
                                  type="button"
                                  onClick={handleAddInstance}
                                >
                                  +
                                </button>
                              </div>
                            </TabPanel>

                            <TabPanel>
                              <div className="col-6 my-3 d-flex">
                                <label
                                  htmlFor="status"
                                  className="form-label align-self-center"
                                  style={{ width: "10rem" }}
                                >
                                  Status
                                </label>
                                <Select
                                  className="select2"
                                  name="status"
                                  value={statusOptions.find(
                                    (option) =>
                                      option.value === serviceData.status
                                  )}
                                  onChange={handleStatusChange}
                                  options={statusOptions}
                                  isSearchable
                                />
                              </div>
                            </TabPanel>
                          </form>
                        </Tabs>
                        <div className="buttons d-flex">
                          {tabIndex > 0 && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary mr-1"
                              onClick={handlePrevious}
                            >
                              Previous
                            </button>
                          )}
                          {tabIndex < 2 && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary mr-1"
                              onClick={handleNext}
                            >
                              Next
                            </button>
                          )}
                          {tabIndex === 2 && (
                            <button
                              type="submit"
                              onClick={handleSubmit}
                              className="btn btn-outline-primary"
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};

export default AddService;
