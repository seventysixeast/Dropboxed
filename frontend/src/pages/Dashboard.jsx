import React, { useEffect, useState } from "react";
import { getAllClients } from "../api/clientApis";
import { getAllBookingTitles, getAllServices } from "../api/bookingApis";
import { addGallery } from "../api/collectionApis";
import { toast } from 'react-toastify';
import AddGalleryModal from "../components/addGalleryModal";

export const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [bookingTitles, setBookingTitles] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isGalleryLocked, setIsGalleryLocked] = useState(false);
  const [isNotifyChecked, setIsNotifyChecked] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    client: '',
    booking_title: '',
    services: '',
    photographer: '',
    gallery_title: '',
    dropbox_link: '',
    vimeo_video_link: '',
    banner: '',
    lock_gallery: '',
    notify_client: ''
  });

  useEffect(() => {
    getClients();
  }, [])

  useEffect(() => {
    if (formData.client !== '' && formData.booking_title !== '') {
      getServices(formData.client, formData.booking_title);
    }
  }, [formData.client, formData.booking_title])

  const getClients = async () => {
    try {
      let clients = await getAllClients();
      setClients(clients.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getBookingTitles = async (client) => {
    try {
      let bookingTitles = await getAllBookingTitles({ clientId: client });
      setBookingTitles(bookingTitles.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getServices = async (client, booking_title) => {
    try {
      let services = await getAllServices({ clientId: client, booking_title: booking_title });
      setServices(services.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleGalleryLockChange = () => {
    setIsGalleryLocked(!isGalleryLocked);
  };

  const handleNotifyChange = () => {
    setIsNotifyChecked(!isNotifyChecked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let gallery = { ...formData };
    if (name === "client") {
      gallery.client = value;
      getBookingTitles(value);
    } else if (name === "booking_title") {
      gallery.booking_title = value;
    } else if (name === 'services') {
      gallery.services = value
    } else if (name === 'photographer') {
      gallery.photographer = value
    } else if (name === 'gallery_title') {
      gallery.gallery_title = value
    } else if (name === 'dropbox_link') {
      gallery.dropbox_link = value
    } else if (name === 'vimeo_video_link') {
      gallery.vimeo_video_link = value
    } else if (name === 'banner') {
      gallery.banner = value
    } else if (name === 'lock_gallery') {
      gallery.lock_gallery = value
    } else if (name === 'notify_client') {
      gallery.notify_client = value
    }
    setFormData(gallery);
  };

  const handleBannerChange = (e) => {
    setFormData({
      ...formData,
      banner: e.target.files[0]
    });
  };

  const handleSelectedChange = (selectedOptions) => {
    setSelectedService(selectedOptions);

    const selectedValues = selectedOptions.map(option => option.value);
    const selectedValuesString = selectedValues.join(', ');
    setFormData((prevData) => ({
      ...prevData,
      services: selectedValuesString,
    }));
  };

  const resetFormData = async () => {
    setFormData({
      id: '',
      client: '',
      booking_title: '',
      services: '',
      photographer: '',
      gallery_title: '',
      dropbox_link: '',
      vimeo_video_link: '',
      banner: '',
      lock_gallery: '',
      notify_client: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('client', formData.client);
      formDataToSend.append('booking_title', formData.booking_title);
      formDataToSend.append('services', formData.services);
      formDataToSend.append('photographer', formData.photographer);
      formDataToSend.append('gallery_title', formData.gallery_title);
      formDataToSend.append('dropbox_link', formData.dropbox_link);
      formDataToSend.append('vimeo_video_link', formData.vimeo_video_link);
      formDataToSend.append('banner', formData.banner);
      formDataToSend.append('lock_gallery', isGalleryLocked);
      formDataToSend.append('notify_client', isNotifyChecked);

      let res = await addGallery(formDataToSend);
      console.log("res", res);
      // if (res.success) {
      //   toast.success(res.message);
      //   resetFormData();
      //   document.getElementById('closeModal').click();
      //   getAllClientsData();
      // } else {
      //   toast.error(res);
      // }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
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
            <div className="row grouped-multiple-statistics-card pb-2">
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
                                  Completed Orders
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
                          className="btn btn-outline-primary btn-block"
                          data-toggle="modal"
                          data-target="#bootstrap"
                          onClick={() => {
                            setShowAddGalleryModal(true);
                          }}
                        >
                          Add Gallery
                        </button>
                      </div>
                    </li>
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
                      <table class="table table-striped table-bordered zero-configuration">
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
                            <td>
                              <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                                <i className="fa fa-remove"></i>
                              </button>
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
                              <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" title="Edit">
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button class="btn btn-sm btn-outline-danger mr-1 mb-1" title="Delete">
                                <i className="fa fa-remove"></i>
                              </button>
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
      <AddGalleryModal
        isOpen={showAddGalleryModal}
        onClose={() => setShowAddGalleryModal(false)}
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        clients={clients}
        bookingTitles={bookingTitles}
        services={services}
        selectedService={selectedService}
        handleSelectedChange={handleSelectedChange}
        handleBannerChange={handleBannerChange}
        isGalleryLocked={isGalleryLocked}
        handleGalleryLockChange={handleGalleryLockChange}
        handleNotifyChange={handleNotifyChange}
        isNotifyChecked={isNotifyChecked}
        message="Add Gallery"
      />
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
