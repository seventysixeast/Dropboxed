import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const accessToken = process.env.REACT_APP_DROPBOX_KEY;

export const ViewGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1); // Keep track of the current page
  const fetchSize = 16; // Number of thumbnails to fetch per request
  const folderPath = '/web'; // Specify the path to the folder containing images
  
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
    <div className="app-content content">
      {/* Your content header goes here */}
      <section id="image-grid" className="app-content card">
        <div className="card-content collapse show">
          <div className="card-body my-gallery">
            <div className="card-deck-wrapper">
              <div className="card-deck">
                {imageUrls.map((url, index) => (
                  <div key={index} className="col-md-3 mb-3">
                    <figure className="card card-img-top border-grey border-lighten-2">
                      <a href={url} data-size="480x360" onClick={() => handleDownload(url)}>
                        <img className="gallery-thumbnail card-img-top" src={url} alt="Thumbnail" />
                      </a>
                    </figure>
                  </div>
                ))}
                {loading && <div>Loading...</div>}
                {!loading && !hasMore && <div>No more thumbnails to load</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
