import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateInvoiceQuickbookLink } from "./../api/invoiceApis"; // Ensure you have this API endpoint defined

const UploadInvoiceModal = ({ isOpen, onClose, handleConfirm, quickbookLink, handleQbLinkChange  }) => {
  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} id="uploadInvoice" tabIndex="-1" role="dialog" aria-labelledby="uploadInvoiceLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary white">
            <h4 className="modal-title" id="uploadInvoiceLabel">Upload Invoice</h4>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Quickbook Link"
              value={quickbookLink}
              onChange={(e) => handleQbLinkChange(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-outline-primary" onClick={handleConfirm}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadInvoiceModal;
