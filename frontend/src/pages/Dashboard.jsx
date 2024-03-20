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
                                <i className="icon-camera font-large-2 white"></i>
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
                      <div className="col-xl-3 col-lg-6 col-12">
                        <div className="card">
                          <div className="card-content">
                            <div className="media align-items-stretch">
                              <div className="p-2 text-center bg-danger bg-darken-2">
                                <i className="icon-user font-large-2 white"></i>
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
                                <i className="icon-basket-loaded font-large-2 white"></i>
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
                                <i className="icon-wallet font-large-2 white"></i>
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
            <h4 className="card-title assigned_gallery">Assigned Gallery</h4>
            {/* <!-- active users and my task timeline cards starts here --> */}
            <section id="image-gallery" className="card">
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
                <div className="card-body">
                  <div className="card-text">
                    <p>
                      Image gallery grid with photo-swipe integration. Display
                      images gallery in 4-2-1 columns and photo-swipe provides
                      gallery features.
                    </p>
                  </div>
                </div>
                <div
                  className="card-body  my-gallery"
                  itemscope
                  itemtype="http://schema.org/ImageGallery"
                >
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/1.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/1.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/2.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/2.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/3.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/3.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/4.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/4.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                  </div>
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/5.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/5.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/6.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/6.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/7.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/7.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/8.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/8.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                  </div>
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/9.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/9.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/10.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/10.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/11.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/11.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/12.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/12.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                  </div>
                  <div className="row">
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/13.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/13.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/14.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/14.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/15.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/15.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                    <figure
                      className="col-lg-3 col-md-6 col-12"
                      itemprop="associatedMedia"
                      itemscope
                      itemtype="http://schema.org/ImageObject"
                    >
                      <a
                        href="../../../app-assets/images/gallery/16.jpg"
                        itemprop="contentUrl"
                        data-size="480x360"
                      >
                        <img
                          className="img-thumbnail img-fluid"
                          src="../../../app-assets/images/gallery/16.jpg"
                          itemprop="thumbnail"
                          alt="Image description"
                        />
                      </a>
                    </figure>
                  </div>
                </div>

                <div
                  className="pswp"
                  tabindex="-1"
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

            <section id="image-gallery" className="card">
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
            </section>
          </div>
        </div>
      </div>
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
