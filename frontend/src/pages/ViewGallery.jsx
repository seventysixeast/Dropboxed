import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DownloadImageModal from '../components/DownloadImageModal';
import DownloadGalleryModal from '../components/DownloadGalleryModal';
import { getCollection } from "../api/collectionApis";
import { useAuth } from "../context/authContext";
import { getRefreshToken } from "../api/authApis";
import JSZip from 'jszip';
import LoadingOverlay from "../components/Loader";
import { toast } from 'react-toastify';

export const ViewGallery = () => {
  const { authData } = useAuth();
  const user = authData.user;
  const subdomainId = user.subdomain_id
  const userId = user.id
  const [dropboxAccess, setDropboxAccess] = useState("");
  const dropboxRefresh = user.dropbox_refresh
  const [collectionRefresh, setCollectionRefresh] = useState("")
  const [showDownloadGalleryModal, setDownloadGalleryModal] = useState(false);
  const [showDownloadImageModal, setDownloadImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [downloadOptions, setDownloadOptions] = useState({ size: "original", device: "device" });
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  const fetchSize = 8;
  const fileList = useRef([]);
  const { id } = useParams();
  const [dropboxLink, setDropboxLink] = useState("");
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (fileList.current && fileList.current.length == 0) {
      if (!running) {
      fetchCollection();
      }
    }
  }, []);


  const fetchCollection = async () => {
    setRunning(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    let res = await getCollection(formDataToSend);
    if (res.success) {
      console.log("res", res)
      setCollectionRefresh(res.data.dropbox_refresh)
      setDropboxLink(res.data.dropbox_link)
      fetchFileList(res.data.dropbox_refresh, res.data.dropbox_link);
    } else {
      toast.error("Failed to get collection...")
    }
    setRunning(false)
  }

  const fetchFileList = async (data, link) => {
    try {
      const tokens = await getRefreshToken(data);
      setDropboxAccess(tokens.access_token);
      const sharedData = await axios.post(
        'https://api.dropboxapi.com/2/sharing/get_shared_link_metadata',
        { "url": link },
        {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const listResponse = await axios.post(
        'https://api.dropboxapi.com/2/files/list_folder',
        { path: sharedData.data.path_lower },
        {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const entries = listResponse.data.entries;
      const fileEntries = entries.filter(entry => entry['.tag'] === 'file');
      fileList.current = fileEntries;
      fetchImages(data);

    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const fetchImages = async (data) => {
    try {
      setLoading(true);

      const totalFiles = fileList.current.length;
      const startIndex = (page.current - 1) * fetchSize;
      const endIndex = Math.min(startIndex + fetchSize, totalFiles);

      if (startIndex >= totalFiles) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const batchEntries = fileList.current.slice(startIndex, endIndex);
      const batchUrls = await fetchBatchThumbnails(batchEntries, data);
      setImageUrls(prevUrls => [...prevUrls, ...batchUrls]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const fetchBatchThumbnails = async (entries, data) => {
    const tokens = await getRefreshToken(data);
    const urls = [];
    try {
      const response = await axios.post(
        'https://content.dropboxapi.com/2/files/get_thumbnail_batch',
        {
          entries: entries.map(entry => ({
            path: entry.path_lower,
            format: 'jpeg',
            mode: 'strict',
            quality: 'quality_80',
            size: 'w640h480'
          })),
        },
        {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json',
          },
          responseType: 'json'
        }
      );
      for (const entry of response.data.entries) {
        const url = "data:image/jpeg;base64," + entry.thumbnail;
        const path_display = entry.metadata.path_display;
        const imgObj = {
          url,
          path_display
        }
        urls.push(imgObj);
      }
    } catch (error) {
      console.error('Error fetching batch thumbnails:', error);
    }
    return urls;
  };

  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
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
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleDownload = async () => {
    const tokens = await getRefreshToken(collectionRefresh);

    if (downloadOptions.device == "device") {
      try {
        if (downloadOptions.size === "original") {
          const { data: { link } } = await axios.post(
            "https://api.dropboxapi.com/2/files/get_temporary_link",
            { path: selectedImageUrl },
            {
              headers: {
                'Authorization': `Bearer ${tokens.access_token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          const response = await axios.get(
            link,
            {
              responseType: 'blob',
              headers: {
                'Authorization': `Bearer ${tokens.access_token}`
              }
            }
          );
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);
          let adjustedBlob = blob;
          let adjustedUrl = url;
          adjustedUrl = window.URL.createObjectURL(adjustedBlob);
          const linkElement = document.createElement('a');
          linkElement.href = adjustedUrl;
          linkElement.setAttribute('download', 'downloaded_image.jpg');
          document.body.appendChild(linkElement);
          linkElement.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(linkElement);
          setDownloadImageModal(false);
        } else {
          const response = await axios.post(
            'https://content.dropboxapi.com/2/files/get_thumbnail_batch',
            {
              entries: [
                {
                  path: selectedImageUrl,
                  format: 'jpeg',
                  mode: 'strict',
                  quality: 'quality_90',
                  size: "w2048h1536"
                }
              ],
            },
            {
              headers: {
                'Authorization': `Bearer ${tokens.access_token}`,
                'Content-Type': 'application/json',
              },
              responseType: 'json',
            }
          );
          const imageData = response.data.entries[0].thumbnail;
          const link = document.createElement('a');
          link.href = `data:image/jpeg;base64,${imageData}`;
          link.download = 'downloaded_image.jpg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error("Error downloading image from Dropbox:", error);
      }
    } else if ((downloadOptions.device == "dropbox")) {
      const tokens = await getRefreshToken(collectionRefresh);
      setDropboxAccess(tokens.access_token);
      const sharedLinkResponse = await fetch(`https://api.dropboxapi.com/2/sharing/get_shared_link_metadata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`
        },
        body: JSON.stringify({
          url: dropboxLink
        })
      });
      const sharedLinkData = await sharedLinkResponse.json();
      const folderPath = sharedLinkData.path_lower;

      const usertokens = await getRefreshToken(dropboxRefresh);

      const copyResponse = await fetch(`https://api.dropboxapi.com/2/files/copy_v2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usertokens.access_token}`
        },
        body: JSON.stringify({
          from_path: folderPath,
          to_path: folderPath
        })
      });

      if (copyResponse.ok) {
        toast.success('Folder copied successfully.');
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
            const { data: { link } } = await axios.post(
              "https://api.dropboxapi.com/2/files/get_temporary_link",
              { path: imageData.path_display },
              {
                headers: {
                  'Authorization': `Bearer ${tokens.access_token}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            const response = await axios.get(
              link,
              {
                responseType: 'blob',
                headers: {
                  'Authorization': `Bearer ${tokens.access_token}`
                }
              }
            );
            imageBlob = response.data;
          } else {
            const response = await axios.post(
              'https://content.dropboxapi.com/2/files/get_thumbnail_batch',
              {
                entries: [
                  {
                    path: imageData.path_display,
                    format: 'jpeg',
                    mode: 'strict',
                    quality: 'quality_90',
                    size: "w2048h1536"
                  }
                ],
              },
              {
                headers: {
                  'Authorization': `Bearer ${tokens.access_token}`,
                  'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
              }
            );
            imageBlob = new Blob([response.data], { type: 'image/jpeg' });
          }
          zip.file(imageData.path_display.split('/').pop(), imageBlob);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipUrl = window.URL.createObjectURL(zipBlob);
        const linkElement = document.createElement('a');
        linkElement.href = zipUrl;
        linkElement.setAttribute('download', 'downloaded_images.zip');
        document.body.appendChild(linkElement);
        linkElement.click();
        window.URL.revokeObjectURL(zipUrl);
        document.body.removeChild(linkElement);
        setDownloadGalleryModal(false);
      } catch (error) {
        console.error("Error downloading images from Dropbox:", error);
      }
    } else if ((downloadOptions.device == "dropbox")) {
      const tokens = await getRefreshToken(collectionRefresh);
      setDropboxAccess(tokens.access_token);
      const sharedLinkResponse = await fetch(`https://api.dropboxapi.com/2/sharing/get_shared_link_metadata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`
        },
        body: JSON.stringify({
          url: dropboxLink
        })
      });
      const sharedLinkData = await sharedLinkResponse.json();
      const folderPath = sharedLinkData.path_lower;

      const usertokens = await getRefreshToken(dropboxRefresh);

      const copyResponse = await fetch(`https://api.dropboxapi.com/2/files/copy_v2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usertokens.access_token}`
        },
        body: JSON.stringify({
          from_path: folderPath,
          to_path: 'folderPath'
        })
      });

      if (copyResponse.ok) {
        toast.success('Folder copied successfully.');
      } else {
        const errorData = await copyResponse.json();
        if (errorData.error_summary = "to/conflict/folder/.") {
          toast.error(`Error copying folder: ${errorData.error_summary}`);
        }
      }
    }
    setDownloadOptions({ device: "device", size: "original" });
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="app-content content" style={{overflowX : "visible" }}>
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-body">
            <section id="image-gallery">
              <div className="card-content collapse show">
                <div className="card-body my-gallery" itemScope itemType="http://schema.org/ImageGallery">
                  <div className='text-right mb-2'>
                    <span
                      className="feather icon-download black"
                      title='Download'
                      onClick={() => {
                        setDownloadGalleryModal(true);
                      }}>
                    </span>
                  </div>
                  <div className="row">
                    {imageUrls.map((image, index) => (
                      <figure id={index} className="col-lg-3 col-md-6 col-12" itemProp="associatedMedia" itemScope itemType="http://schema.org/ImageObject">
                        <a href={image.url} className="hovereffect" itemProp="contentUrl" data-size="640x360">
                          <img className="equal-image" src={image.url} alt="" />
                          <div className="overlay">
                            <p className="icon-links">
                              <a>
                                <span
                                  className="feather icon-download"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectedImageUrl(image.path_display);
                                    setDownloadImageModal(true);
                                  }}>
                                </span>
                              </a>
                              <a href="#">
                                <span className="feather icon-edit"></span>
                              </a>
                            </p>
                          </div>
                        </a>
                      </figure>
                    ))}

                    {loading && <div>Loading...</div>}
                    {!loading && !hasMore && <div>No more thumbnails to load</div>}
                  </div>
                </div>
                <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
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
                        <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button className="pswp__button pswp__button--share" title="Share"></button>
                        <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
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
                      <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                      </button>
                      <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                      </button>
                      <div className="pswp__caption">
                        <div className="pswp__caption__center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

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
      </div>
    </>
  );
};