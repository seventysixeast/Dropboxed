import React, { useState } from "react";

const AddService = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const calculateProgress = () => {
    const totalSteps = 3;
    const progress = ((step - 1) / (totalSteps - 1)) * 100;

    let marker = 1;
    if (progress >= 50) marker = 2;
    if (progress >= 100) marker = 3;

    return { progress, marker };
  };

  return (
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
                  <div className="card-header">
                    <h4 className="card-title">Add Service</h4>
                    <a className="heading-elements-toggle">
                      <i className="fa fa-ellipsis-h font-medium-3" />
                    </a>
                  </div>
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <div className="d-block">
                        <div className="progress mb-3 ">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${calculateProgress().progress}%`,
                            }}
                            aria-valuenow={calculateProgress().progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                          </div>
                          <p className="">{calculateProgress().marker}</p>

                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        {step === 1 && (
                          <div>
                            <h3>Step 1: Personal Information</h3>
                            <div className="mb-3">
                              <label htmlFor="firstName" className="form-label">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="lastName" className="form-label">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={nextStep}
                            >
                              Next
                            </button>
                          </div>
                        )}

                        {step === 2 && (
                          <div>
                            <h3>Step 2: Contact Information</h3>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-secondary me-3"
                              onClick={prevStep}
                            >
                              Previous
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={nextStep}
                            >
                              Next
                            </button>
                          </div>
                        )}

                        {step === 3 && (
                          <div>
                            <h3>Step 3: Additional Information</h3>
                            {/* Add additional fields here */}
                            <button
                              type="button"
                              className="btn btn-secondary me-3"
                              onClick={prevStep}
                            >
                              Previous
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddService;
