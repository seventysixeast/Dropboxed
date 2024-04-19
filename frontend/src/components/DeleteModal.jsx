import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} id="danger" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel10" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-danger white">
            <h4 className="modal-title" id="myModalLabel10">Delete</h4>
          </div>
          <div className="modal-body">
            <h5>{message}</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>No</button>
            <button type="button" className="btn btn-outline-danger" onClick={onConfirm}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;