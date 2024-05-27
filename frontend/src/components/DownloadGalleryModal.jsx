import React, { useEffect, useState } from "react";
import dropboxicon from "../assets/images/dropboxicon.svg";
import { useAuth } from "../context/authContext";
const REACT_APP_GALLERY_IMAGE_URL = process.env.REACT_APP_GALLERY_IMAGE_URL;
const REACT_APP_DROPBOX_CLIENT = process.env.REACT_APP_DROPBOX_CLIENT;
const REACT_APP_DROPBOX_REDIRECT = process.env.REACT_APP_DROPBOX_REDIRECT;

const DownloadGalleryModal = ({
  isOpen,
  onClose,
  onConfirm,
  downloadOptions,
  setDownloadOptions,
}) => {
  const [selectedSize, setSelectedSize] = useState("original");
  const [selectedDownloadTo, setSelectedDownloadTo] = useState("device");
  const { authData } = useAuth();
  const [dropboxAuthUrl, setDropboxAuthUrl] = useState("");
  const [dropboxAccess, setDropboxAccess] = useState(false);

  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setDownloadOptions({ ...downloadOptions, size: event.target.value });
  };

  const handleDownloadToChange = (event) => {
    setSelectedDownloadTo(event.target.value);
    setDownloadOptions({ ...downloadOptions, device: event.target.value });
  };
  useEffect(() => {
    if (authData.user !== null) {
      const currentUrl = window.location.href;

      const url2 = new URL(currentUrl);
      url2.pathname = url2.pathname.replace("/view-gallery/:id", "");

      const url = new URL(currentUrl);

      url.searchParams.set("userId", authData.user.id);
      const scopes = encodeURIComponent(
        "account_info.read files.metadata.write files.metadata.read files.content.write files.content.read sharing.write sharing.read file_requests.write file_requests.read"
      );
      setDropboxAuthUrl(
        `https://www.dropbox.com/oauth2/authorize?client_id=${REACT_APP_DROPBOX_CLIENT}&redirect_uri=${REACT_APP_DROPBOX_REDIRECT}&token_access_type=offline&scope=${scopes}&response_type=code&state=${url}`
      );
    }
    if (authData.user !== null) {
      setIsSignedIn(true);
    }
    if (authData.user !== null && authData.user.dropbox_refresh !== null) {
      setDropboxAccess(true);
    }
  }, [authData]);
  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
      id="danger"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel10"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary white">
            <h4 className="modal-title" id="myModalLabel10">
              DOWNLOAD PHOTOS
            </h4>
          </div>
          <div className="modal-body">
            <fieldset className="form-group floating-label-form-group">
              <h3 className="mb-1 photo-size-heading">PHOTO SIZE</h3>
              <div className="checkbox-group">
                <div
                  className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <input
                    type="checkbox"
                    id="original"
                    name="size"
                    value="original"
                    checked={selectedSize === "original"}
                    onChange={handleSizeChange}
                    style={{ marginRight: "1rem" }}
                  />
                  <label htmlFor="original" className="form-check-label mb-0">
                    High Resolution
                  </label>
                </div>

                <div
                  className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <input
                    type="checkbox"
                    id="webSize"
                    name="size"
                    value="w2048h1536"
                    checked={selectedSize === "w2048h1536"}
                    onChange={handleSizeChange}
                    style={{ marginRight: "1rem" }}
                  />
                  <label
                    htmlFor="original"
                    className="form-check-label mb-0 text-center"
                  >
                    Web Size [2048px * 1536px]
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset className="form-group floating-label-form-group">
              <h3 className="mb-1 photo-size-heading">DOWNLOAD TO</h3>
              <div className="checkbox-group">
                <div
                  className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center"
                  style={{ marginBottom: "10px" }}
                >
                  <input
                    type="checkbox"
                    id="saveToDevice"
                    name="downloadTo"
                    value="device"
                    checked={selectedDownloadTo === "device"}
                    onChange={handleDownloadToChange}
                    style={{ marginRight: "1rem" }}
                  />
                  <label
                    htmlFor="saveToDevice"
                    className="form-check-label mb-0"
                  >
                    Save to Device
                  </label>
                </div>
                {isSignedIn && dropboxAccess ? (
                  <div
                    className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center"
                    style={{ marginBottom: "10px" }}
                  >
                    <input
                      type="checkbox"
                      id="saveToDropbox"
                      name="downloadTo"
                      value="dropbox"
                      className="bg-primary"
                      checked={selectedDownloadTo === "dropbox"}
                      onChange={handleDownloadToChange}
                      style={{ marginRight: "1rem" }}
                    />
                    <label
                      htmlFor="saveToDropbox"
                      className="form-check-label mb-0 text-center"
                    >
                      <img
                        src={dropboxicon}
                        style={{ width: "24px", marginRight: "10px" }}
                        alt="dropbox-icon"
                        title="Dropbox Icon"
                      />
                      Save to Dropbox
                    </label>
                  </div>
                ) : (
                  <>
                    <a href={dropboxAuthUrl}>
                      <div
                        className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center"
                        style={{ marginBottom: "10px" }}
                      >
                        <div className="form-check-label mb-0 text-center">
                          <img
                            src={dropboxicon}
                            style={{
                              width: "24px",
                              marginRight: "10px",
                              marginLeft: "8.5rem",
                            }}
                            alt="dropbox-icon"
                          />
                          Link Your Dropbox
                        </div>
                      </div>
                    </a>
                  </>
                )}
              </div>
            </fieldset>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
            >
              Download
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadGalleryModal;
