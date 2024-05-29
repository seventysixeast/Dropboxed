import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
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
  deleteCollection,
  getDropboxRefreshToken,
  updateGalleryLock,
  updateCollection,
  updateGalleryNotify,
} from "../api/collectionApis";
import { getRefreshToken, verifyToken } from "../api/authApis";
import { toast } from "react-toastify";
import AddGalleryModal from "./addGalleryModal";
import { useAuth } from "../context/authContext";
import TableCustom from "./Table";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import Table2 from "./Table2";
import moment from "moment";
import ReTooltip from "./Tooltip";
import LoadingOverlay from "./Loader";

const IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_REDIRECT = process.env.REACT_APP_DROPBOX_REDIRECT;

const CollectionTable = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id;
  const userId = user.id;
  const roleId = user.role_id;
  const accessToken = authData.token;
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [bookingTitles, setBookingTitles] = useState([]);
  const [services, setServices] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [isGalleryLocked, setIsGalleryLocked] = useState(false);
  const [isNotifyChecked, setIsNotifyChecked] = useState(false);
  const [showAddGalleryModal2, setShowAddGalleryModal2] = useState(false);
  const [collections, setCollections] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [collectionIdToDelete, setCollectionIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subdomainDropbox, setSubdomainDropbox] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(false);
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
  });

  useEffect(() => {
    getClients();
    getAllCollectionsData();
    getDropboxRefresh();
  }, []);

  const currentUrl = window.location.href;
  const url2 = new URL(currentUrl);
  url2.pathname = url2.pathname.replace("/dashboard", "");

  const url = new URL(currentUrl);

  url.searchParams.set("userId", userId);
  const scopes = encodeURIComponent(
    "account_info.read files.metadata.write files.metadata.read files.content.write files.content.read sharing.write sharing.read file_requests.write file_requests.read"
  );

  const dropboxAuthUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${REACT_APP_DROPBOX_CLIENT}&redirect_uri=${REACT_APP_DROPBOX_REDIRECT}&token_access_type=offline&scope=${scopes}&response_type=code&state=${url}`;

  useEffect(() => {
    verifyToken(accessToken);
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
    setShowAddGalleryModal2(false);
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
        getAllCollectionsData();
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
    setItemsLoading(true);
    try {
      const formData = new FormData();
      formData.append("subdomainId", subdomainId);
      formData.append("roleId", user.role_id);
      formData.append("userId", user.id);
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
  };

  const updateImageCount = async (data) => {
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
        setSubdomainDropbox(response.data);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionData = async (id) => {
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

  const deleteCollectionData = async () => {
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

  const handleGalleryNotify = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);

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
  };

  const handleGalleryLockChange = async (data) => {
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

  const columns = React.useMemo(() => {
    const columns = [
      { Header: "Id", accessor: "id" },
      {
        Header: "Banner Image",
        Cell: ({ row }) => (
          <img
            src={row.original.banner && `${IMAGE_URL}/${row.original.banner}`}
            className="width-100"
            alt="Banner"
          />
        ),
      },
      { Header: "Gallery Title", accessor: "name" },
      { Header: "Address", accessor: "client_address" },
      { Header: "Client", accessor: "client_name" },
      { Header: "Services", accessor: "packages_name" },
      { Header: "Photographers", accessor: "photographers_name" },
      {
        Header: "Unlock/Lock",
        Cell: ({ row }) => (
          <ReTooltip title="Click to change lock status." placement="top">
            <Switch
              id="lockGallery"
              checked={row.original.lock_gallery}
              onChange={() => handleGalleryLockChange(row.original)}
              inputProps={{ "aria-label": "controlled" }}
              disabled={roleId === 3}
            />
          </ReTooltip>
        ),
      },
      {
        Header: "Notify",
        Cell: ({ row }) =>
          row.original.notify_client ? (
            <ReTooltip title="Click to change status." placement="top">
              <div
                className="badge badge-pill badge-light-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleGalleryNotify(row.original.id);
                }}
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
                onClick={() => {
                  handleGalleryNotify(row.original.id, collections);
                }}
              >
                Pending
              </div>
            </ReTooltip>
          ),
      },
      {
        Header: "Image Counts",
        Cell: ({ row }) => (
          <div className="btnsrow text-center">
            <ReTooltip title="Click to update image count." placement="top">
              <div
                className="badge badge-pill badge-light-primary"
                style={{ cursor: "pointer" }}
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
        Cell: ({ row }) => (
          <div className="btnsrow text-center">
            <div className="badge badge-pill badge-light-primary">
              {moment(row.original.created).format("DD/MM/YYYY")}
            </div>
            <div>{moment(row.original.created).format("HH:mm A")}</div>
          </div>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="btnsrow">
            <ReTooltip title="Click to edit the collection." placement="top">
              <button
                className={`btn btn-icon btn-outline-secondary mr-1 mb-1 ${
                  roleId === 3 ? "d-none" : ""
                }`}
                onClick={() => getCollectionData(row.original.slug)}
                data-toggle="modal"
                data-target="#bootstrap"
              >
                <i className="feather white icon-edit"></i>
              </button>
            </ReTooltip>
            <ReTooltip title="Click to delete the collection." placement="top">
              <button
                className="btn btn-icon btn-outline-danger mr-1 mb-1"
                onClick={() => {
                  setShowDeleteModal(true);
                  setCollectionIdToDelete(row.original.id);
                }}
              >
                <i className="feather white icon-trash"></i>
              </button>
            </ReTooltip>
            <ReTooltip
              title="Click to copy link to the collection."
              placement="top"
            >
              <button
                className={`btn btn-icon btn-outline-warning mr-1 mb-1 ${
                  roleId === 3 ? "d-none" : ""
                }`}
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
    ];

    if (roleId === 3) {
      return columns.filter(
        (column) => column.Header !== "Notify" && column.Header !== "Client"
      );
    }

    return columns;
  }, [roleId]);

  const data = React.useMemo(() => collections, [collections]);

  return (
    <>
      {itemsLoading ? <LoadingOverlay loading={itemsLoading} /> : null}
      <AddGalleryModal
        message={formData.id ? "Update Collection" : "Add Collection"}
        button={formData.id ? "Update" : "Add"}
        isOpen={showAddGalleryModal2}
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
          <Table2 data={data} columns={columns} />
        ) : (
          <div
            className="col-12 d-flex justify-content-center "
            style={{ height: "100vh" }}
          >
            <p>No collections found. Add a collection.</p>
          </div>
        )}
      </>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteCollectionData}
        message="Are you sure you want to delete this collection?"
      />
    </>
  );
};

export default CollectionTable;
