import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <div class={`modal fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} id="danger" tabindex="-1" role="dialog" aria-labelledby="myModalLabel10" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger white">
            <h4 class="modal-title" id="myModalLabel10">Delete</h4>
          </div>
          <div class="modal-body">
            <h5>{message}</h5>
          </div>
          <div class="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>No</button>
            <button type="button" className="btn btn-outline-danger" onClick={onConfirm}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;