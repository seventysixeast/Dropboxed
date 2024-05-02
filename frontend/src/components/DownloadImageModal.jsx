import React, { useState } from "react";
import dropboxicon from "../assets/images/dropboxicon.svg";
const DownloadImageModal = ({ isOpen, onClose, onConfirm, downloadOptions, setDownloadOptions }) => {
  const [selectedSize, setSelectedSize] = useState("original");
  const [selectedDownloadTo, setSelectedDownloadTo] = useState("device");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setDownloadOptions({ ...downloadOptions, size: event.target.value });
  };

  const handleDownloadToChange = (event) => {
    setSelectedDownloadTo(event.target.value);
    setDownloadOptions({ ...downloadOptions, device: event.target.value });
  };

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} id="danger" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel10" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary white">
            <h4 className="modal-title" id="myModalLabel10">DOWNLOAD PHOTO</h4>
          </div>
          <div className="modal-body">
            <fieldset className="form-group floating-label-form-group">
              <h3 className="mb-1 photo-size-heading">PHOTO SIZE</h3>
              <div className="checkbox-group">
                <div className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center" style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    id="original"
                    name="size"
                    value="original"
                    checked={selectedSize === "original"}
                    onChange={handleSizeChange}
                    style={{ marginRight: "10rem" }}
                  />
                  <label htmlFor="original" className="form-check-label mb-0">High Resolution</label>
                </div>

                <div className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center" style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    id="webSize"
                    name="size"
                    value="w2048h1536"
                    checked={selectedSize === "w2048h1536"}
                    onChange={handleSizeChange}
                    style={{ marginRight: "11.5rem" }}
                  />
                  <label htmlFor="original" className="form-check-label mb-0 text-center">Web Size</label>
                </div>
              </div>
            </fieldset>

            <fieldset className="form-group floating-label-form-group">
              <h3 className="mb-1 photo-size-heading">DOWNLOAD TO</h3>
              <div className="checkbox-group">
                <div className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center" style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    id="saveToDevice"
                    name="downloadTo"
                    value="device"
                    checked={selectedDownloadTo === "device"}
                    onChange={handleDownloadToChange}
                    style={{ marginRight: "10rem" }}
                  />
                  <label htmlFor="saveToDevice" className="form-check-label mb-0">Save to Device</label>
                </div>

                <div className="form-check border photo-size-options mx-2 p-1 d-flex align-items-center" style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    id="saveToDropbox"
                    name="downloadTo"
                    value="dropbox"
                    className="bg-primary"
                    checked={selectedDownloadTo === "dropbox"}
                    onChange={handleDownloadToChange}
                    style={{ marginRight: "8rem" }}
                  />
                  <label htmlFor="saveToDropbox" className="form-check-label mb-0 text-center"><img src={dropboxicon} style={{ width: '24px', marginRight: "10px" }} alt="dropbox-icon" title="Dropbox Icon" />Save to Dropbox</label>
                </div>
              </div>
            </fieldset>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary w-75" onClick={onConfirm}>Download</button>
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadImageModal;
