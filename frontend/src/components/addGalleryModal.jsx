// AddGalleryModal.js

import React from 'react';

const AddGalleryModal = ({
  handleSubmit,
  handleInputChange,
  handleSelectedChange,
  clients,
  services,
  selectedService,
  handleBannerChange,
  formData,
}) => {
  return (
    <div className="modal fade text-left" id="bootstrap" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel35" aria-hidden="true" style={{ display: "none" }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="card-title">Download from Dropbox & Add in Gallery</h3>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <fieldset className="form-group floating-label-form-group">
                <label htmlFor="title">Title *</label>
                <input type="text" placeholder="Enter Title" className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
              </fieldset>
              <fieldset className="form-group floating-label-form-group">
                <label>Clients</label>
                <select className="select2 form-control" name="client" value={formData.clientId} onChange={handleInputChange} required>
                  {clients && clients.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Rest of the form fields */}
            </div>
            <div className="modal-footer">
              <input type="submit" className="btn btn-primary btn" value="Download" />
              <input type="reset" className="btn btn-secondary btn" data-dismiss="modal" value="Close" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryModal;