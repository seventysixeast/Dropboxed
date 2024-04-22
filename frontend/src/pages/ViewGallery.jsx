import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ViewGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const accessToken = 'sl.Bz2LcyoawWd-yyoHzZJ5y25mIVwqFvspGX8KlcWrQKe_wLq9UIE0WzDzgZh57-J5w6TkKjplPth1Ed0P8RgAFugwveqbKwDSaTrRoWfGufQihzCM9V54h5qDcQwz2QnSo-Pl0wdGFmHrA_V-C1qCQCY';
        const folderPath = '/web';
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
        const imageUrls = await Promise.all(entries.map(async (entry) => {
          if (entry['.tag'] === 'file' && entry.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            const response = await axios.post(
              'https://api.dropboxapi.com/2/files/get_temporary_link',
              { path: entry.path_lower },
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            return response.data.link;
          }
        }));
        setImageUrls(imageUrls.filter(url => url));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
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
                      banner
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
                        <div className="col-md-3 mb-3">
                          <figure
                            key={index}
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