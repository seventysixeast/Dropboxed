import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import avatar1 from "../assets/images/dummy.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TodoModal = ({
  isNewTaskModalOpen,
  toggleNewTaskModal,
  taskData,
  setTaskData,
  handleClientChange,
  handleStatusChange,
  selectedClient,
  clients,
  tags,
  selectedTags,
  handleSelectedTags,
  handleSubmit,
  taskAuthor,
  comments,
  handleTextChange,
}) => {
  const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
  function getLabelForKey(key) {
    switch (key) {
      case "2":
        return "Photographers";
      case "3":
        return "Clients";
      case "5":
        return "Admin";
      default:
        return "Other";
    }
  }
  return (
    <>
      <div
        className={`todo-new-task-sidebar ${isNewTaskModalOpen ? "show" : ""}`}
        style={{
          maxHeight: "inherit",
          overflowY: "auto",
          position: "fixed",
          marginBottom: "1rem",
          height: "95%",
        }}
      >
        <div className="card shadow-none p-0 m-0">
          <div className="card-header border-bottom py-75">
            <div className="task-header d-flex justify-content-between align-items-center">
              {taskData.id ? (
                <>
                  <h5 className="new-task-title mb-0">Update Task</h5>
                  <button
                    className="mark-complete-btn btn btn-primary btn-sm mr-5"
                    style={{ padding: "5px" }}
                  >
                    <input
                      type="checkbox"
                      className="align-items-cente"
                      style={{
                        marginLeft: "2px",
                        marginRight: "10px",
                        marginTop: "3px",
                      }}
                      checked={taskData.status === 1}
                      onChange={handleStatusChange}
                    />
                    {taskData.status === 1 ? (
                      <span className="mark-complete text-center">
                        Completed
                      </span>
                    ) : (
                      <span className="mark-complete text-center">
                        Mark Complete
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <h5 className="new-task-title mb-0">New Task</h5>
              )}
            </div>
            <button
              type="button"
              onClick={toggleNewTaskModal}
              className="close close-icon"
            >
              <i className="feather icon-x align-middle" />
            </button>
          </div>
          <form id="my-form" className="mt-1">
            <div className="card-content">
              <div className="card-body py-0 border-bottom">
                <div className="form-group">
                  <textarea
                    name="name"
                    className="form-control task-title"
                    cols={1}
                    rows={2}
                    placeholder="Write a Task Name"
                    required
                    value={taskData.taskTitle}
                    onChange={(e) => {
                      setTaskData({
                        ...taskData,
                        taskTitle: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="assigned d-flex justify-content-between">
                  <div className="form-group d-flex align-items-center mr-1">
                    <div className="avatar">
                      <img
                        src={
                          selectedClient.profile_photo
                            ? `${IMAGE_URL}/${selectedClient.profile_photo}`
                            : avatar1
                        }
                        alt="charlie"
                        width={38}
                        height={38}
                      />
                    </div>
                    <div className="select-box mr-1" style={{ width: "10rem" }}>
                      <Select
                        className="select2 font-sm"
                        name="assignedPerson"
                        placeholder="Select"
                        id="assignedPerson"
                        value={selectedClient}
                        required
                        onChange={handleClientChange}
                        options={_.chain(clients)
                          .groupBy("role_id")
                          .map((value, key) => ({
                            label: getLabelForKey(key),
                            options: value.map((client) => ({
                              value: client.id,
                              label: client.name,
                              profile_photo: client.profile_photo,
                            })),
                          }))
                          .sortBy((group) => {
                            switch (group.label) {
                              case "Admin":
                                return 1;
                              case "Photographers":
                                return 2;
                              case "Clients":
                                return 3;
                              default:
                                return 4;
                            }
                          })
                          .value()}
                        isSearchable
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group d-flex align-items-center position-relative">
                    <DatePicker
                      className="form-control custom-datepicker p-1"
                      id="datetimepicker4"
                      name="prefferedDate"
                      placeholderText="dd-mm-yyyy"
                      selected={taskData.taskAssigndate}
                      required
                      onChange={(date) =>
                        setTaskData({
                          ...taskData,
                          taskAssigndate: date,
                        })
                      }
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                </div>
              </div>

              <div className="card-body border-bottom task-description">
                <div className="form-group">
                  <ReactQuill
                    value={taskData.taskDescription}
                    onChange={handleTextChange}
                    placeholder="Add description"
                  />
                </div>
                <div className="tag d-flex justify-content-between align-items-center pt-1">
                  <div className="flex-grow-1 d-flex align-items-center">
                    <i className="feather icon-tag align-middle mr-25" />
                    <Select
                      className="select2"
                      name="tags"
                      id="tags"
                      value={selectedTags}
                      onChange={handleSelectedTags}
                      options={tags.map((tag) => ({
                        value: tag.id,
                        label: tag.tasktag_title,
                      }))}
                      isSearchable
                      isMulti={true}
                      hideSelectedOptions={true}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="card-body pb-1 d-none">
                <div className="snow-container border rounded p-50 d-none dummy">
                  <div className="comment-editor mx-75 ql-container ql-snow">
                    <div
                      className="ql-editor ql-blank"
                      data-gramm="false"
                      data-placeholder="Write a Comment..."
                    >
                      <p>
                        <br />
                      </p>
                    </div>
                    <div className="ql-clipboard" tabIndex={-1} />
                    <div className="ql-tooltip ql-hidden">
                      <a
                        className="ql-preview"
                        target="_blank"
                        href="about:blank"
                      />
                      <input
                        type="text"
                        data-formula="e=mc^2"
                        data-link="https://quilljs.com"
                        data-video="Embed URL"
                      />
                      <a className="ql-action" />
                      <a className="ql-remove" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="comment-quill-toolbar pb-0 ql-toolbar ql-snow">
                      <span className="ql-formats mr-0">
                        <button className="ql-bold" type="button">
                          <svg viewBox="0 0 18 18">
                            {" "}
                            <path
                              className="ql-stroke"
                              d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                            />{" "}
                            <path
                              className="ql-stroke"
                              d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                            />{" "}
                          </svg>
                        </button>
                        <button className="ql-link" type="button">
                          <svg viewBox="0 0 18 18">
                            {" "}
                            <line
                              className="ql-stroke"
                              x1={7}
                              x2={11}
                              y1={7}
                              y2={11}
                            />{" "}
                            <path
                              className="ql-even ql-stroke"
                              d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
                            />{" "}
                            <path
                              className="ql-even ql-stroke"
                              d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
                            />{" "}
                          </svg>
                        </button>
                        <button className="ql-image" type="button">
                          <svg viewBox="0 0 18 18">
                            {" "}
                            <rect
                              className="ql-stroke"
                              height={10}
                              width={12}
                              x={3}
                              y={4}
                            />{" "}
                            <circle className="ql-fill" cx={6} cy={7} r={1} />{" "}
                            <polyline
                              className="ql-even ql-fill"
                              points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                            />{" "}
                          </svg>
                        </button>
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary comment-btn"
                    >
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
                <div className="card-body border-bottom task-description d-none dummy">
                  <div className="snow-container border rounded p-50 d-none">
                    <div className="compose-editor mx-75 ql-container ql-snow">
                      <div
                        className="ql-editor ql-blank"
                        data-gramm="false"
                        data-placeholder="Add Description..... "
                      >
                        <p>
                          <br />
                        </p>
                      </div>
                      <div className="ql-clipboard" tabIndex={-1} />
                      <div className="ql-tooltip ql-hidden">
                        <a
                          className="ql-preview"
                          target="_blank"
                          href="about:blank"
                        />
                        <input
                          type="text"
                          data-formula="e=mc^2"
                          data-link="https://quilljs.com"
                          data-video="Embed URL"
                        />
                        <a className="ql-action" />
                        <a className="ql-remove" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="compose-quill-toolbar pb-0 ql-toolbar ql-snow">
                        <span className="ql-formats mr-0">
                          <button className="ql-bold" type="button">
                            <svg viewBox="0 0 18 18">
                              {" "}
                              <path
                                className="ql-stroke"
                                d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                              />{" "}
                              <path
                                className="ql-stroke"
                                d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                              />{" "}
                            </svg>
                          </button>
                          <button className="ql-link" type="button">
                            <svg viewBox="0 0 18 18">
                              {" "}
                              <line
                                className="ql-stroke"
                                x1={7}
                                x2={11}
                                y1={7}
                                y2={11}
                              />{" "}
                              <path
                                className="ql-even ql-stroke"
                                d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
                              />{" "}
                              <path
                                className="ql-even ql-stroke"
                                d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
                              />{" "}
                            </svg>
                          </button>
                          <button className="ql-image" type="button">
                            <svg viewBox="0 0 18 18">
                              {" "}
                              <rect
                                className="ql-stroke"
                                height={10}
                                width={12}
                                x={3}
                                y={4}
                              />{" "}
                              <circle className="ql-fill" cx={6} cy={7} r={1} />{" "}
                              <polyline
                                className="ql-even ql-fill"
                                points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                              />{" "}
                            </svg>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tag d-flex justify-content-between align-items-center pt-1 d-none">
                    <div className="flex-grow-1 d-flex align-items-center">
                      <i className="feather icon-tag align-middle mr-25" />
                      <select
                        className="select2-assign-label form-control select2-hidden-accessible"
                        multiple=""
                        id="select2-assign-label"
                        disabled="disabled"
                        data-select2-id="select2-assign-label"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <optgroup label="Tags">
                          <option value="Frontend" data-select2-id={4}>
                            Frontend
                          </option>
                          <option value="Backend">Backend</option>
                          <option value="Issue">Issue</option>
                          <option value="Design">Design</option>
                          <option value="Wireframe">Wireframe</option>
                        </optgroup>
                      </select>
                      <span
                        className="select2 select2-container select2-container--default select2-container--disabled"
                        dir="ltr"
                        data-select2-id={3}
                        style={{ width: "100%" }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--multiple"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={-1}
                            aria-disabled="true"
                          >
                            <ul className="select2-selection__rendered">
                              <li
                                className="select2-selection__choice"
                                title="Frontend"
                                data-select2-id={5}
                              >
                                <span
                                  className="select2-selection__choice__remove"
                                  role="presentation"
                                >
                                  ×
                                </span>
                                Frontend
                              </li>
                              <li className="select2-search select2-search--inline">
                                <input
                                  className="select2-search__field"
                                  type="search"
                                  tabIndex={0}
                                  autoComplete="off"
                                  autoCorrect="off"
                                  autoCapitalize="none"
                                  spellCheck="false"
                                  role="searchbox"
                                  aria-autocomplete="list"
                                  placeholder=""
                                  disabled=""
                                  style={{ width: "0.75em" }}
                                />
                              </li>
                            </ul>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body pb-1">
                {taskData.id != "" && (
                  <div className="d-flex align-items-center mb-1">
                    <div className="avatar mr-75">
                      <img
                        src={`${IMAGE_URL}/${taskAuthor.profile_photo}`}
                        alt="charlie"
                        width={38}
                        height={38}
                      />
                    </div>
                    <div className="avatar-content">
                      <span>{taskAuthor.name}</span> created this task
                    </div>
                    <small className="ml-75 text-muted">
                      {Math.floor(
                        (new Date() - new Date("2024-03-14T00:00:00.000Z")) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days ago
                    </small>
                  </div>
                )}
                <div className="">
                  <ul className="list-group ml-5">
                    {comments.map((comment) => (
                      <li className="list-item" key={comment.id}>
                        <p>{comment.comments}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="justify-content-end ">
                    <textarea
                      name="comment"
                      className="form-control task-title mb-1"
                      cols={1}
                      rows={2}
                      placeholder="Leave a comment"
                      value={taskData.comment}
                      onChange={(e) => {
                        setTaskData({
                          ...taskData,
                          comment: e.target.value,
                        });
                      }}
                    />
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-primary comment-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleComment();
                      }}
                    >
                      <span>Comment</span>
                    </button> */}
                  </div>
                </div>
                <div className="mt-1 d-flex justify-content-between">
                  {taskData.id == "" ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-outline-danger add-todo"
                    >
                      Add Task
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-outline-danger update-todo"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoModal;
