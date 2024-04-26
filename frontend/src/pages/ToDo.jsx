import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";
import { getAlltasks } from "../api/todoApis";
import Select from "react-select";
import { getClientPhotographers } from "../api/clientApis";
import _ from "lodash";

const ToDo = () => {
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;

  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [clients, setClients] = useState([]);
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  const [taskData, setTaskData] = useState({
    taskTitle: "",
    taskTags: [],
    assignUser: "",
  });

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
  };

  useEffect(() => {
    if (tasks && tasks.length === 0) {
      getTasks();
    }
    if (clients && clients.length === 0) {
      getClients();
    }
    document.addEventListener("mousedown", handleModalClose);
    return () => {
      document.removeEventListener("mousedown", handleModalClose);
    };
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
                    useState
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
                    <h5 className="new-task-title mb-0">New Task</h5>
                    <button className="mark-complete-btn btn btn-primary btn-sm">
                      <i className="feather icon-check align-middle" />
                      <span className="mark-complete align-middle">
                        Mark Complete
                      </span>
                    </button>
                    <span className="dropdown mr-1">
                      <i className="feather icon-paperclip cursor-pointer mr-50" />
                      <a
                        href="#"
                        className="dropdown-toggle"
                        id="todo-sidebar-dropdown"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <i className="feather icon-more-vertical" />
                      </a>
                      <span
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="todo-sidebar-dropdown"
                      >
                        <a href="#" className="dropdown-item">
                          Add to another project
                        </a>
                        <a href="#" className="dropdown-item">
                          Create follow up task
                        </a>
                        <a href="#" className="dropdown-item">
                          Print
                        </a>
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleNewTaskModal}
                    className="close close-icon"
                  >
                    <i className="feather icon-x align-middle" />
                  </button>
                </div>
                <form id="compose-form" className="mt-1">
                  <div className="card-content">
                    <div className="card-body py-0 border-bottom">
                      <div className="form-group">
                        <textarea
                          name="name"
                          className="form-control task-title"
                          cols={1}
                          rows={2}
                          placeholder="Write a Task Name"
                          required=""
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
                          <div className="select-box mr-1">
                            <Select
                              className="select2 font-sm"
                              styles={{width:'10rem !important'}}
                              name="tags"
                              value={taskData.assignUser.label}
                              onChange={(selectedOption) =>
                                setTaskData({
                                  ...taskData,
                                  assignUser: selectedOption.value,
                                })
                              }
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
                              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                            />
                            {/* <select
                              className="select2-users-name form-control"
                              id="select2-users-name"
                            >
                              <optgroup label="Backend">
                                <option value="David Smith">David Smith</option>
                                <option value="John Doe">John Doe</option>
                                <option value="James Smith">James Smith</option>
                                <option value="Maria Garcia">
                                  Maria Garcia
                                </option>
                              </optgroup>
                              <optgroup label="Frontend">
                                <option value="Maria Rodrigu">
                                  Maria Rodrigu
                                </option>
                                <option value="Marry Smith">Marry Smith</option>
                                <option value="Maria Hern">Maria Hern</option>
                                <option value="Jamesh J">Jamesh Jackson</option>
                              </optgroup>
                            </select> */}
                          </div>
                        </div>
                        <div className="form-group d-flex align-items-center position-relative">
                          {/* date picker */}
                          <div className="date-icon mr-50 font-medium-3">
                            <i className="feather icon-calendar" />
                          </div>
                          <div className="date-picker">
                            <input
                              type="text"
                              className="pickadate form-control pl-1"
                              placeholder="Due Date"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body border-bottom task-description">
                      {/*  Quill editor for task description */}
                      <div className="snow-container border rounded p-50">
                        <div className="compose-editor mx-75" />
                        <div className="d-flex justify-content-end">
                          <div className="compose-quill-toolbar pb-0">
                            <span className="ql-formats mr-0">
                              <button className="ql-bold" />
                              <button className="ql-link" />
                              <button className="ql-image" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="tag d-flex justify-content-between align-items-center pt-1">
                        <div className="flex-grow-1 d-flex align-items-center">
                          <i className="feather icon-tag align-middle mr-25" />
                          {console.log(taskData)}
                          <Select
                            className="select2"
                            name="tags"
                            value={taskData.taskTags.label}
                            onChange={(selectedTags) =>
                              setTaskData({
                                ...taskData,
                                taskTags: selectedTags.map((tag) => tag.value),
                              })
                            }
                            options={tags.map((tag) => ({
                              value: tag.id,
                              label: tag.tasktag_title,
                            }))}
                            isSearchable
                            isMulti={true}
                          />
                        </div>
                        <div className="ml-25">
                          <i className="feather icon-plus-circle cursor-pointer add-tags" />
                        </div>
                      </div>
                    </div>
                    <div className="card-body pb-1">
                      <div className="d-flex align-items-center mb-1">
                        <div className="avatar mr-75">
                          <img
                            src="../../../app-assets/images/portrait/small/avatar-s-3.png"
                            alt="charlie"
                            width={38}
                            height={38}
                          />
                        </div>
                        <div className="avatar-content">
                          Charlie created this task
                        </div>
                        <small className="ml-75 text-muted">13 days ago</small>
                      </div>
                      {/* quill editor for comment */}
                      <div className="snow-container border rounded p-50">
                        <div className="comment-editor mx-75" />
                        <div className="d-flex justify-content-end">
                          <div className="comment-quill-toolbar pb-0">
                            <span className="ql-formats mr-0">
                              <button className="ql-bold" />
                              <button className="ql-link" />
                              <button className="ql-image" />
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
                      <div className="mt-1 d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-outline-danger add-todo"
                        >
                          Add Task
                        </button>
                        <button
                          type="button"
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
                            <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                              <div className="todo-title-area d-flex">
                                <i className="feather icon-more-vertical handle"></i>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`checkbox${index}`}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={`checkbox${index}`}
                                  ></label>
                                </div>
                                <p className="todo-title mx-50 m-0 truncate">
                                  {task.task_title}
                                </p>
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
