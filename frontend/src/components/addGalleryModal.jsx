import React from "react";
import Select from "react-select";
import toolIcons from "../assets/images/i.png";
import { Switch, Checkbox } from '@mui/material';

const AddGalleryModal = ({ message, button, isOpen, formData, previewImage, clients, bookingTitles, services, photographers, isGalleryLocked, isNotifyChecked, loading, handleInputChange, handleBannerChange, handleGalleryLockChange, handleNotifyChange, handleSubmit, onClose }) => {
  { console.log("formData", formData) }
  return (
    <div className="app-content content">
      <div className="content-overlay"></div>
      <div className="content-wrapper">
        <div
          className={`modal fade ${isOpen ? 'show' : ''}`}
          tabIndex="-1"
          role="dialog"
          id='bootstrap'
          aria-labelledby="myModalLabel35"
          aria-hidden="true"
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          <div className="modal-dialog modal-md " role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "#DEE6EE" }}
              >
                <h3 className="card-title mb-0">{message}</h3>
                <button
                  type="button"
                  className="close"
                  id="closeModalButton"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <fieldset className="form-group floating-label-form-group">
                    <label>Client *</label>
                    <select
                      className="select2 form-control"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">----Select----</option>
                      {clients && clients.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <label htmlFor="booking_title">Booking Title *</label>
                    <select
                      id="booking_title"
                      className="select2 form-control"
                      name="booking_title"
                      value={formData.booking_title}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    >
                      <option value="">----Select----</option>
                      {bookingTitles.map(item => (
                        <option key={item.id} value={item.booking_title}>
                          {item.booking_title}
                        </option>
                      ))}
                    </select>
                    {loading && (
                      <div style={{ position: 'absolute', right: '22px', transform: 'translateY(-111%)' }}>
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <label style={{ width: "10rem" }}>Services</label>
                    <Select
                      className="select2 w-100"
                      name="services"
                      value={services}
                      onChange={handleInputChange}
                      options={services && services.map((pkg) => ({
                        label: pkg.label,
                        value: pkg.value
                      }))}
                      isMulti
                      hideSelectedOptions
                      components={{
                        Option: ({
                          data,
                          innerRef,
                          innerProps,
                        }) => (
                          <div
                            ref={innerRef}
                            {...innerProps}
                            style={{ display: 'flex form-select ', alignItems: 'center' }}
                          >
                            <img
                              src={toolIcons}
                              className="mr-1 ml-1"
                              width={"14px"}
                              height={"14px"}
                              alt=""
                            />
                            <span>{data.label}</span>
                          </div>
                        ),
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <label style={{ width: "10rem" }}>Photographers</label>
                    <Select
                      className="select2 w-100"
                      name="photographers"
                      value={photographers}
                      onChange={handleInputChange}
                      options={photographers && photographers.map((photographer) => ({
                        label: photographer.label,
                        value: photographer.value
                      }))}
                      isMulti
                      hideSelectedOptions
                      components={{
                        Option: ({
                          data,
                          innerRef,
                          innerProps,
                        }) => (
                          <div
                            ref={innerRef}
                            {...innerProps}
                            style={{ display: 'flex form-select ', alignItems: 'center' }}
                          >
                            <img
                              src={toolIcons}
                              className="mr-1 ml-1"
                              width={"14px"}
                              height={"14px"}
                              alt=""
                            />
                            <span>{data.label}</span>
                          </div>
                        ),
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <label>Gallery Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="gallery_title"
                      value={formData.gallery_title}
                      onChange={handleInputChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <label>Dropbox Link *</label>
                    <input
                      className="form-control"
                      placeholder="Enter Dropbox Link"
                      name="dropbox_link"
                      value={formData.dropbox_link}
                      onChange={handleInputChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group">
                    <label>Vimeo Video Link</label>
                    <input
                      className="form-control"
                      placeholder="Enter Vimeo Video Link"
                      name="vimeo_video_link"
                      value={formData.vimeo_video_link}
                      onChange={handleInputChange}
                    />
                  </fieldset>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Banner</label>
                        <input
                          type="file"
                          className="form-control-file"
                          name="banner"
                          onChange={handleBannerChange}
                          accept="image/*"
                        />
                        {/* {formData.id && <img src={`${formData.banner ? `${IMAGE_URL}/${formData.banner}` : '../../../app-assets/images/portrait/medium/avatar-m-4.png'}`} className="rounded-circle height-150 mt-2" alt="Card image" />} */}
                        {previewImage && (
                          <img
                            src={previewImage}
                            className="height-100 width-100 mt-2"
                            alt="banner"
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <Switch
                        name="lock_gallery"
                        checked={isGalleryLocked}
                        onChange={handleGalleryLockChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      Lock Gallery
                      <Checkbox
                        name="notify_client"
                        checked={isNotifyChecked}
                        onChange={handleNotifyChange}
                        color="primary"
                      />
                      Notify to Client
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="submit"
                    className="btn btn-primary btn"
                    value={button}
                  />
                  <input
                    type="reset"
                    className="btn btn-secondary btn"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}
                    value="Close"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryModal;