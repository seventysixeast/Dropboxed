import React, { useEffect, useState } from "react";
import { getAllClients } from "../api/clientApis";
import {
  getAllBookingTitles,
  getAllServices,
  getAllPhotographers,
} from "../api/bookingApis";
import {
  addGallery,
  getAllCollections,
  getCollection,
} from "../api/collectionApis";
import { toast } from "react-toastify";
import AddGalleryModal from "../components/addGalleryModal";
import { useAuth } from "../context/authContext";
import { getRefreshToken, verifyToken } from "../api/authApis";
import axios from "axios";

const REACT_APP_GALLERY_IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_REDIRECT = process.env.REACT_APP_DROPBOX_REDIRECT;

export const Dashboard = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id;
  const userId = user.id;
  const accessToken = authData.token;
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [isGalleryLocked, setIsGalleryLocked] = useState(false);
  const [isNotifyChecked, setIsNotifyChecked] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const currentUrl = window.location.href;
  const [bookingTitles, setBookingTitles] = useState([]);
  const url2 = new URL(currentUrl);
  url2.pathname = url2.pathname.replace("/dashboard", "");

  const url = new URL(currentUrl);

  url.searchParams.set("userId", userId);
  const scopes = encodeURIComponent(
    "account_info.read files.metadata.write files.metadata.read files.content.write files.content.read sharing.write sharing.read file_requests.write file_requests.read"
  );
  const dropboxAuthUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${REACT_APP_DROPBOX_CLIENT}&redirect_uri=${REACT_APP_DROPBOX_REDIRECT}&token_access_type=offline&scope=${scopes}&response_type=code&state=${url}`;

  const [formData, setFormData] = useState({
    id: "",
    client: "",
    booking_title: "",
    services: "",
    photographers: "",
    gallery_title: "",
    dropbox_link: "",
    vimeo_video_link: "",
    banner: "",
    lock_gallery: "",
    notify_client: "",
  });

  useEffect(() => {
    getClients();
    // if (collections.length == 0) {
    //   getAllCollectionsData();
    // }
    getAllCollectionsData();
    verifyToken(accessToken);
    getRefreshToken(user.dropbox_refresh);
  }, []);

  useEffect(() => {
    if (formData.client !== "" && formData.booking_title !== "") {
      getServices(formData.client, formData.booking_title);
      getPhotographers(formData.client, formData.booking_title);
      getBookingTitles(formData.client);
    }
  }, [formData.client, formData.booking_title]);

  const getClients = async () => {
    try {
      let clients = await getAllClients({ subdomainId: subdomainId });
      setClients(clients.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getBookingTitles = async (client) => {
    setLoading(true);
    try {
      let bookingTitles = await getAllBookingTitles({ clientId: client });
      setBookingTitles(bookingTitles.data);
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  const getServices = async (client, booking_title) => {
    try {
      let services = await getAllServices({
        clientId: client,
        booking_title: booking_title,
      });
      let servicesData =
        services &&
        services.data.map((pkg) => ({
          label: pkg.package_name,
          value: pkg.id,
        }));
      setServices(servicesData);
    } catch (error) {
      toast.error(error);
    }
  };

  const getPhotographers = async (client, booking_title) => {
    try {
      let photographers = await getAllPhotographers({
        clientId: client,
        booking_title: booking_title,
      });
      let photographersData =
        photographers &&
        photographers.data.map((photographer) => ({
          label: photographer.name,
          value: photographer.id,
        }));
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

  console.log(bookingTitles);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let gallery = { ...formData };

    console.log(gallery);
    if (name === "client") {
      gallery.client = value;
      getBookingTitles(value);
    } else if (name === "booking_title") {
      gallery.booking_title = value;
      gallery.gallery_title = value;
    } else if (name === "services") {
      gallery.services = value;
    } else if (name === "photographers") {
      gallery.photographers = value;
    } else if (name === "gallery_title") {
      gallery.gallery_title = value;
    } else if (name === "dropbox_link") {
      gallery.dropbox_link = value;
    } else if (name === "vimeo_video_link") {
      gallery.vimeo_video_link = value;
    } else if (name === "banner") {
      gallery.banner = value;
    } else if (name === "lock_gallery") {
      gallery.lock_gallery = value;
    } else if (name === "notify_client") {
      gallery.notify_client = value;
    }
    setFormData(gallery);
  };

  const handleBannerChange = (e) => {
    setFormData({
      ...formData,
      banner: e.target.files[0],
    });
  };

  const resetFormData = async () => {
    setFormData({
      id: "",
      client: "",
      booking_title: "",
      services: "",
      photographers: "",
      gallery_title: "",
      dropbox_link: "",
      vimeo_video_link: "",
      banner: "",
      lock_gallery: "",
      notify_client: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let serviceIds = services && services.map((item) => item.value);
      let photographerIds =
        photographers && photographers.map((item) => item.value);
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("client", formData.client);
      formDataToSend.append("booking_title", formData.booking_title);
      formDataToSend.append("services", serviceIds);
      formDataToSend.append("photographers", photographerIds);
      formDataToSend.append("gallery_title", formData.gallery_title);
      formDataToSend.append("dropbox_link", formData.dropbox_link);
      formDataToSend.append("vimeo_video_link", formData.vimeo_video_link);
      formDataToSend.append("banner", formData.banner);
      formDataToSend.append("lock_gallery", isGalleryLocked);
      formDataToSend.append("notify_client", isNotifyChecked);
      formDataToSend.append("subdomainId", subdomainId);
      let res = await addGallery(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        resetFormData();
        setShowAddGalleryModal(false);
        getAllCollectionsData();
        setShowAddGalleryModal(false);
        document.getElementById("closeModalButton").click();
        window.location.reload();
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAllCollectionsData = async () => {
    const formData = new FormData();
    formData.append("subdomainId", subdomainId);
    formData.append("roleId", user.role_id);
    formData.append("userId", user.id);
    try {
      let allCollections = await getAllCollections(formData);
      if (allCollections && allCollections.success) {
        setCollections(allCollections.data);
      } else {
        setCollections([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const textBeforeComma = (text) => {
    if (typeof text === "string") {
      return text.split(",")[0];
    }
    return text;
  };

  const getCollectionData = async (id) => {
    setShowAddGalleryModal(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("slug", id);
      let collectionData = await getCollection(formDataToSend);
      if (collectionData.data.banner !== "") {
        let path = `${IMAGE_URL}/${collectionData.data.banner}`;
        setPreviewImage(path);
      } else {
        setPreviewImage(null);
      }
      const initialFormData = {
        id: collectionData.data.id,
        client: collectionData.data.client_id,
        booking_title: collectionData.data.client_address,
        serviceIds: collectionData.data.services,
        photographerIds: collectionData.data.photographers,
        gallery_title: collectionData.data.name,
        dropbox_link: collectionData.data.dropbox_link,
        vimeo_video_link: collectionData.data.video_link,
        banner: collectionData.data.banner,
      };
      setFormData(initialFormData);
      setIsGalleryLocked(collectionData.data.lock_gallery);
      setIsNotifyChecked(collectionData.data.notify_client);
      getAllCollectionsData();
    } catch (error) {
      console.error("Failed to get ImageTypes:", error.message);
    }
  };

  useEffect(() => {
    if (collections) {
      fetchFileList();
    }
  }, [collections]);

  const fetchFileList = async () => {
    try {
      for (let i = 0; i < collections.length; i++) {
        const collection = collections[i];
        if (collection.imageCount == undefined) {
          const tokens = await getRefreshToken(collection.dropbox_refresh);

          const sharedData = await axios.post(
            "https://api.dropboxapi.com/2/sharing/get_shared_link_metadata",
            { url: collection.dropbox_link },
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );

          let thePath = "";
          if (sharedData.data.path_lower !== undefined) {
            thePath = sharedData.data.path_lower;
          }

          const listResponse = await axios.post(
            "https://api.dropboxapi.com/2/files/list_folder",
            { path: thePath },
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const entries = listResponse.data.entries;
          const itemCount = entries.length;
          const updatedCollection = {
            ...collection,
            imageCount: itemCount,
          };
          collections[i] = updatedCollection;
          setCollections(collections);
        }
      }
    } catch (error) {
      console.error("Error fetching file list:", error);
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
                        {user.role_id == 5 && (
                          <>
                            {user.dropbox_refresh == null && (
                              <a
                                href={`${dropboxAuthUrl}`}
                                className="btn btn-primary"
                                style={{ paddingTop: "10px" }}
                              >
                                Link Your Dropbox
                              </a>
                            )}
                          </>
                        )}
                        {user.role_id !== 3 && (
                          <button
                            type="button"
                            className="btn btn-outline-primary mr-1"
                            data-toggle="modal"
                            data-target="#appointment"
                            onClick={() => { window.location.href = '/booking-list-calendar'; }}
                          >
                            New Appointment
                          </button>
                        )}
                        {user.role_id !== 3 && (
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            data-toggle="modal"
                            data-target="#bootstrap"
                            title={
                              user.dropbox_refresh == null
                                ? "Add Collection"
                                : "Dropbox Not Linked"
                            }
                            disabled={user.dropbox_refresh == null}
                            onClick={() => {
                              setShowAddGalleryModal(true);
                            }}
                          >
                            New Collection
                          </button>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-deck-wrapper">
                <div className="grid-hover row">
                  {collections &&
                    collections.map((item) => (
                      <div
                        className="col-md-3 mb-1"
                        key={item.id}
                      >
                        <a
                          href={`${url2}view-gallery/${item.slug}`}
                          className="gallery-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <figure className="effect-zoe">
                            <img
                              className="gallery-thumbnail equal-image"
                              src={
                                item.banner
                                  ? `${REACT_APP_GALLERY_IMAGE_URL}/${item.banner}`
                                  : "../../../app-assets/images/gallery/9.jpg"
                              }
                            />

                            <figcaption
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              {item.imageCount !== undefined ? (
                                <p
                                  style={{
                                    position: "absolute",
                                    bottom: "4rem",
                                    right: "5px",
                                    background: "rgba(0, 0, 0, 0.5)",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {item.imageCount} images
                                </p>
                              ) : <></>}
                              <div
                                className="col-6"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                }}
                              >
                                <h2
                                  className=""
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    whiteSpace: "normal",
                                    lineHeight: "1.2",
                                    textTransform: "capitalize",
                                    color: "#6f8189",
                                  }}
                                >
                                  {item.client_name}
                                </h2>
                              </div>
                              <p
                                className="icon-links"
                                style={{ marginBottom: "10px" }}
                              >
                                {user.role_id !== 3 && (
                                  <a
                                    href="#"
                                    className="gallery-link"
                                    data-toggle="modal"
                                    data-target="#bootstrap"
                                    onClick={() => {
                                      getCollectionData(item.slug);
                                    }}
                                  >
                                    <i className="feather icon-settings"></i>
                                  </a>
                                )}
                                <a
                                  href={item.dropbox_link}
                                  className="gallery-link mx-1"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="feather icon-box"></i>
                                </a>
                                <a
                                  href="#"
                                  className="gallery-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigator.clipboard.writeText(
                                      item.dropbox_link
                                    );
                                  }}
                                >
                                  <i className="feather icon-copy"></i>
                                </a>
                              </p>
                              <p className="description">{item.name}</p>
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
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered zero-configuration">
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
                              <button
                                className="btn btn-sm btn-outline-secondary mr-1 mb-1"
                                title="Edit"
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger mr-1 mb-1"
                                title="Delete"
                              >
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
                              <button
                                className="btn btn-sm btn-outline-secondary mr-1 mb-1"
                                title="Edit"
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger mr-1 mb-1"
                                title="Delete"
                              >
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
        previewImage={previewImage}
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
