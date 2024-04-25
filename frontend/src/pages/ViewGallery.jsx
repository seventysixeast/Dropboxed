import React, { useState, useEffect, useRef } from 'react';
import DownloadImageModal from '../components/DownloadImageModal';
import axios from 'axios';

const accessToken = process.env.REACT_APP_DROPBOX_KEY;

export const ViewGallery = () => {
  const [showDownloadImageModal, setDownloadImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [downloadOptions, setDownloadOptions] = useState({
    size: "original",
    quality: "high"
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  const fetchSize = 16;
  const folderPath = '/web';

  useEffect(() => {
    fetchImages();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);

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
      const totalFiles = fileEntries.length;

      const startIndex = (page.current - 1) * fetchSize;
      const endIndex = Math.min(startIndex + fetchSize, totalFiles);

      if (startIndex >= totalFiles) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const batchEntries = fileEntries.slice(startIndex, endIndex);
      const batchUrls = await fetchBatchThumbnails(batchEntries);
      setImageUrls(prevUrls => [...prevUrls, ...batchUrls]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  // const handleDownload = (url) => {
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'image.jpg';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleDownload = async () => {
    try {
      const downloadImageOptions = {
        size: downloadOptions.size,
        quality: downloadOptions.quality
      };

      const response = await axios.post(
        "https://content.dropboxapi.com/2/files/download",
        null,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: selectedImageUrl,
              downloadImageOptions
            }),
            "Content-Type": "application/octet-stream"
          },
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "downloaded_image.jpg");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setDownloadImageModal(false);
    } catch (error) {
      console.error("Error downloading image from Dropbox:", error);
    }
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

      // Check the structure of response.data
      console.log("Response Data:", response.data);

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

  return (
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="content-wrapper">
        <div className="content-body">
          <section id="image-gallery" class="card">
            <div class="card-header">
              <h4 class="card-title">Image gallery</h4>
              <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
              <div class="heading-elements">
                <ul class="list-inline mb-0">
                  <li><a data-action="collapse"><i class="feather icon-minus"></i></a></li>
                  <li><a data-action="reload"><i class="feather icon-rotate-cw"></i></a></li>
                  <li><a data-action="expand"><i class="feather icon-maximize"></i></a></li>
                  <li><a data-action="close"><i class="feather icon-x"></i></a></li>
                </ul>
              </div>
            </div>
            <div class="card-content collapse show">
              <div class="card-body  my-gallery" itemscope itemtype="http://schema.org/ImageGallery">
                <div className="card-deck-wrapper">
                  <div class="grid-hover row">
                    {imageUrls.map((url, index) => (
                      <div className='col'>
                        <figure id={index} class="col-lg-3 col-md-6 col-12" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                          <a href={url} itemprop="contentUrl" data-size="480x360">
                            <img src={url} itemprop="thumbnail" alt="Image description" />
                          </a>
                        </figure>
                        <div className='text-right mr-2'>
                          <i
                            className="feather icon-download"
                            title="Download"
                            onClick={() => {
                              setSelectedImageUrl(url);
                              setDownloadImageModal(true);
                            }}
                          ></i>
                        </div>
                      </div>
                    ))}
                    {loading && <div>Loading...</div>}
                    {!loading && !hasMore && <div>No more thumbnails to load</div>}
                  </div>
                </div>
              </div>
              <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="pswp__bg"></div>
                <div class="pswp__scroll-wrap">
                  <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                  </div>
                  <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                      <div class="pswp__counter"></div>
                      <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                      <button class="pswp__button pswp__button--share" title="Share"></button>
                      <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                      <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                      <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                          <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                      <div class="pswp__share-tooltip"></div>
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>
                    <div class="pswp__caption">
                      <div class="pswp__caption__center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <DownloadImageModal
        isOpen={showDownloadImageModal}
        onClose={() => setDownloadImageModal(false)}
        onConfirm={handleDownload}
        message="Select size and quality options before downloading"
        selectedImageUrl={selectedImageUrl}
        downloadOptions={downloadOptions}
        setDownloadOptions={setDownloadOptions}
      />
    </div>
  );
};