import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getCollection } from "../api/collectionApis";

const accessToken = process.env.REACT_APP_DROPBOX_KEY;

export const ViewGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1); // Keep track of the current page
  const fetchSize = 16; // Number of thumbnails to fetch per request
  const folderPath = '/web'; // Specify the path to the folder containing images
  const fileList = useRef([]); // Store the list of files
  const { id } = useParams();

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchCollection = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    let res = await getCollection(id);
    if (res.success) {
      console.log("res", res)
    }
  }

  const fetchFileList = async () => {
    try {
      const listResponse = await axios.post(
        'https://api.dropboxapi.com/2/files/list_folder',
        { path: folderPath },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const entries = listResponse.data.entries;
      const fileEntries = entries.filter(entry => entry['.tag'] === 'file');
      fileList.current = fileEntries;
      fetchImages();
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const fetchImages = async () => {
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
      const batchUrls = await fetchBatchThumbnails(batchEntries);
      setImageUrls(prevUrls => [...prevUrls, ...batchUrls]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const handleDownload = (url) => {
    // Example implementation of downloading the image
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg'; // You can customize the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchBatchThumbnails = async (entries) => {
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
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'json', // Change responseType to json
        }
      );
  
      // Iterate over the response and extract the thumbnails
      for (const entry of response.data.entries) {
        const url = "data:image/jpeg;base64," + entry.thumbnail;
        urls.push(url);
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-header row mt-2">
            <div className="content-header-left col-md-6 col-12 mb-2">
              <h3 className="content-header-title mb-0">Gallery</h3>
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
                      {/* banner */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section id="image-grid" className="app-content card">
              <div className="card-content collapse show">
                <div
                  className="card-body my-gallery"
                  itemScope
                  itemType="http://schema.org/ImageGallery"
                >
                  <div className="card-deck-wrapper">
                    <div className="card-deck">
                      {imageUrls.map((url, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                          <figure
                            className="card card-img-top border-grey border-lighten-2"
                            itemProp="associatedMedia"
                            itemScope
                            itemType="http://schema.org/ImageObject"
                          >
                            <a
                              href={url}
                              itemProp="contentUrl"
                              data-size="480x360"
                            >
                              <img
                                className="gallery-thumbnail card-img-top"
                                src={url}
                                itemProp="thumbnail"
                                alt="Image description"
                              />
                            </a>
                          </figure>
                        </div>
                      ))}
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
          </div>
        </div>
      </div>
    </>
  );
};
