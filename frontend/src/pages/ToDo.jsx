import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/authContext";
import {
  getAlltasks,
  createTask,
  addComment,
  setTaskStatus,
  deleteTask,
  setTaskFavorite,
  createTag,
  deleteTag,
} from "../api/todoApis";
import Select from "react-select";
import { getClient, getClientPhotographers } from "../api/clientApis";
import _ from "lodash";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import DeleteModal from "../components/DeleteModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReTooltip from "../components/Tooltip";
import AddTagModal from "../components/AddTagModal";
import { IconButton, Tooltip } from "@mui/material";
import moment from "moment";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const ToDo = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const userId = user.id;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const accessToken = authData.token;
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [activeFilter, setActiveFilter] = useState("All");
  const [theSortOrder, setTheSortOrder] = useState("");
  const [tags, setTags] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const modalRef = useRef(null);
  const [tagId, setTagId] = useState("");
  const [showDeleteTagModal, setShowDeleteTagModal] = useState(false);
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
    isFavourite: 0,
  });
  const [comments, setComments] = useState([]);
  const [taskAuthor, setTaskAuthor] = useState({ name: "", profile_photo: "" });
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    const formData = new FormData();
    formData.append("subdomain_id", subdomainId);
    formData.append("role_id", roleId);
    formData.append("user_id", userId);
    const response = await getAlltasks(formData);
    if (response.success) {
      const sortedTasks = _.orderBy(response.tasks, ["created_at"], ["desc"]);
      const sortedTasksWithStatus = _.orderBy(sortedTasks, ["status"], ["asc"]);
      setTasks(sortedTasksWithStatus);
      setFilteredTasks(sortedTasksWithStatus);
      setTags(response.tags);
    } else {
      toast.error("Failed to get tasks!");
    }
  };

  const getClients = async () => {
    const formData = new FormData();
    if (subdomainId === "") {
      formData.append("subdomain_id", user.id);
    } else {
      formData.append("subdomain_id", subdomainId);
    }
    const response = await getClientPhotographers(formData);
    if (response.success) {
      if (roleId !== 3) {
        setClients(response.data);
      } else {
        // filter to only add clients with role_id 2
        const filteredClients = response.data.filter(
          (client) => client.role_id === 2
        );
        setClients(filteredClients);
      }
    } else {
      toast.error("Failed to get clients!");
    }
  };

  const handleTextChange = (value) => {
    setTaskData({
      ...taskData,
      taskDescription: value,
    });
  };

  const toggleNewTaskModal = () => {
    setNewTaskModalOpen(!isNewTaskModalOpen);
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
      isFavourite: 0,
    });
    setSelectedClient([]);
    setSelectedTags([]);
    setComments([]);
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

    if (taskData.taskTitle === "") {
      toast.error("Task title is required!");
      return;
    }
    if (selectedClient.value === undefined) {
      toast.error("Assigned user is required!");
      return;
    }

    if (taskData.userId === "") {
      formData.append("user_id", userId);
    } else {
      formData.append("user_id", taskData.userId);
    }

    const formattedTags = selectedTags.map((tag) => tag.value).join(",");
    formData.append("id", taskData.id);
    formData.append("task_tags", formattedTags);
    formData.append("subdomain_id", subdomainId);
    formData.append("role_id", roleId);
    formData.append("task_title", taskData.taskTitle);
    formData.append("assign_user", selectedClient.value);
    formData.append("task_assigndate", taskData.taskAssigndate);
    formData.append("task_description", taskData.taskDescription);
    formData.append("comments", taskData.comment);
    formData.append("status", taskData.status);
    formData.append("is_favourite", taskData.isFavourite);

    try {
      const response = await createTask(formData);
      if (response.success) {
        if (taskData.id == "") {
          toast.success("Task created successfully!");
        } else {
          toast.success("Task updated successfully!");
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
          isFavourite: 0,
        });
        setSelectedClient([]);
        setSelectedTags([]);
        setNewTaskModalOpen(false);
        setComments([]);
        setTaskAuthor({ name: "", profile_photo: "" });
      } else {
        toast.error("Failed to create task!");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
    getTasks();
  };

  const handleComment = async () => {
    const formData = new FormData();
    formData.append("task_id", taskData.id);
    formData.append("user_id", userId);
    formData.append("comments", taskData.comment);
    formData.append("subdomain_id", subdomainId);
    try {
      const response = await addComment(formData);
      if (response.success) {
        toast.success("Comment added successfully!");
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
          isFavourite: 0,
        });
        toggleNewTaskModal();
      } else {
        toast.error("Failed to add comment!");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
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
      comment: "",
      isFavourite: task.is_favourite,
    });

    const client = clients.find((c) => c.id === task.assign_user);

    if (client) {
      setSelectedClient({
        value: client.id,
        label: client.name,
        profile_photo: client.profile_photo,
      });
    }

    setTaskAuthor(task.author);
    let tagIds = [];

    console.log(task.task_tags);
    if (task.task_tags !== "") {
      tagIds = task.task_tags.split(",").map((id) => parseInt(id));
    }

    console.log(tagIds);

    let taskTags = [];
    if (tagIds.length > 0) {
      taskTags = tags.filter((tag) => tagIds.includes(tag.id));
    }

    console.log(taskTags);

    taskTags = taskTags.map((tag) => ({
      value: tag.id,
      label: tag.tasktag_title,
    }));
    setSelectedTags(taskTags);

    setComments(task.TaskComments);

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

  const handleStatusCheckbox = async (data) => {
    let task = data;
    let formData = new FormData();
    formData.append("id", task.id);
    let newstatus = task.status === 1 ? 0 : 1;
    formData.append("status", newstatus);

    const response = await setTaskStatus(formData);
    if (response.success) {
      toast.success("Status updated successfully!");
      getTasks();
    } else {
      toast.error("Failed to update status!");
    }
  };

  const handleTaskDelete = async () => {
    let formData = new FormData();
    formData.append("id", taskId);
    const response = await deleteTask(formData);
    if (response.success) {
      toast.success("Task deleted successfully!");
      getTasks();
      setShowDeleteModal(false);
    } else {
      toast.error("Failed to delete task!");
    }
  };

  const handleTaskFavorite = async (data) => {
    let formData = new FormData();
    formData.append("id", data.id);
    let newstatus = data.is_favourite === 1 ? 0 : 1;
    formData.append("is_favourite", newstatus);

    const response = await setTaskFavorite(formData);
    if (response.success) {
      getTasks();
      setShowDeleteModal(false);
    } else {
      toast.error("Failed to update favorite status!");
    }
  };

  const filterTasks = (filter, sortOrder) => {
    let filteredList = tasks;

    if (typeof filter !== "undefined") {
      if (filter === "All") {
        setFilteredTasks(tasks);
      } else if (filter === "Favorites") {
        filteredList = tasks.filter((task) => task.is_favourite === 1);
      } else if (filter === "Done") {
        filteredList = tasks.filter((task) => task.status === 1);
      }
      setActiveFilter(filter);
    }

    if (typeof sortOrder !== "undefined") {
      if (sortOrder === "Ascending") {
        filteredList = filteredList
          .slice()
          .sort((a, b) => a.task_title.localeCompare(b.task_title));
      } else if (sortOrder === "Descending") {
        filteredList = filteredList
          .slice()
          .sort((a, b) => b.task_title.localeCompare(a.task_title));
      }
      setTheSortOrder(sortOrder);
    }
    setFilteredTasks(filteredList);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFilteredTasks(items);
  };

  const handleAddTag = async (data) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("tasktag_title", data);
    formData.append("subdomain_id", subdomainId);
    const response = await createTag(formData);
    if (response.success) {
      toast.success("Tag added successfully!");
      getTasks();
    } else {
      toast.error("Failed to add tag!");
    }
    setShowAddTagModal(!showAddTagModal);
    setLoading(false);
  };

  const handleTagDelete = async (data) => {
    let formData = new FormData();
    formData.append("id", data);
    const response = await deleteTag(formData);
    if (response.success) {
      toast.success("Tag deleted successfully!");
      getTasks();
      setShowDeleteModal(false);
    } else {
      toast.error("Failed to delete tag!");
    }
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
                    <a
                      href="#"
                      className={`list-group-item border-0 ${
                        activeFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => filterTasks("All")}
                    >
                      {" "}
                      <span className="fonticon-wrap mr-50">
                        <i className="feather icon-align-justify"></i>
                      </span>
                      <span> All</span>
                    </a>
                  </div>
                  <p className="filter-label mt-2 mb-1 pt-25">Filters</p>
                  <div className="list-group">
                    <a
                      href="#"
                      className={`list-group-item border-0 ${
                        activeFilter === "Favorites" ? "active" : ""
                      }`}
                      onClick={() => filterTasks("Favorites")}
                    >
                      <span className="fonticon-wrap mr-50">
                        <i className="feather icon-star"></i>
                      </span>
                      <span>Favourites</span>
                    </a>
                    <a
                      href="#"
                      className={`list-group-item border-0 ${
                        activeFilter === "Done" ? "active" : ""
                      }`}
                      onClick={() => filterTasks("Done")}
                    >
                      <span className="fonticon-wrap mr-50">
                        <i className="feather icon-check"></i>
                      </span>
                      <span>Done</span>
                    </a>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="filter-label mt-2 mb-1">Labels</p>
                    <ReTooltip title="Adds new tag." placement="top">
                      <button
                        className="btn btn-primary btn-sm mt-2 mb-1"
                        style={{ padding: "5px" }}
                        onClick={() => setShowAddTagModal(!showAddTagModal)}
                      >
                        <i className="feather icon-plus"></i>
                      </button>
                    </ReTooltip>
                  </div>
                  <div className="list-group">
                    {tags.map((tag, index) => (
                      <Tooltip
                        key={index}
                        placement="right"
                        arrow
                        title={
                          <React.Fragment>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                handleTagDelete(tag.id);
                              }}
                            >
                              Delete
                            </button>
                          </React.Fragment>
                        }
                      >
                        <p
                          className="list-group-item border-0 d-flex align-items-center justify-content-between my-0 cursor-pointer"
                          style={{ padding: "4px" }}
                        >
                          <span>{tag.tasktag_title}</span>
                          <span
                            className={`bullet bullet-sm`}
                            style={{
                              backgroundColor: `${getBulletClass(tag.id)}`,
                            }}
                          ></span>
                        </p>
                      </Tooltip>
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
                          autoComplete="off"
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
                          <div
                            className="select-box mr-1"
                            style={{ width: "10rem" }}
                          >
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
                                  label:
                                    key === "2" ? "Photographers" : "Clients",
                                  options: value.map((client) => ({
                                    value: client.id,
                                    label: client.name,
                                    profile_photo: client.profile_photo,
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
                          id="taskDescription"
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
                        <div className="ml-25">
                          <i className="feather icon-plus-circle cursor-pointer add-tags" />
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
                            id="taskDescription2"
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
                              name="assign-label"
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
                                        name="search-tasks"
                                        id="search-tasks"
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
                    </div>

                    <div className="card-body pb-1">
                      {taskData.id != "" && (
                        <div className="d-flex align-items-center mb-1">
                          <div className="avatar mr-75">
                            <img
                              src={
                                taskAuthor.profile_photo
                                  ? `${IMAGE_URL}/${taskAuthor.profile_photo}`
                                  : avatar1
                              }
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
                              (new Date() - new Date(taskData.taskAssigndate)) /
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
                            onClick={(e) => {
                              e.preventDefault();
                              handleComment();
                            }}
                          >
                            <span>Comment</span>
                          </button>
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
                          <a
                            className="dropdown-item ascending"
                            href="#"
                            onClick={() =>
                              filterTasks(activeFilter, "Ascending")
                            }
                          >
                            Ascending
                          </a>
                          <a
                            className="dropdown-item descending"
                            href="#"
                            onClick={() =>
                              filterTasks(activeFilter, "Descending")
                            }
                          >
                            Descending
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="todo-task-list list-group">
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="todo-task-list-drag">
                          {(provided) => (
                            <ul
                              className="todo-task-list-wrapper list-unstyled"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {filteredTasks.map((task, index) => (
                                <Draggable
                                  key={task.id.toString()}
                                  draggableId={task.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="todo-item item-todo"
                                      data-name={task.assign_user}
                                    >
                                      <div
                                        className={`todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center`}
                                      >
                                        <div className="todo-title-area d-flex">
                                          <i className="feather icon-more-vertical handle"></i>

                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id={`checkbox${index}`}
                                              checked={
                                                filteredTasks[index].status ===
                                                1
                                              }
                                              onChange={(e) => {
                                                e.preventDefault();
                                                handleStatusCheckbox(
                                                  filteredTasks[index]
                                                );
                                              }}
                                            />

                                            <label
                                              className="custom-control-label"
                                              htmlFor={`checkbox${index}`}
                                            ></label>
                                          </div>

                                          <div>
                                            <p
                                              className={`todo-title mx-50 m-0 truncate `}
                                              onClick={() =>
                                                handleTaskClick(task)
                                              }
                                              style={{
                                                textDecoration:
                                                  task.status === 1
                                                    ? "line-through"
                                                    : "none",
                                              }}
                                            >
                                              {task.task_title}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="todo-item-action d-flex align-items-center">
                                          <div
                                            className="task-info"
                                            style={{ marginRight: "4px" }}
                                          >
                                            <small className="text-muted">
                                              {moment(task.created_at).format(
                                                "MMMM Do YYYY, h:mm:ss a"
                                              )}
                                            </small>
                                          </div>

                                          <div className="todo-badge-wrapper d-flex">
                                            {task.task_tags
                                              .split(",")
                                              .map((tagId) => {
                                                const tag = tags.find(
                                                  (tag) =>
                                                    tag.id === parseInt(tagId)
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
                                                        marginRight: "4px",
                                                      }}
                                                    >
                                                      {tag.tasktag_title}
                                                    </span>
                                                  );
                                                }
                                                return null;
                                              })}
                                          </div>
                                          <div className="avatar">
                                            <img
                                              src={
                                                task.author.profile_photo
                                                  ? `${IMAGE_URL}/${task.author.profile_photo}`
                                                  : avatar1
                                              }
                                              alt="charlie"
                                              width={38}
                                              height={38}
                                            />
                                          </div>
                                          <a
                                            className="todo-item-favorite ml-75"
                                            onClick={() =>
                                              handleTaskFavorite(
                                                filteredTasks[index]
                                              )
                                            }
                                          >
                                            {filteredTasks[index]
                                              .is_favourite == 0 ? (
                                              <i className="feather icon-star "></i>
                                            ) : (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 24 24"
                                                fill="orange"
                                                stroke="orange"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-star"
                                              >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                              </svg>
                                            )}
                                          </a>
                                          <a className="todo-item-delete ml-75">
                                            <i
                                              className="feather icon-trash-2"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                setTaskId(task.id);
                                                setShowDeleteModal(true);
                                              }}
                                            ></i>
                                          </a>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </ul>
                          )}
                        </Droppable>
                      </DragDropContext>
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

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleTaskDelete}
        message="Are you sure you want to delete this task?"
      />
      <AddTagModal
        showAddTagModal={showAddTagModal}
        setShowAddTagModal={() => setShowAddTagModal(!showAddTagModal)}
        onAddTag={handleAddTag}
      />
    </div>
  );
};

export default ToDo;
