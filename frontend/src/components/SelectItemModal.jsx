import React from 'react';

const SelectItemModal = ({ isOpen, onClose, onSelectItem, availableItems }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal fade ${isOpen ? "show" : ""}`} style={{ display: isOpen ? "block" : "none" }} id="itemSelectModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Item</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {availableItems.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.package_name}
                  <button className="btn btn-primary" onClick={() => onSelectItem(item)}>Select</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectItemModal;
