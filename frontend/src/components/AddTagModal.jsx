import React, { useState } from "react";

const AddTagModal = ({ showAddTagModal, setShowAddTagModal, onAddTag }) => {
  const [taskTagTitle, setTaskTagTitle] = useState("");

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    onAddTag(taskTagTitle);
    setTaskTagTitle("");
  };

  return (
    <>
      <div
        className={`modal fade ${showAddTagModal ? "show" : ""}`}
        style={{ display: showAddTagModal ? "block" : "none" }}
        id="danger"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel10"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-white" style={{ backgroundColor: "#DEE6EE" }}>
              <h3 className="card-title px-2" style={{color: '#404e67'}} id="myModalLabel10">
                Add Tag
              </h3>
            </div>
            <div className="modal-body">
              <form onSubmit={handleTaskSubmit}>
                <div className="form-group d-flex justify-content-between mx-4">
                <label htmlFor="taskTagTitle" className="mb-0 mr-2">Tag Title:</label>
                  <input
                    type="text"
                    className="form-control w-75"
                    placeholder="Task Tag Title"
                    name="taskTagTitle"
                    id="taskTagTitle"
                    value={taskTagTitle}
                    onChange={(e) => setTaskTagTitle(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowAddTagModal(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-outline-primary">
                    Add Tag
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTagModal;
