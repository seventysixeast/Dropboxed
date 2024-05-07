import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/authContext";
import { getAlltasks, createTask } from "../api/todoApis";
import Select from "react-select";
import { getClientPhotographers } from "../api/clientApis";
import _ from "lodash";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import { Switch } from "@mui/material";

const ToDo = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const userId = user.id;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;

  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  const [taskData, setTaskData] = useState({
    id: "",
    userId: "",
    taskTitle: "",
    assignUser: "",
    taskAssigndate: new Date(),
    taskDescription: "",
    taskTags: [],
    comment: "",
    status: 0,
    isFavourite: 1,
  });

  const [comments, setComments] = useState([]);
  const [taskAuthor, setTaskAuthor] = useState();
  console.log(taskAuthor);
  const getTasks = async () => {
    const formData = new FormData();
    formData.append("subdomain_id", subdomainId);
    formData.append("role_id", roleId);
    const response = await getAlltasks(formData);
    if (response.success) {
      setTasks(response.tasks);
      setTags(response.tags);
    } else {
      toast.error("Failed to get tasks!");
    }
  };

  const getClients = async () => {
    const formData = new FormData();
    formData.append("subdomain_id", subdomainId);
    const response = await getClientPhotographers(formData);
    if (response.success) {
      setClients(response.data);
    } else {
      toast.error("Failed to get clients!");
    }
  };

  const toggleNewTaskModal = () => {
    setNewTaskModalOpen(!isNewTaskModalOpen);
  };

  const handleModalClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setNewTaskModalOpen(false);
    }
    setTaskData({
      id: "",
      userId: "",
      taskTitle: "",
      assignUser: "",
      taskAssigndate: new Date(),
      taskDescription: "",
      taskTags: [],
      comment: "",
      status: 0,
      isFavourite: 1,
    });
    setSelectedClient([]);
    setSelectedTags([]);
  };

  useEffect(() => {
    if (tasks && tasks.length === 0) {
      getTasks();
    }
    if (clients && clients.length === 0) {
      getClients();
    }
  }, []);

  function getBulletClass(index) {
    const colors = [
      "#87CEEB",
      "#FFD700",
      "#00FF7F",
      "#FF69B4",
      "#40E0D0",
      "#FFA07A",
      "#9370DB",
    ];
    return `${colors[index % colors.length]}`;
  }

  const handleSubmit = async () => {
    const formData = new FormData();

    if (taskData.id !== "") {
      formData.append("id", taskData.id);
    }
    if (taskData.userId === "") {
      formData.append("user_id", userId);
    } else {
      formData.append("user_id", taskData.userId);
    }

    const formattedTags = selectedTags.map((tag) => tag.value).join(",");
    formData.append("task_tags", formattedTags);
    formData.append("subdomain_id", subdomainId);
    formData.append("role_id", roleId);
    formData.append("task_title", taskData.taskTitle);
    formData.append("assign_user", taskData.assignUser);
    formData.append("task_assigndate", taskData.taskAssigndate);
    formData.append("task_description", taskData.taskDescription);
    formData.append("comment", taskData.comment);
    formData.append("status", taskData.status);
    formData.append("is_favourite", taskData.isFavourite);

    try {
      const response = await createTask(formData);
      if (response.success) {
        toast.success("Task created successfully!");
        getTasks();
        setTaskData({
          id: "",
          userId: "",
          taskTitle: "",
          assignUser: "",
          taskAssigndate: new Date(),
          taskDescription: "",
          taskTags: [],
          comment: "",
          status: 0,
          isFavourite: 1,
        });
        setSelectedClient([]);
        setSelectedTags([]);
        setNewTaskModalOpen(false);
        setComments([]);
        setTaskAuthor();
      } else {
        toast.error("Failed to create task!");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskClick = async (task) => {
    setTaskData({
      id: task.id,
      userId: task.user_id,
      taskTitle: task.task_title,
      assignUser: task.assign_user,
      taskAssigndate: new Date(task.task_assigndate),
      taskDescription: task.task_description,
      taskTags: task.task_tags,
      status: task.status,
      isFavourite: task.is_favourite,
    });

    const client = clients.find((c) => c.id === task.assign_user);

    if (client) {
      setSelectedClient({ value: client.id, label: client.name });
    }

    const selectedTags = tags.filter((tag) => task.task_tags.includes(tag.id));

    if (client) {
      setSelectedTags(
        selectedTags.map((tag) => ({ value: tag.id, label: tag.tasktag_title }))
      );
    }

    setComments(task.TaskComments);

    setTaskAuthor(task.author);
    setNewTaskModalOpen(true);
  };

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };

  const handleSelectedTags = (selectedOption) => {
    setSelectedTags(selectedOption);
  };

  const handleStatusChange = () => {
    setTaskData({
      ...taskData,
      status: taskData.status === 0 ? 1 : 0,
    });
  };

  return (
    <div className="todo-application">
      <div className="app-content content">
        <div className={`sidebar-left ${show ? "show" : ""}`}>
          <div className="sidebar">
            <div className="todo-sidebar d-flex">
              <span
                className="sidebar-close-icon"
                onClick={() => setShow(!show)}
                onTouchStart={() => setShow(!show)}
              >
                <i className="feather icon-x"></i>
              </span>
              <div className="todo-app-menu">
                <div className="form-group text-center add-task">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-glow add-task-btn btn-block my-1"
                    onClick={toggleNewTaskModal}
                  >
                    <i className="feather icon-plus"></i>
                    <span>New Task</span>
                  </button>
                </div>
                <div className="sidebar-menu-list">
                  <div className="list-group">
                    <a href="#" className="list-group-item border-0 active">
                      <span className="fonticon-wrap mr-50">
                        <i className="feather icon-align-justify"></i>
                      </span>
                      <span> All</span>
                    </a>
                  </div>
                  <label className="filter-label mt-2 mb-1 pt-25">
                    Filters
                  </label>
                  <div className="list-group">
                    <a href="#" className="list-group-item border-0">
                      <span className="fonticon-wrap mr-50">
                        <i className="feather icon-star"></i>
                      </span>
                      <span>Favourites</span>
                    </a>
                    <a href="#" className="list-group-item border-0">
                      <span className="fonticon-wrap mr-50">
                        <i className="feather icon-check"></i>
                      </span>
                      <span>Done</span>
                    </a>
                    <a href="#" className="list-group-item border-0">
                      <span className="fonticon-wrap mr-50">
                        <i className="feather icon-trash-2"></i>
                      </span>
                      <span>Deleted</span>
                    </a>
                  </div>
                  <label className="filter-label mt-2 mb-1 pt-25">Labels</label>
                  <div className="list-group">
                    {tags.map((tag, index) => (
                      <a
                        key={index}
                        href="#"
                        className="list-group-item border-0 d-flex align-items-center justify-content-between"
                      >
                        <span>{tag.tasktag_title}</span>
                        <span
                          className={`bullet bullet-sm`}
                          style={{
                            backgroundColor: `${getBulletClass(tag.id)}`,
                          }}
                        ></span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`todo-new-task-sidebar ${
                isNewTaskModalOpen ? "show" : ""
              }`}
              style={{ maxHeight: "inherit", overflowY: "auto" }}
              ref={modalRef}
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
                          <span className="mark-complete text-center">
                            Mark Complete
                          </span>
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
                          {/* users avatar */}
                          <div className="avatar">
                            <img
                              src="#"
                              className="avatar-user-image d-none"
                              alt="#"
                              width={38}
                              height={38}
                            />
                            <div className="avatar-content">
                              <i className="feather icon-user font-medium-4" />
                            </div>
                          </div>
                          <div
                            className="select-box mr-1"
                            style={{ width: "10rem" }}
                          >
                            {console.log(taskData)}
                            <Select
                              className="select2 font-sm"
                              name="tags"
                              value={selectedClient}
                              required
                              onChange={handleClientChange}
                              options={_.chain(clients)
                                .groupBy("role_id")
                                .map((value, key) => ({
                                  label:
                                    key === "2" ? "Photographers" : "Clients",
                                  options: value.map((client) => ({
                                    value: client.id,
                                    label: client.name,
                                  })),
                                }))
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
                          {/* calendar feather icon */}
                          {/* date picker */}

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
                        <textarea
                          name="description"
                          className="form-control task-title"
                          cols={1}
                          rows={2}
                          placeholder="Add description"
                          value={taskData.taskDescription}
                          required
                          onChange={(e) => {
                            setTaskData({
                              ...taskData,
                              taskDescription: e.target.value,
                            });
                          }}
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
                        <div className="ml-25">
                          <i className="feather icon-plus-circle cursor-pointer add-tags" />
                        </div>
                      </div>
                    </div>

                    <div className="card-body pb-1 d-none">
                      {/* quill editor for  Dummy comment */}
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
                                  <circle
                                    className="ql-fill"
                                    cx={6}
                                    cy={7}
                                    r={1}
                                  />{" "}
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
                                    <circle
                                      className="ql-fill"
                                      cx={6}
                                      cy={7}
                                      r={1}
                                    />{" "}
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
                              <span
                                className="dropdown-wrapper"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="ml-25">
                            <i className="feather icon-plus-circle cursor-pointer add-tags" />
                          </div>
                        </div>
                      </div>

                      {/* Dummy Data */}
                    </div>

                    <div className="card-body pb-1">
                      {taskData.id != "" && (
                        <div className="d-flex align-items-center mb-1">
                          <div className="avatar mr-75">
                            <img
                              src={taskAuthor.profile_photo || avatar1}
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
                              (new Date() -
                                new Date("2024-03-14T00:00:00.000Z")) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days ago
                          </small>
                        </div>
                      )}
                      {/* quill editor for comment */}
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
                          <button
                            type="button"
                            className="btn btn-sm btn-primary comment-btn"
                          >
                            <span>Comment</span>
                          </button>
                        </div>
                      </div>
                      <div className="mt-1 d-flex justify-content-between">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-outline-danger add-todo"
                        >
                          Add Task
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-outline-danger update-todo"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {/* form start end*/}
              </div>
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="content-overlay"></div>
          <div className="content-wrapper">
            <div className="content-header row mt-2"></div>
            <div className="content-body">
              {show || isNewTaskModalOpen ? (
                <div className="app-content-overlay show"></div>
              ) : (
                <div className="app-content-overlay"></div>
              )}

              <div className="todo-app-area">
                <div className="todo-app-list-wrapper">
                  <div className="todo-app-list">
                    <div className="todo-fixed-search d-flex justify-content-between align-items-center">
                      <div
                        className="sidebar-toggle d-block d-lg-none"
                        onClick={() => setShow(!show)}
                        onTouchStart={() => setShow(!show)}
                      >
                        <i className="feather icon-menu"></i>
                      </div>
                      <fieldset className="form-group position-relative has-icon-left m-0 flex-grow-1 pl-2">
                        <input
                          type="text"
                          className="form-control todo-search"
                          id="todo-search"
                          placeholder="Search Task"
                        />
                        <div className="form-control-position">
                          <i className="feather icon-search"></i>
                        </div>
                      </fieldset>
                      <div className="todo-sort dropdown mr-1">
                        <button
                          className="btn dropdown-toggle sorting"
                          type="button"
                          id="sortDropdown"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="feather icon-filter"></i>
                          <span>Sort</span>
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="sortDropdown"
                        >
                          <a className="dropdown-item ascending" href="#">
                            Ascending
                          </a>
                          <a className="dropdown-item descending" href="#">
                            Descending
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="todo-task-list list-group">
                      <ul
                        className="todo-task-list-wrapper list-unstyled"
                        id="todo-task-list-drag"
                      >
                        {tasks.map((task, index) => (
                          <li
                            key={index}
                            className="todo-item"
                            data-name={task.assign_user}
                          >
                            <div className={`todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center ${tasks[index].status === 1 ? 'linethrough' : ''}`}>
                              <div className="todo-title-area d-flex">
                                <i className="feather icon-more-vertical handle"></i>
                                {/* map status on checkbox */}

                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`checkbox${index}`}
                                    checked={tasks[index].status === 1}

                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={`checkbox${index}`}
                                  ></label>
                                </div>

                                <div>
                                  <p
                                    className="todo-title mx-50 m-0 truncate"
                                    onClick={() => handleTaskClick(task)}
                                  >
                                    {task.task_title}
                                  </p>
                                </div>
                              </div>
                              <div className="todo-item-action d-flex align-items-center">
                                <div className="todo-badge-wrapper d-flex">
                                  {task.task_tags.split(",").map((tagId) => {
                                    const tag = tags.find(
                                      (tag) => tag.id === parseInt(tagId)
                                    );
                                    if (tag) {
                                      return (
                                        <span
                                          key={tag.id}
                                          className="badge badge-primary badge-pill"
                                          style={{
                                            backgroundColor: `${getBulletClass(
                                              tag.id
                                            )}`,
                                          }}
                                        >
                                          {tag.tasktag_title}
                                        </span>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                                <div className="avatar ml-1">
                                  <img
                                    src="/app-assets/images/portrait/small/avatar-s-1.png"
                                    alt="avatar"
                                    height="30"
                                    width="30"
                                  />
                                </div>
                                <a className="todo-item-favorite ml-75">
                                  <i className="feather icon-star"></i>
                                </a>
                                <a className="todo-item-delete ml-75">
                                  <i className="feather icon-trash-2"></i>
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="no-results">
                        <h5>No Items Found</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </div>
  );
};

export default ToDo;
