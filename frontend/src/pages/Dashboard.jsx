import React from "react";
export const Dashboard = () => {
  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Dashboard</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Home</a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            {/* <!-- Grouped multiple cards for statistics starts here --> */}
            <div className="row grouped-multiple-statistics-card">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-primary bg-darken-2">
                                <i className="icon-picture font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-primary white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Job In Progress
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-red bg-darken-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  fill="currentColor"
                                  className="bi bi-pie-chart white"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793zm1 0V7.5h6.482A7 7 0 0 0 8.5 1.018M14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8" />
                                </svg>
                              </div>
                              <div className="p-2 bg-gradient-x-red white media-body">
                                <h5>$0</h5>
                                <p className="text-bold-400 mb-0">
                                  Gross Profit
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-danger bg-darken-2">
                                <i className="icon-cloud-upload font-large-2 white"></i>
                              </div>
                              <div className="p-1 bg-gradient-x-danger white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Completed Ordered
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-warning bg-darken-2">
                                <i className="icon-calendar font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-warning white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Active Booking
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-success bg-darken-2">
                                <i className="icon-bag font-large-2 white"></i>
                              </div>
                              <div className="p-2 bg-gradient-x-success white media-body">
                                <h5>0</h5>
                                <p className="text-bold-400 mb-0">
                                  Active Invoices
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section id="image-gallery" className="card">
            <h4 className="card-title assigned_gallery p-2 ">Gallery</h4>

              <div className="card-content collapse show">
                <div
                  className="card-body my-gallery"
                  itemScope
                  itemType="http://schema.org/ImageGallery"
                >
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="#"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/1.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/2.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/2.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/3.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/3.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/4.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/4.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/5.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/5.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/6.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/6.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/7.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/7.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/8.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/8.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/9.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/9.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/10.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/10.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/11.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/11.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/12.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/12.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                  </div>
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/13.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/13.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/14.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/14.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/15.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/15.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12 img-fluid zoom"
                      itemProp="associatedMedia"
                      itemScope
                      itemType="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/16.jpg"
                        itemProp="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/16.jpg"
                          itemProp="thumbnail"
                          alt="Image description"
                        />
                      </a>
                      <div className="p-1 d-flex justify-content-between">
                        <div>
                          <h4 className="text-dark">Product Title</h4>
                          <p>Client Name</p>
                        </div>
                        <div className="dropdown dropup">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                          </button>
                          <div
                            className="dropdown-menu position-absolute dropdown-menu-right"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#">
                              View Gallery
                            </a>
                            <a className="dropdown-item" href="#">
                              Edit Collection
                            </a>
                            <a className="dropdown-item" href="#">
                              Notify Client
                            </a>
                          </div>
                        </div>
                      </div>
                    </figure>
                  </div>
                </div>

                <div
                  className="pswp"
                  tabIndex="-1"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div className="pswp__bg"></div>

                  <div className="pswp__scroll-wrap">
                    <div className="pswp__container">
                      <div className="pswp__item"></div>
                      <div className="pswp__item"></div>
                      <div className="pswp__item"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <h4 className="card-title assigned_gallery">Your Orders</h4>
            <div className="users-list-table">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    {/* datatable start */}
                    <div className="table-responsive">
                      <table id="users-list-datatable" className="table">
                        <thead>
                          <tr>
                            <th>Order.No.</th>
                            <th>Date</th>
                            <th>Collection Name</th>
                            <th>Package Name</th>
                            <th>Package Price</th>
                            <th>Extras</th>
                            <th>Extras Price</th>
                            <th>Total Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>300</td>
                            <td>23/03/2024</td>
                            <td>
                              <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                dean3004
                              </a>
                            </td>
                            <td>package1</td>
                            <td>$15</td>
                            <td>$5</td>
                            <td>$5</td>
                            <td>$25</td>
                            {/* <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td> */}
                            <td>
                              <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                <i className="feather icon-edit-1" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>301</td>
                            <td>23/03/2024</td>
                            <td>
                              <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                zena0604
                              </a>
                            </td>
                            <td>package2</td>
                            {/* <td>zena@mail.com</td> */}
                            <td>$15</td>
                            <td>$5</td>
                            <td>$5 </td>
                            <td>$25</td>
                            {/* <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td> */}
                            <td>
                              <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                <i className="feather icon-edit-1" />
                              </a>
                            </td>
                          </tr>
                          {/* <tr>
                                                    <td>302</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            delilah0301
                                                        </a>
                                                    </td>
                                                    <td>Delilah Moon</td>
                                                    <td>03/01/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>303</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            hillary1807
                                                        </a>
                                                    </td>
                                                    <td>Hillary Rasmussen</td>
                                                    <td>18/07/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>304</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            herman2003
                                                        </a>
                                                    </td>
                                                    <td>Herman Tate</td>
                                                    <td>20/03/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>305</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            kuame3008
                                                        </a>
                                                    </td>
                                                    <td>Kuame Ford</td>
                                                    <td>30/08/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>306</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            fulton2009
                                                        </a>
                                                    </td>
                                                    <td>Fulton Stafford</td>
                                                    <td>20/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>307</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            piper0508
                                                        </a>
                                                    </td>
                                                    <td>Piper Jordan</td>
                                                    <td>05/08/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>308</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            neil1002
                                                        </a>
                                                    </td>
                                                    <td>Neil Sosa</td>
                                                    <td>10/02/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>309</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            caldwell2402
                                                        </a>
                                                    </td>
                                                    <td>Caldwell Chapman</td>
                                                    <td>24/02/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>310</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            wesley0508
                                                        </a>
                                                    </td>
                                                    <td>Wesley Oneil</td>
                                                    <td>05/08/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>311</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            tallulah2009
                                                        </a>
                                                    </td>
                                                    <td>Tallulah Fleming</td>
                                                    <td>20/09/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>312</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            iris2505
                                                        </a>
                                                    </td>
                                                    <td>Iris Maddox</td>
                                                    <td>25/05/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>313</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            caleb1504
                                                        </a>
                                                    </td>
                                                    <td>Caleb Bradley</td>
                                                    <td>15/04/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>314</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            illiana0410
                                                        </a>
                                                    </td>
                                                    <td>Illiana Grimes</td>
                                                    <td>04/10/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>315</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            chester0902
                                                        </a>
                                                    </td>
                                                    <td>Chester Estes</td>
                                                    <td>09/02/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>316</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            gregory2309
                                                        </a>
                                                    </td>
                                                    <td>Gregory Hayden</td>
                                                    <td>23/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>317</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            jescie1802
                                                        </a>
                                                    </td>
                                                    <td>Jescie Parker</td>
                                                    <td>18/02/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>318</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            sydney3101
                                                        </a>
                                                    </td>
                                                    <td>Sydney Cabrera</td>
                                                    <td>31/01/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>319</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            gray2702
                                                        </a>
                                                    </td>
                                                    <td>Gray Valenzuela</td>
                                                    <td>27/02/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>320</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            hoyt0305
                                                        </a>
                                                    </td>
                                                    <td>Hoyt Ellison</td>
                                                    <td>03/05/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>321</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            damon0209
                                                        </a>
                                                    </td>
                                                    <td>Damon Berry</td>
                                                    <td>02/09/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>322</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            kelsie0511
                                                        </a>
                                                    </td>
                                                    <td>Kelsie Dunlap</td>
                                                    <td>05/11/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>323</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            abel1606
                                                        </a>
                                                    </td>
                                                    <td>Abel Dunn</td>
                                                    <td>16/06/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>324</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            nina2208
                                                        </a>
                                                    </td>
                                                    <td>Nina Byers</td>
                                                    <td>22/08/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>325</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            erasmus1809
                                                        </a>
                                                    </td>
                                                    <td>Erasmus Walter</td>
                                                    <td>18/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>326</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            yael2612
                                                        </a>
                                                    </td>
                                                    <td>Yael Marshall</td>
                                                    <td>26/12/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>327</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            thomas2012
                                                        </a>
                                                    </td>
                                                    <td>Thomas Dudley</td>
                                                    <td>20/12/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>328</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            althea2810
                                                        </a>
                                                    </td>
                                                    <td>Althea Turner</td>
                                                    <td>28/10/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>329</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            jena2206
                                                        </a>
                                                    </td>
                                                    <td>Jena Schroeder</td>
                                                    <td>22/06/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>330</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            hyacinth2201
                                                        </a>
                                                    </td>
                                                    <td>Hyacinth Maxwell</td>
                                                    <td>22/01/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>331</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            madeson1907
                                                        </a>
                                                    </td>
                                                    <td>Madeson Byers</td>
                                                    <td>19/07/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>332</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            elmo0707
                                                        </a>
                                                    </td>
                                                    <td>Elmo Tran</td>
                                                    <td>07/07/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>333</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            shelley0309
                                                        </a>
                                                    </td>
                                                    <td>Shelley Eaton</td>
                                                    <td>03/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>334</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            graham0301
                                                        </a>
                                                    </td>
                                                    <td>Graham Flores</td>
                                                    <td>03/01/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>335</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            erasmus2110
                                                        </a>
                                                    </td>
                                                    <td>Erasmus Mclaughlin</td>
                                                    <td>21/10/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr> */}
                        </tbody>
                      </table>
                    </div>
                    {/* datatable ends */}
                  </div>
                </div>
              </div>
            </div>

            {/* <section id="image-gallery" className="card">
              <div className="card-header">
                <h4 className="card-title">Image gallery</h4>
                <a className="heading-elements-toggle">
                  <i className="fa fa-ellipsis-v font-medium-3"></i>
                </a>
                <div className="heading-elements">
                  <ul className="list-inline mb-0">
                    <li>
                      <a data-action="collapse">
                        <i className="feather icon-minus"></i>
                      </a>
                    </li>
                    <li>
                      <a data-action="reload">
                        <i className="feather icon-rotate-cw"></i>
                      </a>
                    </li>
                    <li>
                      <a data-action="expand">
                        <i className="feather icon-maximize"></i>
                      </a>
                    </li>
                    <li>
                      <a data-action="close">
                        <i className="feather icon-x"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-content collapse show">
                <div className="card-content collapse show">
                  <div className="card-body card-dashboard dataTables_wrapper dt-bootstrap">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered ">
                        <thead>
                          <tr>
                            <th>Order.No.</th>
                            <th>Date</th>
                            <th>Collection Name</th>
                            <th>Package Name</th>
                            <th>Package Price</th>
                            <th>Extras</th>
                            <th>Extras Price</th>
                            <th>Total Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Order.No.</th>
                            <th>Date</th>
                            <th>Collection Name</th>
                            <th>Package Name</th>
                            <th>Package Price</th>
                            <th>Extras</th>
                            <th>Extras Price</th>
                            <th>Total Price</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </div>
        </div>
      </div>
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
