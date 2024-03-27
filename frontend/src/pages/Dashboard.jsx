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

            <section id="image-grid" className="app-content card">
              <div className="card-header">
                <h4 className="card-title">Image gallery</h4>
                <a className="heading-elements-toggle">
                  <i className="fa fa-ellipsis-v font-medium-3"></i>
                </a>
                <div className="heading-elements">
                  <ul className="list-inline mb-0">
                    <li>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          data-toggle="modal"
                          data-target="#bootstrap"
                        >
                          Add Gallery
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
                                    <label htmlFor="users">Users</label>
                                    <select
                                      className="select2 form-control"
                                      required
                                    >
                                      <option value="user1">User 1</option>
                                      <option value="user2">User 2</option>
                                      <option value="user3">User 3</option>
                                    </select>
                                  </fieldset>

                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="uploadmethod">Select</label>
                                    <select
                                      className="select2 form-control"
                                      required
                                    >
                                      <option value="dropbox">Dropbox</option>
                                      <option value="googledrive">
                                        Google Drive
                                      </option>
                                    </select>
                                  </fieldset>
                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="link">
                                      Image Folder Link
                                    </label>
                                    <textarea
                                      className="form-control"
                                      id="link"
                                      rows="1"
                                      placeholder="Link"
                                    ></textarea>
                                  </fieldset>
                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="package">Package</label>
                                    <select
                                      className="select2 form-control"
                                      required
                                    >
                                      <option value="Studio">
                                        Studio Package
                                      </option>
                                      <option value="Essential">
                                        Essential Package
                                      </option>
                                      <option value="Premium">
                                        Premium Package
                                      </option>
                                    </select>
                                  </fieldset>
                                  <fieldset className="form-group floating-label-form-group">
                                    <label htmlFor="services">Services</label>
                                    <select
                                      className="select2 form-control"
                                      required
                                    >
                                      <option value="Studio">
                                        Studio Photography
                                      </option>
                                      <option value="Essential">
                                        Essential Photography
                                      </option>
                                      <option value="Premium">
                                        Premium Photography
                                      </option>
                                      <option value="Studio">
                                        Studio Floor Plan
                                      </option>
                                      <option value="Essential">
                                        Essential Floor Plan
                                      </option>
                                      <option value="Premium">
                                        Premium Floor Plan
                                      </option>
                                    </select>
                                  </fieldset>
                                </div>
                                <div className="modal-footer">
                                  <input
                                    type="submit"
                                    className="btn btn-outline-primary btn"
                                    value="Add"
                                  />
                                  <input
                                    type="reset"
                                    className="btn btn-outline-secondary btn"
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
                    {/* <li>
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
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="card-content collapse show">
                <div
                  className="card-body my-gallery"
                  itemScope
                  itemType="http://schema.org/ImageGallery"
                >
                  <div className="card-deck-wrapper">
                    <div className="card-deck">
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
                        itemProp="associatedMedia"
                        itemScope
                        itemType="http://schema.org/ImageObject"
                      >
                        <a
                          href="../../../app-assets/images/gallery/1.jpg"
                          itemProp="contentUrl"
                          data-size="480x360"
                        >
                          <img
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/1.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 1</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/2.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 2</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/3.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 3</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/4.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 4</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                    </div>
                  </div>

                  <div className="card-deck-wrapper">
                    <div className="card-deck mt-1">
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/5.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 5</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/6.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 6</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/7.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 7</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/8.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 4</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                    </div>
                  </div>

                  <div className="card-deck-wrapper">
                    <div className="card-deck mt-1">
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/9.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 9</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/10.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 10</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/11.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 11</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                      <figure
                        className="card card-img-top border-grey border-lighten-2"
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
                            className="gallery-thumbnail card-img-top"
                            src="../../../app-assets/images/gallery/12.jpg"
                            itemProp="thumbnail"
                            alt="Image description"
                          />
                        </a>
                        <div className="card-body px-0">
                          <h4 className="card-title">Card title 12</h4>
                          <p className="card-text">
                            This is a longer card with supporting text below.
                          </p>
                        </div>
                      </figure>
                    </div>
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

                    <div className="pswp__ui pswp__ui--hidden">
                      <div className="pswp__top-bar">
                        <div className="pswp__counter"></div>

                        <button
                          className="pswp__button pswp__button--close"
                          title="Close (Esc)"
                        ></button>

                        <button
                          className="pswp__button pswp__button--share"
                          title="Share"
                        ></button>

                        <button
                          className="pswp__button pswp__button--fs"
                          title="Toggle fullscreen"
                        ></button>

                        <button
                          className="pswp__button pswp__button--zoom"
                          title="Zoom in/out"
                        ></button>

                        <div className="pswp__preloader">
                          <div className="pswp__preloader__icn">
                            <div className="pswp__preloader__cut">
                              <div className="pswp__preloader__donut"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div className="pswp__share-tooltip"></div>
                      </div>

                      <button
                        className="pswp__button pswp__button--arrow--left"
                        title="Previous (arrow left)"
                      ></button>

                      <button
                        className="pswp__button pswp__button--arrow--right"
                        title="Next (arrow right)"
                      ></button>

                      <div className="pswp__caption">
                        <div className="pswp__caption__center"></div>
                      </div>
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
                            <td>$15</td>
                            <td>$5</td>
                            <td>$5 </td>
                            <td>$25</td>
                            <td>
                              <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                <i className="feather icon-edit-1" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
