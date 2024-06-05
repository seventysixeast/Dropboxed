import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DownloadImageModal from "../components/DownloadImageModal";
import DownloadGalleryModal from "../components/DownloadGalleryModal";
import { getCollection } from "../api/collectionApis";
import { useAuth } from "../context/authContext";
import { getRefreshToken } from "../api/authApis";
import JSZip from "jszip";
import LoadingOverlay from "../components/Loader";
import { toast } from "react-toastify";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import { CustomGallery, Item, DefaultLayout } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import ReactPlayer from "react-player";
import TodoModal from "../components/TodoModal";
import { getAlltasks, createTask } from "../api/todoApis";
import { getClientPhotographers } from "../api/clientApis";
import Masonry from "react-masonry-css";
import { LinearProgress } from "@mui/material";

const REACT_APP_GALLERY_IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
export const ViewGallery = () => {
  const { authData } = useAuth();
  const [dropboxAccess, setDropboxAccess] = useState("");
  const [collectionRefresh, setCollectionRefresh] = useState("");
  const [showDownloadGalleryModal, setDownloadGalleryModal] = useState(false);
  const [showDownloadImageModal, setDownloadImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [downloadOptions, setDownloadOptions] = useState({
    size: "original",
    device: "device",
  });
  const [downloadGalleryPopup, setDownloadGalleryPopup] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const fetchSize = 12;
  const fileList = useRef([]);
  const { id } = useParams();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const [dropboxLink, setDropboxLink] = useState("");
  const [running, setRunning] = useState(false);
  const layoutRef = useRef();
  const [banner, setBanner] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [collection, setCollection] = useState([]);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const imageGalleryRef = useRef(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [taskData, setTaskData] = useState({
    id: "",
    userId: "",
    taskTitle: "",
    assignUser: "",
    taskAssigndate: new Date(),
    taskDescription: "",
    taskTags: [],
    comment: "",
    status: 0,
    isFavourite: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [taskAuthor, setTaskAuthor] = useState();
  const [tasks, setTasks] = useState([]);
  const toggleNewTaskModal = () => {
    setIsNewTaskModalOpen(!isNewTaskModalOpen);
  };
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [folderPath, setFolderPath] = useState("");
  const currentUrl = window.location.href;

  const url2 = new URL(currentUrl);

  const [showPopup, setShowPopup] = useState(false);

  const openSharePopup = () => {
    setShowPopup(true);
  };

  const closeSharePopup = () => {
    setShowPopup(false);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        `${url2}`
      )}`,
      "ShareFacebook",
      "width=600,height=400"
    );
    closeSharePopup();
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(`${url2}`)}`,
      "ShareTwitter",
      "width=600,height=400"
    );
    closeSharePopup();
  };

  const getTasks = async () => {
    if (authData.user === null) return;
    const formData = new FormData();
    formData.append("subdomain_id", authData.user.subdomain_id);
    formData.append("role_id", authData.user.role_id);
    formData.append("user_id", authData.user.role_id);
    const response = await getAlltasks(formData);
    if (response.success) {
      setTasks(response.tasks);
      setTags(response.tags);
    } else {
      console.error(response.data);
    }
  };

  const handleTextChange = (value) => {
    setTaskData({
      ...taskData,
      taskDescription: value,
    });
  };

  const getClients = async () => {
    if (authData.user === null) return;
    const formData = new FormData();
    formData.append("subdomain_id", authData.user.subdomain_id);
    const response = await getClientPhotographers(formData);
    if (response.success) {
      if (authData.user.role_id !== 3) {
        const activeClients = response.data.filter(
          (client) => client.status === "Active"
        );
        console.log(activeClients);
        setClients(activeClients);
      } else {
        const activeClients = response.data.filter(
          (client) => client.status === "Active"
        );
        const filteredClients = activeClients.filter(
          (client) => client.role_id === 2 || client.role_id === 5
        );

        setClients(filteredClients);
      }
    } else {
      toast.error("Failed to get clients!");
    }
  };

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };

  const handleSubmit = async () => {
    if (authData.user === null) return;
    const formData = new FormData();

    if (taskData.taskTitle === "") {
      toast.error("Task title is required!");
      return;
    }

    if (selectedClient.value === undefined) {
      toast.error("Assigned user is required!");
      return;
    }

    const formattedTags = selectedTags.map((tag) => tag.value).join(",");
    formData.append("id", taskData.id);
    formData.append("user_id", authData.user.id);
    formData.append("task_tags", formattedTags);
    formData.append("subdomain_id", authData.user.subdomain_id);
    formData.append("role_id", authData.user.role_id);
    formData.append("task_title", taskData.taskTitle);
    formData.append("assign_user", selectedClient.value);
    formData.append("task_assigndate", taskData.taskAssigndate);
    formData.append("task_description", taskData.taskDescription);
    formData.append("comments", taskData.comment);
    formData.append("status", taskData.status);
    formData.append("is_favourite", taskData.isFavourite);

    try {
      const response = await createTask(formData);
      if (response.success) {
        if (taskData.id === "") {
          toast.success("Task created successfully!");
        } else {
          toast.success("Task updated successfully!");
        }
        setTaskData({
          id: "",
          userId: "",
          taskTitle: "",
          assignUser: "",
          taskAssigndate: new Date(),
          taskDescription: "",
          taskTags: [],
          comment: "",
          status: 0,
          isFavourite: 0,
        });
        setSelectedClient([]);
        setSelectedTags([]);
        setComments([]);
        setTaskAuthor();
        setIsNewTaskModalOpen(false);
      } else {
        toast.error("Failed to create task!");
      }
    } catch (error) {
      toast.error("Failed to create task!");
      console.error("Error creating task:", error);
    }
    getTasks();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (fileList.current && fileList.current.length === 0) {
      if (!running) {
        fetchCollection();
      }
    }

    setTimeout(() => {
      document.body.classList.remove(
        "vertical-layout",
        "vertical-menu-modern",
        "2-columns",
        "fixed-navbar",
        "menu-expanded"
      );
    }, 0);

    if (tasks.length === 0) {
      getTasks();
      getClients();
    }
  }, []);

  const fetchCollection = async () => {
    setRunning(true);
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("slug", id);
    let res = await getCollection(formDataToSend);
    if (res.success) {
      setCollectionRefresh(res.data.dropbox_refresh);
      setDropboxLink(res.data.dropbox_link);
      fetchFileList(res.data.dropbox_refresh, res.data.dropbox_link);
      setVideoLink(res.data.video_link);
      setBanner(res.data.banner);
      setCollection(res.data);
    } else {
      console.log(res.data);
    }
    setRunning(false);
    setLoading(false);
    setShowAnimation(true);
  };

  const fetchFileList = async (data, link) => {
    try {
      const tokens = await getRefreshToken(data);
      setDropboxAccess(tokens.access_token);
      const sharedData = await axios.post(
        "https://api.dropboxapi.com/2/sharing/get_shared_link_metadata",
        { url: link },
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (sharedData.data.path_lower === undefined) {
        setFolderPath("");
      } else {
        setFolderPath(sharedData.data.path_lower);
      }
      let thePath = "";

      if (sharedData.data.path_lower === undefined) {
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

      const fileEntries = entries.filter((entry) => entry[".tag"] === "file");
      fileList.current = fileEntries;
      fetchImages(data, tokens);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  const fetchImages = async (data, tokens) => {
    setLoader(true);
    try {
      const totalFiles = fileList.current.length;
      const startIndex = (page.current - 1) * fetchSize;
      const endIndex = Math.min(startIndex + fetchSize, totalFiles);

      if (startIndex >= totalFiles) {
        return;
      }

      const batchEntries = fileList.current.slice(startIndex, endIndex);
      const batchUrls = await fetchBatchThumbnails(batchEntries, data, tokens);

      setImageUrls((prevUrls) => [...prevUrls, ...batchUrls]);

      page.current++;

      if (endIndex < totalFiles) {
        fetchImages(data, tokens);
      } else {
        setLoader(false);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  const fetchBatchThumbnails = async (entries, data, tokens) => {
    const urls = [];
    try {
      const response = await axios.post(
        "https://content.dropboxapi.com/2/files/get_thumbnail_batch",
        {
          entries: entries.map((entry) => ({
            path: entry.path_lower,
            format: "jpeg",
            mode: "strict",
            quality: "quality_80",
            size: "w1024h768",
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "Content-Type": "application/json",
          },
          responseType: "json",
        }
      );

      await Promise.all(
        response.data.entries.map(async (entry) => {
          const url = "data:image/jpeg;base64," + entry.thumbnail;
          const image = new Image();

          return new Promise((resolve) => {
            image.onload = () => {
              const width = image.width;
              const height = image.height;
              const path_display = entry.metadata.path_display;
              const imgObj = {
                url,
                path_display,
                width,
                height,
              };
              urls.push(imgObj);
              resolve();
            };

            image.src = url;
          });
        })
      );
    } catch (error) {
      console.error("Error fetching batch thumbnails:", error);
    }
    return urls;
  };

  const handleDownload = async () => {
    setDownloadGalleryModal(false);
    setDownloadGalleryPopup(true);
    setLoading(true);
    const tokens = await getRefreshToken(collectionRefresh);
    if (downloadOptions.device === "device") {
      try {
        if (downloadOptions.size === "original") {
          const {
            data: { link },
          } = await axios.post(
            "https://api.dropboxapi.com/2/files/get_temporary_link",
            { path: selectedImageUrl },
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const response = await axios.get(link, {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          });
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);
          let adjustedBlob = blob;
          let adjustedUrl = url;
          adjustedUrl = window.URL.createObjectURL(adjustedBlob);
          const linkElement = document.createElement("a");
          linkElement.href = adjustedUrl;
          linkElement.setAttribute("download", "downloaded_image.jpg");
          document.body.appendChild(linkElement);
          linkElement.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(linkElement);
          setDownloadImageModal(false);
        } else {
          const response = await axios.post(
            "https://content.dropboxapi.com/2/files/get_thumbnail_batch",
            {
              entries: [
                {
                  path: selectedImageUrl,
                  format: "jpeg",
                  mode: "strict",
                  quality: "quality_90",
                  size: "w2048h1536",
                },
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                "Content-Type": "application/json",
              },
              responseType: "json",
            }
          );
          const imageData = response.data.entries[0].thumbnail;

          const link = document.createElement("a");
          link.href = `data:image/jpeg;base64,${imageData}`;
          link.download = "downloaded_image.jpg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error("Error downloading image from Dropbox:", error);
      }
    } else if (downloadOptions.device === "dropbox") {
      const tokens = await getRefreshToken(collectionRefresh);
      setDropboxAccess(tokens.access_token);
      const sharedLinkResponse = await fetch(
        `https://api.dropboxapi.com/2/sharing/get_shared_link_metadata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access_token}`,
          },
          body: JSON.stringify({
            url: dropboxLink,
          }),
        }
      );
      const sharedLinkData = await sharedLinkResponse.json();
      const folderPath = sharedLinkData.path_lower;

      const usertokens = await getRefreshToken(authData.user.dropbox_refresh);

      const copyResponse = await fetch(
        `https://api.dropboxapi.com/2/files/copy_v2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usertokens.access_token}`,
          },
          body: JSON.stringify({
            from_path: folderPath,
            to_path: `${folderPath}_${Math.floor(Math.random() * 1000)}`,
          }),
        }
      );

      if (copyResponse.ok) {
        toast.success(
          `Folder copied successfully to ${folderPath}_${Math.floor(
            Math.random() * 1000
          )}`
        );
      } else {
        const errorData = await copyResponse.json();
        toast.error("Folder already exists.");
      }
    }
    setDownloadOptions({ device: "device", size: "original" });
    setDownloadImageModal(false);
    setLoading(false);
    setDownloadGalleryPopup(false);
  };

  const downloadFolderAsZip = async (accessToken) => {
    setDownloadGalleryModal(false);
    setDownloadGalleryPopup(true);
    const apiUrl = "https://content.dropboxapi.com/2/files/download_zip";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Dropbox-API-Arg": JSON.stringify({
            path: folderPath,
          }),
          "Content-Type": "application/octet-stream",
        },
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Studiio.zip";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Files downloaded successfully.");
      setDownloadGalleryModal(false);
      setDownloadOptions({ device: "device", size: "original" });
      setRunning(false);
      setLoading(false);
    } catch (error) {
      console.error("Error downloading folder as zip:", error);
    }
    setLoading(false);
    setDownloadOptions({ device: "device", size: "original" });
    setRunning(false);
    setDownloadGalleryModal(false);
    setLoading(false);
    setDownloadGalleryPopup(false);
  };

  const handleAllDownload = async () => {
    setDownloadGalleryModal(false);
    setDownloadGalleryPopup(true);

    if (authData.user === null) {
      toast.error("Please login first.");
      setLoading(false);
      return;
    }

    try {
      const tokens = await getRefreshToken(collectionRefresh);
      setDropboxAccess(tokens.access_token);
      const zip = new JSZip();

      if (downloadOptions.device === "device") {
        for (const imageData of imageUrls) {
          let imageBlob;

          if (downloadOptions.size === "original") {
            await downloadFolderAsZip(dropboxAccess);
            return;
          } else {
            const response = await axios.post(
              "https://content.dropboxapi.com/2/files/get_thumbnail_batch",
              {
                entries: [
                  {
                    path: imageData.path_display,
                    format: "jpeg",
                    mode: "strict",
                    quality: "quality_80",
                    size: "w2048h1536",
                  },
                ],
              },
              {
                headers: {
                  Authorization: `Bearer ${tokens.access_token}`,
                  "Content-Type": "application/json",
                },
                responseType: "json",
              }
            );

            const thumbnailData = response.data.entries[0].thumbnail;
            const binaryString = atob(thumbnailData);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);
            for (let i = 0; i < binaryLen; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }

            imageBlob = new Blob([bytes], { type: "image/jpeg" });
          }

          zip.file(imageData.path_display.split("/").pop(), imageBlob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = window.URL.createObjectURL(zipBlob);
        const linkElement = document.createElement("a");
        linkElement.href = zipUrl;
        linkElement.setAttribute("download", "web_size.zip");
        document.body.appendChild(linkElement);
        linkElement.click();
        window.URL.revokeObjectURL(zipUrl);
        document.body.removeChild(linkElement);
        setDownloadGalleryModal(false);
      } else if (downloadOptions.device === "dropbox") {
        const sharedLinkResponse = await fetch(
          `https://api.dropboxapi.com/2/sharing/get_shared_link_metadata`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.access_token}`,
            },
            body: JSON.stringify({
              url: dropboxLink,
            }),
          }
        );

        if (!sharedLinkResponse.ok) {
          throw new Error("Error fetching shared link metadata.");
        }

        const sharedLinkData = await sharedLinkResponse.json();
        const folderPath = sharedLinkData.path_lower;
        const usertokens = await getRefreshToken(authData.user.dropbox_refresh);
        const newFolderPath = `${folderPath}_${Math.floor(
          Math.random() * 1000
        )}`;

        const copyResponse = await fetch(
          `https://api.dropboxapi.com/2/files/copy_v2`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${usertokens.access_token}`,
            },
            body: JSON.stringify({
              from_path: folderPath,
              to_path: newFolderPath,
            }),
          }
        );

        if (copyResponse.ok) {
          toast.success(`Files copied successfully to ${newFolderPath}`);
        } else {
          const errorData = await copyResponse.json();
          if (errorData.error_summary === "to/conflict/folder/") {
            toast.error("Files already exist.");
          } else {
            toast.error(`Error copying files: ${errorData.error_summary}`);
          }
        }
      }
    } catch (error) {
      console.error("Error downloading images from Dropbox:", error);
      toast.error("Error occurred during download.");
    } finally {
      setDownloadOptions({ device: "device", size: "original" });
      setDownloadGalleryModal(false);
      setLoading(false);
      setDownloadGalleryPopup(false);
    }
  };

  const customOptions = {
    ui: {
      shareEl: false,
    },
  };

  useEffect(() => {
    const measureScrollbar = () => {
      const scrollDiv = document.createElement("div");
      scrollDiv.style.width = "100px";
      scrollDiv.style.height = "100px";
      scrollDiv.style.overflow = "scroll";
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      document.body.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      setScrollbarWidth(scrollbarWidth);
    };

    measureScrollbar();

    const handleResize = () => {
      measureScrollbar();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollToGallery = () => {
    if (imageGalleryRef.current) {
      const offsetTop = imageGalleryRef.current.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  const handleShareImage = async (image) => {
    const tokens = await getRefreshToken(collectionRefresh);
    setDropboxAccess(tokens.access_token);

    let sharedLinkData;

    // Check if the shared link already exists
    const existingLinkResponse = await fetch(
      "https://api.dropboxapi.com/2/sharing/list_shared_links",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access_token}`,
        },
        body: JSON.stringify({
          path: image.path_display,
        }),
      }
    );
    const existingLinkData = await existingLinkResponse.json();

    if (existingLinkData.links.length > 0) {
      sharedLinkData = existingLinkData.links[0];
    } else {
      const sharedLinkResponse = await fetch(
        "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access_token}`,
          },
          body: JSON.stringify({
            path: image.path_display,
            settings: {
              requested_visibility: "public",
            },
          }),
        }
      );

      sharedLinkData = await sharedLinkResponse.json();
    }

    const link = sharedLinkData.url || sharedLinkData.links[0].url;
    setTaskData({
      ...taskData,
      taskDescription: `<p>Image Name: ${image.path_display}</p>
      <p>Image Link: <a href=${link} rel="noopener noreferrer" target="_blank">Image Link</a></p>`,
    });
  };

  return (
    <>
      {downloadGalleryPopup && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "rgb(222, 230, 238)" }}
              >
                <h4 className="modal-title">Downloading your images...</h4>
              </div>
              <div className="modal-body">
                <h4 className="text-center" style={{ marginTop: "1rem" }}>
                  It may take a few minutes
                </h4>
                <LinearProgress
                  className="w-50"
                  style={{
                    marginLeft: "8.5rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "rgb(222, 230, 238)" }}
              >
                <div></div>
                <h4 className="modal-title mr-3">Share Collection:</h4>

                <button
                  type="button"
                  className="close"
                  onClick={closeSharePopup}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: "0.9rem" }}>{url2.href}</p>
                <button
                  className="btn btn-white mr-0"
                  style={{ marginLeft: "11.5rem" }}
                  onClick={shareOnFacebook}
                >
                  <i
                    className="feather icon-facebook"
                    style={{
                      color: "#3b5998",
                      border: "1px solid #3b5998",
                      padding: "1rem ",
                    }}
                  ></i>
                </button>
                <button className="btn btn-white" onClick={shareOnTwitter}>
                  <i
                    className="feather icon-twitter"
                    style={{
                      color: "#1da1f2",
                      border: "1px solid #1da1f2",
                      padding: "1rem ",
                    }}
                  ></i>
                </button>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeSharePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <LoadingOverlay loading={loading} />
      <div className="todo-application">
        <div className="app-content content" style={{ overflow: "hidden" }}>
          <div className="sidebar-left ">
            <div className="sidebar">
              <TodoModal
                isNewTaskModalOpen={isNewTaskModalOpen}
                toggleNewTaskModal={toggleNewTaskModal}
                modalRef={modalRef}
                taskData={taskData}
                setTaskData={setTaskData}
                tags={tags}
                setTags={setTags}
                clients={clients}
                setClients={setClients}
                selectedClient={selectedClient}
                handleClientChange={handleClientChange}
                selectedTags={selectedTags}
                handleSelectedTags={setSelectedTags}
                taskAuthor={taskAuthor}
                setTaskAuthor={setTaskAuthor}
                comments={comments}
                setComments={setComments}
                handleSubmit={handleSubmit}
                toggleModal={toggleModal}
                handleTextChange={handleTextChange}
              />
            </div>
          </div>
          <div className="" style={{ width: "100%" }}>
            <div className="content-overlay"></div>
            <section id="gallery-banner" style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  maxWidth: `calc(100vw - ${scrollbarWidth}px)`,
                  objectFit: "cover",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ position: "relative" }} className="cover-overlay">
                  <img
                    className="gallery-cover"
                    src={
                      banner !== null && banner !== ""
                        ? `${REACT_APP_GALLERY_IMAGE_URL}/${banner}`
                        : ""
                    }
                    style={{
                      width: `calc(100vw - ${scrollbarWidth}px)`,
                      objectFit: "cover",
                      imageRendering: "auto",
                    }}
                  />
                </div>
              </div>
              <div className="banner-detail">
                <h1 className="banner-collection-name mb-1">
                  {collection.name}
                </h1>
                <button
                  onClick={handleScrollToGallery}
                  className={`collection-cover__scroll-button js-scroll-past-cover button-reset ${
                    showAnimation ? "slide-down" : ""
                  }`}
                  style={{ animationDelay: showAnimation ? "0.5s" : "0s" }}
                >
                  View Gallery
                </button>
              </div>
            </section>
            <div
              id="sticky-bar"
              ref={imageGalleryRef}
              className="py-2 px-1"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: showAnimation ? 1 : 0,
                transition: "opacity 0.5s ease",
                position: "sticky",
                top: 0,
                zIndex: 5,
                backgroundColor: "white",
              }}
            >
              <div className="">
                <h1 className="text-class-h1">{collection.name}</h1>
              </div>
              <div>
                {authData.user !== null && (
                  <div className="d-flex">
                    <p className="text-class-h1 mr-1">
                      {collection.image_count} Images
                    </p>
                    <span
                      className="text-right feather icon-download black"
                      style={{ cursor: "pointer" }}
                      title="Download"
                      onClick={() => {
                        if (authData.user.role_id !== 3) {
                          setDownloadGalleryModal(true);
                        } else if (
                          (authData.user.role_id =
                            3 && collection.lock_gallery === true)
                        ) {
                          toast.error(
                            "Gallery is locked! Please contact admin."
                          );
                        }
                      }}
                    ></span>
                  </div>
                )}
              </div>
            </div>
            <section id="video-player" style={{ position: "relative" }}>
              {videoLink !== "" && (
                <div
                  className="col-md-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <ReactPlayer
                    url={videoLink}
                    controls
                    width={`calc(100vw - ${scrollbarWidth}px)`}
                    height={`calc(70vh - ${scrollbarWidth}px)`}
                    playing={true}
                    loop={true}
                    muted={false}
                    className="react-player"
                  />
                </div>
              )}
            </section>

            {isNewTaskModalOpen ? (
              <div className="app-content-overlay show overlay-working"></div>
            ) : (
              <div className="app-content-overlay"></div>
            )}
            <section id="image-gallery" className="image-gallery">
              <div className="card-content collapse show">
                <div className="card-body my-gallery">
                  <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
                    <div className="row">
                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {imageUrls.map((image, index) => (
                          <Item
                            key={index}
                            original={image.url}
                            thumbnail={image.url}
                            width={image.width}
                            height={image.height}
                          >
                            {({ ref, open }) => (
                              <figure
                                ref={ref}
                                style={{
                                  marginTop: "4px",
                                  marginBottom: "4px",
                                }}
                                onClick={open}
                              >
                                <div
                                  className="image-container"
                                  itemProp=""
                                  onMouseEnter={() => setOverlayVisible(true)}
                                  onMouseLeave={() => setOverlayVisible(true)}
                                >
                                  <img
                                    className=""
                                    src={image.url}
                                    alt=""
                                    width={"100%"}
                                    height={"auto"}
                                  />
                                  {overlayVisible && (
                                    <div className="overlay">
                                      <p className="icon-links">
                                        {authData.user !== null && (
                                          <>
                                            <a>
                                              <span
                                                className="feather icon-share-2"
                                                style={{ marginRight: "8px" }}
                                                title="Share"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  openSharePopup();
                                                }}
                                              ></span>
                                            </a>
                                            <a>
                                              <span
                                                className="feather icon-edit"
                                                style={{ marginRight: "8px" }}
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  toggleNewTaskModal();
                                                  handleShareImage(image);
                                                }}
                                              ></span>
                                            </a>
                                            <a>
                                              <span
                                                className="text-right feather icon-download"
                                                title="Download"
                                                onClick={(event) => {
                                                  event.stopPropagation();
                                                  console.log(
                                                    collection.lock_gallery
                                                  );

                                                  setSelectedImageUrl(
                                                    image.path_display
                                                  );
                                                  if (
                                                    authData.user.role_id !== 3
                                                  ) {
                                                    setDownloadImageModal(true);
                                                  } else if (
                                                    collection.lock_gallery
                                                  ) {
                                                    toast.error(
                                                      "Gallery is locked! Please contact admin."
                                                    );
                                                  } else {
                                                    setDownloadImageModal(true);
                                                  }
                                                }}
                                              ></span>
                                            </a>
                                          </>
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </figure>
                            )}
                          </Item>
                        ))}
                      </Masonry>
                    </div>
                  </CustomGallery>
                  {loader && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "10rem" }}
                    >
                      <div
                        className="text-center"
                        style={{
                          border: "8px solid #f3f3f3",
                          borderTop: "8px solid #3498db",
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          animation: "spin 2s linear infinite",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <DefaultLayout
              shareButton={true}
              fullscreenButton={false}
              zoomButton={false}
              ref={layoutRef}
            />
            {authData !== null && (
              <>
                <DownloadGalleryModal
                  isOpen={showDownloadGalleryModal}
                  onClose={() => setDownloadGalleryModal(false)}
                  onConfirm={handleAllDownload}
                  downloadOptions={downloadOptions}
                  setDownloadOptions={setDownloadOptions}
                />

                <DownloadImageModal
                  isOpen={showDownloadImageModal}
                  onClose={() => setDownloadImageModal(false)}
                  onConfirm={handleDownload}
                  downloadOptions={downloadOptions}
                  setDownloadOptions={setDownloadOptions}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
