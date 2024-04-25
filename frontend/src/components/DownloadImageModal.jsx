import React, { useState } from "react";

const DownloadImageModal = ({ isOpen, onClose, onConfirm, message, downloadOptions, setDownloadOptions }) => {
  const [selectedSize, setSelectedSize] = useState("original");
  const [selectedQuality, setSelectedQuality] = useState("high");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setDownloadOptions({ ...downloadOptions, size: event.target.value });
  };

  const handleQualityChange = (event) => {
    setSelectedQuality(event.target.value);
    setDownloadOptions({ ...downloadOptions, quality: event.target.value });
  };

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} id="danger" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel10" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary white">
            <h4 className="modal-title" id="myModalLabel10">Download Options</h4>
          </div>
          <div className="modal-body">
            <h5>{message}</h5>
            <fieldset className="form-group floating-label-form-group">
              <label>Size:</label>
              <select
                className="select2 form-control"
                name="size"
                value={selectedSize}
                onChange={handleSizeChange}
                required
              >
                <option value="original">Original</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </fieldset>
            <fieldset className="form-group floating-label-form-group">
              <label>Quality:</label>
              <select
                className="select2 form-control"
                name="quality"
                value={selectedQuality}
                onChange={handleQualityChange}
                required
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </fieldset>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-outline-primary" onClick={onConfirm}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadImageModal;