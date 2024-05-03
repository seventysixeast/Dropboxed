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

const REACT_APP_GALLERY_IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
export const ViewGallery = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id;
  const userId = user.id;
  const [dropboxAccess, setDropboxAccess] = useState("");
  const dropboxRefresh = user.dropbox_refresh;
  const [collectionRefresh, setCollectionRefresh] = useState("");
  const [showDownloadGalleryModal, setDownloadGalleryModal] = useState(false);
  const [showDownloadImageModal, setDownloadImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [downloadOptions, setDownloadOptions] = useState({
    size: "original",
    device: "device",
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  const fetchSize = 16;
  const fileList = useRef([]);
  const { id } = useParams();
  const [dropboxLink, setDropboxLink] = useState("");
  const [running, setRunning] = useState(false);
  const layoutRef = useRef();
  const [banner, setBanner] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [collection, setCollection] = useState([]);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const imageGalleryRef = useRef(null);

  useEffect(() => {
    if (fileList.current && fileList.current.length === 0) {
      if (!running) {
        fetchCollection();
      }
    }

    document.body.classList.remove(
      "vertical-layout",
      "vertical-menu-modern",
      "2-columns",
      "fixed-navbar",
      "menu-expanded"
    );
  }, []);

  const fetchCollection = async () => {
    setRunning(true);
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    let res = await getCollection(formDataToSend);
    if (res.success) {
      console.log("res", res);
      setCollectionRefresh(res.data.dropbox_refresh);
      setDropboxLink(res.data.dropbox_link);
      fetchFileList(res.data.dropbox_refresh, res.data.dropbox_link);
      setVideoLink(res.data.video_link);
      setBanner(res.data.banner);
      setCollection(res.data);
    } else {
      toast.error("Failed to get collection...");
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
      const listResponse = await axios.post(
        "https://api.dropboxapi.com/2/files/list_folder",
        { path: sharedData.data.path_lower },
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
      fetchImages(data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  const fetchImages = async (data) => {
    try {
      const totalFiles = fileList.current.length;
      const startIndex = (page.current - 1) * fetchSize;
      const endIndex = Math.min(startIndex + fetchSize, totalFiles);

      if (startIndex >= totalFiles) {
        setHasMore(false);
        return;
      }

      const batchEntries = fileList.current.slice(startIndex, endIndex);
      const batchUrls = await fetchBatchThumbnails(batchEntries, data);
      setImageUrls((prevUrls) => [...prevUrls, ...batchUrls]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  const fetchBatchThumbnails = async (entries, data) => {
    const tokens = await getRefreshToken(data);
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
      for (const entry of response.data.entries) {
        const url = "data:image/jpeg;base64," + entry.thumbnail;
        const path_display = entry.metadata.path_display;
        const imgObj = {
          url,
          path_display,
        };
        urls.push(imgObj);
      }
    } catch (error) {
      console.error("Error fetching batch thumbnails:", error);
    }
    return urls;
  };

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      loadMoreThumbnails();
    }
  };

  const loadMoreThumbnails = () => {
    if (!loading && hasMore) {
      page.current += 1;
      fetchImages();
    }
  };

  useEffect(() => {
    if (fileList.current.length > imageUrls.length) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleDownload = async () => {
    const tokens = await getRefreshToken(collectionRefresh);

    if (downloadOptions.device == "device") {
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
    } else if (downloadOptions.device == "dropbox") {
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

      const usertokens = await getRefreshToken(dropboxRefresh);

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
            to_path: folderPath,
          }),
        }
      );

      if (copyResponse.ok) {
        toast.success("Folder copied successfully.");
      } else {
        const errorData = await copyResponse.json();
        toast.error(`Error copying folder: ${errorData.error_summary}`);
      }
    }
    setDownloadOptions({ device: "device", size: "original" });
  };

  const handleAllDownload = async () => {
    const tokens = await getRefreshToken(collectionRefresh);
    setDropboxAccess(tokens.access_token);
    if (downloadOptions.device == "device") {
      try {
        const zip = new JSZip();
        for (const imageData of imageUrls) {
          let imageBlob;
          if (downloadOptions.size === "original") {
            const {
              data: { link },
            } = await axios.post(
              "https://api.dropboxapi.com/2/files/get_temporary_link",
              { path: imageData.path_display },
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
            imageBlob = response.data;
          } else {
            const response = await axios.post(
              "https://content.dropboxapi.com/2/files/get_thumbnail_batch",
              {
                entries: [
                  {
                    path: imageData.path_display,
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
                responseType: "arraybuffer",
              }
            );
            imageBlob = new Blob([response.data], { type: "image/jpeg" });
          }
          zip.file(imageData.path_display.split("/").pop(), imageBlob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = window.URL.createObjectURL(zipBlob);
        const linkElement = document.createElement("a");
        linkElement.href = zipUrl;
        linkElement.setAttribute("download", "downloaded_images.zip");
        document.body.appendChild(linkElement);
        linkElement.click();
        window.URL.revokeObjectURL(zipUrl);
        document.body.removeChild(linkElement);
        setDownloadGalleryModal(false);
      } catch (error) {
        console.error("Error downloading images from Dropbox:", error);
      }
    } else if (downloadOptions.device == "dropbox") {
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

      const usertokens = await getRefreshToken(dropboxRefresh);

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
            to_path: "folderPath",
          }),
        }
      );

      if (copyResponse.ok) {
        toast.success("Folder copied successfully.");
      } else {
        const errorData = await copyResponse.json();
        if ((errorData.error_summary = "to/conflict/folder/.")) {
          toast.error(`Error copying folder: ${errorData.error_summary}`);
        }
      }
    }
    setDownloadOptions({ device: "device", size: "original" });
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
  

  return (
    <>
      <LoadingOverlay loading={loading} />
      <section id="gallery-banner" style={{ position: "relative" }}>
        <div
          style={{
            position: "relative",
            maxWidth: `calc(100vw - ${scrollbarWidth}px)`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              className="gallery-cover"
              src={
                banner !== null &&
                banner !== "" &&
                `${REACT_APP_GALLERY_IMAGE_URL}/${banner}`
              }
              style={{ width: `calc(100vw - ${scrollbarWidth}px)`, height: "auto" }}
            />
            <div
              id="cover-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            ></div>
          </div>
        </div>
        <div
          className="banner-detail"
          style={{
            maxWidth: `calc(100vw - ${scrollbarWidth}px)`,
            position: "absolute",
            zIndex: 2,
            textAlign: "center",
            marginTop: showAnimation ? "-50px" : "0px",
            transition: "margin-top 0.5s ease",
          }}
        >
          <h1 className="banner-collection-name mb-3">{collection.name}</h1>
          <button
            onClick={handleScrollToGallery}
            className={`collection-cover__scroll-button js-scroll-past-cover button-reset ${showAnimation ? "slide-down" : ""
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
          zIndex: 999,
          backgroundColor: "white",
        }}
      >
        <div className="">
          <h1 className="text-class-h1">{collection.name}</h1>
        </div>
        <div>
          <span
            className="text-right feather icon-download black"
            title="Download"
            onClick={() => {
              setDownloadGalleryModal(true);
            }}
          ></span>
        </div>
      </div>
      <section id="video-player" style={{ position: "relative" }}>
        <div className="player-wrapper">
          <ReactPlayer
            url={videoLink}
            controls
            width={`calc(100vw - ${scrollbarWidth}px)`}
            height={"70%"}
            playing={true}
            loop={true}
            muted={true}
            className="react-player"
            // vimeo options title
            config={{
              vimeo: {
                playerOptions: {
                  title: "true",
                },
              },
            }}
          />
        </div>
      </section>


      <section id="image-gallery" className="image-gallery">
        <div className="card-content collapse show">
          <div className="card-body my-gallery">
            <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
              <div className="row">
                {imageUrls.map((image, index) => (
                  <Item
                    key={index}
                    original={image.url}
                    thumbnail={image.url}
                    width="1024"
                    height="576"
                  >
                    {({ ref, open }) => (
                      <figure
                        ref={ref}
                        className="col-lg-3 col-md-6 col-12"
                        onClick={open}
                      >
                        <a
                          href={image.url}
                          className="hovereffect"
                          itemProp="contentUrl"
                        >
                          <img className="equal-image" src={image.url} alt="" />
                          <div className="overlay overlay-to-links">
                            <p className="icon-links" style={{backgroundColor:"black"}}>
                              <a>
                                <span
                                  className="feather icon-download primary"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectedImageUrl(image.path_display);
                                    setDownloadImageModal(true);
                                  }}
                                ></span>
                              </a>
                              <a>
                                <span className="feather icon-edit primary"></span>
                              </a>
                            </p>
                          </div>
                        </a>
                      </figure>
                    )}
                  </Item>
                ))}
                {loading && <div>Loading...</div>}
                {!loading && !hasMore && <div>No more thumbnails to load</div>}
              </div>
            </CustomGallery>
          </div>
        </div>
      </section>
      <DefaultLayout
        shareButton={true}
        fullscreenButton={false}
        zoomButton={false}
        ref={layoutRef}
      />

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
  );
};
