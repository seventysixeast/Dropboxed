import React, { useEffect, useState } from "react";
import { getAllClients } from "../api/clientApis";
import { getAllBookingTitles, getAllServices, getAllPhotographers } from "../api/bookingApis";
import { addGallery, getAllCollections } from "../api/collectionApis";
import { toast } from 'react-toastify';
import AddGalleryModal from "../components/addGalleryModal";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getRefreshToken, verifyToken } from "../api/authApis";

const REACT_APP_GALLERY_IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_REDIRECT = process.env.REACT_APP_DROPBOX_REDIRECT;

export const Dashboard = () => {
  const { authData } = useAuth();
  console.log(authData);
  const user = authData.user;
  const subdomainId = user.subdomain_id
  const userId = user.id
  const accessToken = authData.token;
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [bookingTitles, setBookingTitles] = useState([]);
  const [services, setServices] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [isGalleryLocked, setIsGalleryLocked] = useState(false);
  const [isNotifyChecked, setIsNotifyChecked] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  url.searchParams.set('userId', userId);

  const dropboxAuthUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${REACT_APP_DROPBOX_CLIENT}&redirect_uri=${REACT_APP_DROPBOX_REDIRECT}&token_access_type=offline&response_type=code&state=${url}`;

  const [formData, setFormData] = useState({
    id: '',
    client: '',
    booking_title: '',
    services: '',
    photographers: '',
    gallery_title: '',
    dropbox_link: '',
    vimeo_video_link: '',
    banner: '',
    lock_gallery: '',
    notify_client: ''
  });

  useEffect(() => {
    getClients();
    getAllCollectionsData();
    verifyToken(accessToken);
    getRefreshToken(user.dropbox_refresh)
  }, [])

  useEffect(() => {
    if (formData.client !== '' && formData.booking_title !== '') {
      getServices(formData.client, formData.booking_title);
      getPhotographers(formData.client, formData.booking_title);
    }
  }, [formData.client, formData.booking_title])

  const getClients = async () => {
    try {
      let clients = await getAllClients({ subdomainId: subdomainId });
      setClients(clients.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getBookingTitles = async (client) => {
    setLoading(true)
    try {
      let bookingTitles = await getAllBookingTitles({ clientId: client });
      setBookingTitles(bookingTitles.data);
    } catch (error) {
      toast.error(error);
    }
    setLoading(false)
  };

  const getServices = async (client, booking_title) => {
    try {
      let services = await getAllServices({ clientId: client, booking_title: booking_title });
      let servicesData = services && services.data.map((pkg) => ({
        label: pkg.package_name,
        value: pkg.id
      }))
      setServices(servicesData);
    } catch (error) {
      toast.error(error);
    }
  };

  const getPhotographers = async (client, booking_title) => {
    try {
      let photographers = await getAllPhotographers({ clientId: client, booking_title: booking_title });
      let photographersData = photographers && photographers.data.map((photographer) => ({
        label: photographer.name,
        value: photographer.id
      }))
      setPhotographers(photographersData);
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
      gallery.gallery_title = value;
    } else if (name === 'services') {
      gallery.services = value
    } else if (name === 'photographers') {
      gallery.photographers = value
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

  const resetFormData = async () => {
    setFormData({
      id: '',
      client: '',
      booking_title: '',
      services: '',
      photographers: '',
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
      let serviceIds = services && services.map(item => item.value)
      let photographerIds = photographers && photographers.map(item => item.value)
      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('client', formData.client);
      formDataToSend.append('booking_title', formData.booking_title);
      formDataToSend.append('services', serviceIds);
      formDataToSend.append('photographers', photographerIds);
      formDataToSend.append('gallery_title', formData.gallery_title);
      formDataToSend.append('dropbox_link', formData.dropbox_link);
      formDataToSend.append('vimeo_video_link', formData.vimeo_video_link);
      formDataToSend.append('banner', formData.banner);
      formDataToSend.append('lock_gallery', isGalleryLocked);
      formDataToSend.append('notify_client', isNotifyChecked);
      formDataToSend.append('subdomainId', subdomainId);

      let res = await addGallery(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        resetFormData();
        setShowAddGalleryModal(false)
        getAllCollectionsData();
        setShowAddGalleryModal(false)
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAllCollectionsData = async () => {
    try {
      let allCollections = await getAllCollections({ subdomainId: subdomainId });
      if (allCollections && allCollections.success) {
        setCollections(allCollections.data);
      } else {
        setCollections([]);
      }
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
                      <div className="form-group d-flex">
                        {user.dropbox_refresh == null &&
                        <a href={`${dropboxAuthUrl}`} className="btn btn-primary mr-1" style={{paddingTop:"10px"}}>Link Your Dropbox</a>
                      }
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          data-toggle="modal"
                          data-target="#bootstrap"
                          // title conditional 
                          title = {user.dropbox_refresh == null ? "Dropbox Not Linked" : "Add Collection"}
                          disabled={user.dropbox_refresh == null}
                          onClick={() => {
                            setShowAddGalleryModal(true);
                          }}
                        >
                          New Collection
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-deck-wrapper">
                <div class="grid-hover row">
                  {collections && collections.map(item => (
                    <div className="col-md-3 mb-3">
                      <a
                        onClick={() => navigate(`/view-gallery/${item.id}`)}
                        className="gallery-link"
                      >
                        <figure class="effect-zoe">
                          <img
                            className="gallery-thumbnail"
                            src={
                              item.banner
                                ? `${REACT_APP_GALLERY_IMAGE_URL}/${item.banner}`
                                : "../../../app-assets/images/gallery/9.jpg"
                            }
                          />
                          <figcaption>
                            <h2><span>{item.client_name}</span></h2>
                            <p class="icon-links">
                              <a onClick={() => navigate(`/view-gallery/${item.id}`)} title="View Gallery"><i class="feather icon-eye"></i></a>
                            </p>
                            <p class="description">{item.name}</p>
                          </figcaption>
                        </figure>
                      </a>
                    </div>
                  ))}
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
        message="Add Collection"
        isOpen={showAddGalleryModal}
        formData={formData}
        clients={clients}
        bookingTitles={bookingTitles}
        services={services}
        photographers={photographers}
        isGalleryLocked={isGalleryLocked}
        isNotifyChecked={isNotifyChecked}
        loading={loading}
        handleInputChange={handleInputChange}
        handleBannerChange={handleBannerChange}
        handleGalleryLockChange={handleGalleryLockChange}
        handleNotifyChange={handleNotifyChange}
        handleSubmit={handleSubmit}
        onClose={() => setShowAddGalleryModal(false)}
      />
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
