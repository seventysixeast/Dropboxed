import React, { useState } from "react";

const DownloadImageModal = ({ isOpen, onClose, onConfirm, downloadOptions, setDownloadOptions }) => {
  const [selectedSize, setSelectedSize] = useState("original");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setDownloadOptions({ ...downloadOptions, size: event.target.value });
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
              <label>PHOTO SIZE</label>
              <select
                className="select2 form-control"
                name="size"
                value={selectedSize}
                onChange={handleSizeChange}
                required
              >
                <option value="original">High Resolution</option>
                <option value="w1024h680">Web Size</option>
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