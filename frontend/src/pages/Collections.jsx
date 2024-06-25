import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { getAllClients } from "../api/clientApis";
import {
  getAllBookingTitles,
  getAllServices,
  getAllPhotographers,
  getServicesCollection,
} from "../api/bookingApis";
import {
  addGallery,
  getAllCollections,
  getCollection,
  deleteCollection,
  getDropboxRefreshToken,
  updateGalleryLock,
  updateCollection,
  updateGalleryNotify,
} from "../api/collectionApis";
import { getRefreshToken, verifyToken } from "../api/authApis";
import { toast } from "react-toastify";
import AddGalleryModal from "../components/addGalleryModal";
import { useAuth } from "../context/authContext";
import TableCustom from "../components/Table";
import DeleteModal from "../components/DeleteModal";
import axios from "axios";
import moment from "moment";
import ReTooltip from "../components/Tooltip";
import AddInvoiceNodal from "../components/CreateInvoice";
import LoadingOverlay from "../components/Loader";
import NoInvoiceModal from "../components/NoInvoiceModal";
import EditInvoiceModal from "../components/EditInvoice";
import ConfirmModal from "../components/ConfirmModal";
import { useParams, Link, useNavigate } from "react-router-dom";

const IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_REDIRECT = process.env.REACT_APP_DROPBOX_REDIRECT;

const Collections = () => {
  const { id } = useParams();

  const { authData } = useAuth();

  const user = authData.user;

  const subdomainId = user.subdomain_id;
  const userId = user.id;
  const roleId = user.role_id;
  const accesstoken = authData.token;
  const [loading, setLoading] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [bookingTitles, setBookingTitles] = useState([]);
  const [services, setServices] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [isGalleryLocked, setIsGalleryLocked] = useState(false);
  const [isNotifyChecked, setIsNotifyChecked] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [collectionIdToDelete, setCollectionIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subdomainDropbox, setSubdomainDropbox] = useState("");
  const [showNoInvoiceModal, setShowNoInvoiceModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [idToNotify, setIdToNotify] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    client: "",
    booking_title: "",
    services: "",
    photographers: "",
    gallery_title: "",
    dropbox_link: "",
    vimeo_video_link: "",
    banner: null,
    lock_gallery: false,
    notify_client: "",
    serviceIds: "",
  });

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [currentInvoiceId, setCurrentInvoiceId] = useState(null);

  useEffect(() => {
    getClients();
    getAllCollectionsData();
    getDropboxRefresh();
  }, []);

  const currentUrl = window.location.href;
  const url2 = new URL(currentUrl);
  url2.pathname = url2.pathname.replace("/collections", "");
  const url = new URL(currentUrl);

  url.searchParams.set("userId", userId);
  const scopes = encodeURIComponent(
    "account_info.read files.metadata.write files.metadata.read files.content.write files.content.read sharing.write sharing.read file_requests.write file_requests.read"
  );

  const dropboxAuthUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${REACT_APP_DROPBOX_CLIENT}&redirect_uri=${REACT_APP_DROPBOX_REDIRECT}&token_access_type=offline&scope=${scopes}&response_type=code&state=${url}`;

  useEffect(() => {
    if (
      formData.client !== "" &&
      formData.booking_title !== "" &&
      formData.id === ""
    ) {
      getServices(formData.client, formData.booking_title);
      getPhotographers(formData.client, formData.booking_title);
      getBookingTitles(formData.client);
    } else if (formData.id !== "") {
      getCollectionServices(formData.serviceIds);
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

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCollectionId(null);
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
    } else if (name === "services") {
      gallery.services = value;
      // setServices as well to have same data as gallery.services
      setServices(gallery.services);
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

  const handleBannerChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          banner: file,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData({
        ...formData,
        banner: "",
      });
    }
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
      banner: null,
      lock_gallery: false,
      notify_client: "",
    });
    setServices([]);
    setPhotographers([]);
    setPreviewImage(null);
    setIsGalleryLocked(false);
    setIsNotifyChecked(false);
    setShowAddGalleryModal(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      if (formData.id === "") {
        const tokens = await getRefreshToken(subdomainDropbox);
        const sharedData = await axios.post(
          "https://api.dropboxapi.com/2/sharing/get_shared_link_metadata",
          { url: formData.dropbox_link },
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        let thePath = "";
        if (sharedData.data.path_lower == undefined) {
          thePath = "";
        } else {
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
        let imageCount = entries.length;
        formDataToSend.append("image_count", imageCount);
      }
      let serviceIds = services && services.map((item) => item.value);
      let photographerIds =
        photographers && photographers.map((item) => item.value);
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
        const closeModalButton = document.getElementById("closeModalButton");
        if (closeModalButton) {
          closeModalButton.click();
        }
      } else {
        toast.error(res);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  const getAllCollectionsData = async () => {
    setLoading(true);
    setItemsLoading(true);
    try {
      const formData = new FormData();
      formData.append("subdomainId", subdomainId);
      if (id !== undefined) {
        formData.append("roleId", 3);
        formData.append("userId", id);
      } else {
        formData.append("roleId", user.role_id);
        formData.append("userId", user.id);
      }

      let allCollections = await getAllCollections(formData);
      if (allCollections && allCollections.success) {
        setCollections(allCollections.data);
      } else {
        setCollections([]);
      }
    } catch (error) {
      toast.error(error);
    }
    setItemsLoading(false);
    setLoading(false);
  };

  const updateImageCount = async (data) => {
    setLoading(true);
    try {
      const tokens = await getRefreshToken(data.dropbox_refresh);
      const sharedData = await axios.post(
        "https://api.dropboxapi.com/2/sharing/get_shared_link_metadata",
        { url: data.dropbox_link },
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let thePath = "";
      if (sharedData.data.path_lower == undefined) {
        thePath = "";
      } else {
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

      const formDataToSend = new FormData();
      formDataToSend.append("id", data.id);
      formDataToSend.append("image_count", entries.length);
      let res = await updateCollection(formDataToSend);
      if (res.success) {
        getAllCollectionsData();
        toast.success("Image count updated!");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getDropboxRefresh = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("id", user.subdomain_id);
    try {
      const response = await getDropboxRefreshToken(formDataToSend);
      if (response.success) {
        if (response.data !== null) {
          setSubdomainDropbox(response.data);
        } else {
          setSubdomainDropbox("");
        }
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionData = async (id) => {
    // setFormData({
    //   ...formData,
    //   id: id,
    // });
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
        ...formData,
        id: collectionData.data.id,
        client: collectionData.data.client_id,
        booking_title: collectionData.data.client_address,
        serviceIds: collectionData.data.package_ids,
        photographerIds: collectionData.data.photographers,
        gallery_title: collectionData.data.name,
        dropbox_link: collectionData.data.dropbox_link,
        vimeo_video_link: collectionData.data.video_link,
        banner: collectionData.data.banner,
      };
      setFormData(initialFormData);

      setIsGalleryLocked(collectionData.data.lock_gallery);
      setIsNotifyChecked(collectionData.data.notify_client);
    } catch (error) {
      console.error("Failed to get ImageTypes:", error.message);
    }
    setLoading(false);
  };

  const getCollectionServices = async (serviceIds) => {
    try {
      let services = await getServicesCollection({
        serviceIds,
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

  const deleteCollectionData = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", collectionIdToDelete);
      let res = await deleteCollection(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        getAllCollectionsData();
        setShowDeleteModal(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChangeGalleryLockStatus = () => {
    setIsGalleryLocked(!isGalleryLocked);
  };

  const handleGalleryLockChange = async (data) => {
    setLoading(true);
    try {
      setIsGalleryLocked(!isGalleryLocked);
      const formDataToSend = new FormData();
      formDataToSend.append("id", data.id);
      formDataToSend.append("lock_gallery", !data.lock_gallery);
      let res = await updateGalleryLock(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        getAllCollectionsData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleGalleryNotify = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", idToNotify);
      const res = await updateGalleryNotify(formDataToSend);
      if (res && res.success) {
        toast.success(res.message);
        await getAllCollectionsData();
      } else {
        toast.error(res ? res.message : "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error in handleGalleryNotify:", error);
      toast.error(`An error occurred. Please try again later.`);
    }
    setShowNotifyModal(false);
    setLoading(false);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      {
        Header: "Banner Image",
        Cell: ({ row }) => (
          <img
            src={
              row.original.banner && `${IMAGE_URL}/${row.original.banner_sm}`
            }
            className="width-100"
            alt="Banner"
          />
        ),
      },
      {
        Header: "Address",
        accessor: "client_address",
        Cell: ({ row }) => (
          <div style={{ minWidth: "12rem" }}>
            <span>{row.original.client_address}</span>
          </div>
        ),
      },
      {
        Header: "Client",
        accessor: "client_name",
        className: roleId === 3 ? "d-none" : "",
      },
      {
        Header: "Services",
        accessor: "packages_name",
      },
      {
        Header: "Invoice",
        accessor: "orderFound",
        Cell: ({ row }) => (
          <div className="text-center">
            {roleId !== 3 && (
              <>
                {row.original.orderFound ? (
                  <ReTooltip title="Invoice Generated." placement="top">
                    <button className="btn btn-sm btn-primary">
                      <span
                        style={{ whiteSpace: "nowrap", fontSize: "0.7rem" }}
                      >
                        Invoice Generated
                      </span>
                    </button>
                  </ReTooltip>
                ) : (
                  <ReTooltip title="Click to Create Invoice." placement="top">
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => {
                        setModalIsOpen(true);
                        setSelectedCollectionId(row.original.id);
                      }}
                    >
                      <span
                        style={{ whiteSpace: "nowrap", fontSize: "0.7rem" }}
                      >
                        Create Invoice
                      </span>
                    </button>
                  </ReTooltip>
                )}
              </>
            )}
          </div>
        ),
      },
      { Header: "Photographers", accessor: "photographers_name" },
      {
        Header: "Unlock/Lock",
        accessor: "lock_gallery",
        Cell: ({ row }) => (
          <ReTooltip title="Click to change lock status." placement="top">
            <Switch
              id="lockGallery"
              checked={row.original.lock_gallery}
              onChange={() => {
                handleGalleryLockChange(row.original);
              }}
              disabled={roleId === 3}
              inputProps={{ "aria-label": "controlled" }}
            />
          </ReTooltip>
        ),
      },
      {
        Header: "Notify",
        accessor: "notify_client",
        Cell: ({ row }) => {
          const { notify_client, orderFound, id } = row.original;
          const handleClick = () => {
            if (notify_client) {
              if (!orderFound) {
                console.log("empty");
              } else {
                setIdToNotify(id);
                setShowNotifyModal(true);
              }
            } else {
              if (orderFound) {
                setIdToNotify(id);
                setShowNotifyModal(true);
              } else {
                setShowNoInvoiceModal(true);
              }
              setSelectedCollectionId(id);
            }
          };

          return notify_client ? (
            <ReTooltip title="Click to change status." placement="top">
              <div
                className={`badge badge-pill badge-light-primary ${
                  roleId === 3 ? "d-none" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={handleClick}
              >
                Notified
              </div>
            </ReTooltip>
          ) : (
            <ReTooltip title="Click to change status." placement="top">
              <div
                className="badge badge-pill"
                style={{
                  backgroundColor: "rgb(255, 116, 140)",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                Pending
              </div>
            </ReTooltip>
          );
        },
      },
      {
        Header: "Image Counts",
        accessor: "image_count",
        Cell: ({ row }) => (
          <div className="text-center">
            <ReTooltip title="Click to update image count." placement="top">
              <div
                className="badge badge-pill badge-light-primary"
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  updateImageCount(row.original);
                }}
              >
                {row.original.image_count} images
              </div>
            </ReTooltip>
          </div>
        ),
      },
      {
        Header: "Created On",
        accessor: "createdAt",
        Cell: ({ row }) => (
          <div className="text-center">
            <div className="badge badge-pill badge-light-primary">
              {row.original.createdAt}
            </div>
            <div>{moment(row.original.created).format("HH:mm A")}</div>
          </div>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            {roleId !== 3 && (
              <>
                <ReTooltip
                  title="Click to edit the collection."
                  placement="top"
                >
                  <button
                    className="btn btn-icon btn-outline-secondary mr-1 mb-1"
                    style={{ padding: "0.5rem" }}
                    onClick={() => getCollectionData(row.original.slug)}
                    data-toggle="modal"
                    data-target="#bootstrap"
                  >
                    <i className="feather white icon-edit"></i>
                  </button>
                </ReTooltip>
                <ReTooltip
                  title="Click to delete the collection."
                  placement="top"
                >
                  <button
                    className="btn btn-icon btn-outline-danger mr-1 mb-1"
                    style={{ padding: "0.5rem" }}
                    onClick={() => {
                      setShowDeleteModal(true);
                      setCollectionIdToDelete(row.original.id);
                    }}
                  >
                    <i className="feather white icon-trash"></i>
                  </button>
                </ReTooltip>
              </>
            )}
            <ReTooltip
              title="Click to copy link to the collection."
              placement="top"
            >
              <button
                className="btn btn-icon btn-outline-warning mr-1 mb-1"
                style={{ padding: "0.5rem" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${url2}view-gallery/${row.original.slug}`
                  );
                  toast.success("Link Copied!");
                }}
              >
                <i className="feather white icon-copy"></i>
              </button>
            </ReTooltip>
          </div>
        ),
      },
    ],
    []
  );

  const filteredColumns = React.useMemo(() => {
    if (roleId === 3) {
      return columns.filter(
        (column) =>
          column.accessor !== "notify_client" &&
          column.accessor !== "orderFound"
      );
    }
    return columns;
  }, [roleId, columns]);

  const data = React.useMemo(() => {
    return collections.map((collection) => {
      return {
        ...collection,
        createdAt: moment(collection.created).format("DD/MM/YYYY"),
      };
    });
  }, [collections]);

  useEffect(() => {
    const fetchData = async () => {
      if (accesstoken !== undefined) {
        let resp = await verifyToken(accesstoken);
        if (!resp.success) {
          toast.error("Session expired, please login again.");
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [accesstoken]);

  const handleCreateInvioce = async () => {
    setLoading(true);
    setShowNoInvoiceModal(false);
    setModalIsOpen(true);
  };

  const handleLoading = () => {
    setLoading(false);
  };

  const handleNotifyClose = () => {
    setShowNotifyModal(false);
  };

  useEffect(() => {
    if (modalIsOpen) {
      setLoading(true);
    }
  }, [modalIsOpen]);

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-7 mb-2">
              <h3 className="content-header-title mb-0">Collection List</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Home</Link>
                    </li>
                    <li className="breadcrumb-item">Collection List</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-5 d-flex justify-content-end align-items-center mb-2">
              <ul className="list-inline mb-0">
                <li>
                  <div className="form-group d-flex">
                    {user.role_id == 5 && (
                      <>
                        {subdomainDropbox === "" && !itemsLoading && (
                          <Link
                            to={`${dropboxAuthUrl}`}
                            className="btn btn-primary mr-1"
                            style={{ paddingTop: "10px" }}
                          >
                            Link Your Dropbox
                          </Link>
                        )}
                      </>
                    )}
                    {user.role_id !== 3 && (
                      <ReTooltip
                        title={
                          subdomainDropbox === ""
                            ? "Dropbox Not Linked"
                            : "Add Collection"
                        }
                        placement="top"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            if (subdomainDropbox === "") {
                              toast.error("Please link your Dropbox first.");
                            } else {
                              e.currentTarget.setAttribute(
                                "data-toggle",
                                "modal"
                              );
                              e.currentTarget.setAttribute(
                                "data-target",
                                "#bootstrap"
                              );
                              setShowAddGalleryModal(true);
                            }
                          }}
                        >
                          New Collection
                        </button>
                      </ReTooltip>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <AddGalleryModal
        message={formData.id ? "Update Collection" : "Add Collection"}
        button={formData.id ? "Update" : "Add"}
        isOpen={showAddGalleryModal}
        formData={formData}
        previewImage={previewImage}
        clients={clients}
        bookingTitles={bookingTitles}
        services={services}
        photographers={photographers}
        isGalleryLocked={isGalleryLocked}
        isNotifyChecked={isNotifyChecked}
        loading={loading}
        handleInputChange={handleInputChange}
        handleBannerChange={handleBannerChange}
        handleGalleryLockChange={handleChangeGalleryLockStatus}
        handleNotifyChange={handleNotifyChange}
        handleSubmit={handleSubmit}
        onClose={resetFormData}
      />
      <>
        {data.length > 0 ? (
          <TableCustom data={data} columns={filteredColumns} />
        ) : (
          <div
            className="app-content content content-wrapper d-flex justify-content-center overflow-hidden"
            style={{
              marginTop: "15rem",
              marginLeft: "15px",
              marginRight: "15px",
            }}
            role="status"
          >
            {itemsLoading ? (
              <div
                className="spinner-border primary overflow-hidden"
                role="status"
              >
                <span className="sr-only"></span>
              </div>
            ) : (
              <p>
                No Collections added yet. Click New Colletion to add new
                collection for your Clients.
              </p>
            )}
          </div>
        )}
      </>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteCollectionData}
        message="Are you sure you want to delete this collection?"
      />
      <EditInvoiceModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        invoiceId={currentInvoiceId}
        handleLoading={handleLoading}
        isEdit={isEditMode}
        collectionId={selectedCollectionId}
        refreshInvoiceList={getAllCollectionsData}
      />
      <NoInvoiceModal
        isOpen={showNoInvoiceModal}
        onClose={() => {
          setShowNoInvoiceModal(false);
          setSelectedCollectionId(null);
        }}
        onConfirm={handleCreateInvioce}
        message="No invoice found for this collection. Create an invoice first."
      />
      <ConfirmModal
        isOpen={showNotifyModal}
        onClose={handleNotifyClose}
        onConfirm={handleGalleryNotify}
        message="Do you wish to notify the client?"
      />
    </>
  );
};

export default Collections;
