import React, { useEffect, useRef, useState } from "react";

const ToDo = () => {
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [show, setShow] = useState(false)

  const modalRef = useRef(null);

  const toggleNewTaskModal = () => {
    setNewTaskModalOpen(!isNewTaskModalOpen);
  };
  const handleModalClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setNewTaskModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleModalClose);
    return () => {
      document.removeEventListener("mousedown", handleModalClose);
    };
  }, []);
  return (
    <div className="todo-application">
      <div className="app-content content">
        <div className={`sidebar-left ${show ? "show" : ""}`}>
          <div className="sidebar">
            <div className="todo-sidebar d-flex">
              <span className="sidebar-close-icon" onClick={() => setShow(!show)} onTouchStart={() => setShow(!show)}>
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
                    <a
                      href="#"
                      className="list-group-item border-0 d-flex align-items-center justify-content-between"
                    >
                      <span>Frontend</span>
                      <span className="bullet bullet-sm bullet-primary"></span>
                    </a>
                    <a
                      href="#"
                      className="list-group-item border-0 d-flex align-items-center justify-content-between"
                    >
                      <span>Backend</span>
                      <span className="bullet bullet-sm bullet-success"></span>
                    </a>
                    <a
                      href="#"
                      className="list-group-item border-0 d-flex align-items-center justify-content-between"
                    >
                      <span>Issue</span>
                      <span className="bullet bullet-sm bullet-danger"></span>
                    </a>
                    <a
                      href="#"
                      className="list-group-item border-0 d-flex align-items-center justify-content-between"
                    >
                      <span>Design</span>
                      <span className="bullet bullet-sm bullet-warning"></span>
                    </a>
                    <a
                      href="#"
                      className="list-group-item border-0 d-flex align-items-center justify-content-between"
                    >
                      <span>Wireframe</span>
                      <span className="bullet bullet-sm bullet-info"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`todo-new-task-sidebar ${isNewTaskModalOpen ? "show" : ""}`}
              style={{ maxHeight: 'inherit', overflowY: 'auto' }}
              ref={modalRef}
            >


              <div className="card shadow-none p-0 m-0">
                <div className="card-header border-bottom py-75">
                  <div className="task-header d-flex justify-content-between align-items-center">
                    <h5 className="new-task-title mb-0">New Task</h5>
                    <button className="mark-complete-btn btn btn-primary btn-sm">
                      <i className="feather icon-check align-middle" />
                      <span className="mark-complete align-middle">Mark Complete</span>
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
                  <button type="button" onClick={toggleNewTaskModal} className="close close-icon">
                    <i className="feather icon-x align-middle" />
                  </button>
                </div>
                {/* form start */}
                <form id="compose-form" className="mt-1">
                  <div className="card-content">
                    <div className="card-body py-0 border-bottom">
                      <div className="form-group">
                        {/* text area for task title */}
                        <textarea
                          name="title"
                          className="form-control task-title"
                          cols={1}
                          rows={2}
                          placeholder="Write a Task Name"
                          required=""
                          defaultValue={"                      "}
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
                          {/* select2  for user name  */}
                          <div className="select-box mr-1">
                            <select
                              className="select2-users-name form-control"
                              id="select2-users-name"
                            >
                              <optgroup label="Backend">
                                <option value="David Smith">David Smith</option>
                                <option value="John Doe">John Doe</option>
                                <option value="James Smith">James Smith</option>
                                <option value="Maria Garcia">Maria Garcia</option>
                              </optgroup>
                              <optgroup label="Frontend">
                                <option value="Maria Rodrigu">Maria Rodrigu</option>
                                <option value="Marry Smith">Marry Smith</option>
                                <option value="Maria Hern">Maria Hern</option>
                                <option value="Jamesh J">Jamesh Jackson</option>
                              </optgroup>
                            </select>
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
                          <select
                            className="select2-assign-label form-control"
                            multiple="multiple"
                            id="select2-assign-label"
                            disabled=""
                          >
                            <optgroup label="Tags">
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="Issue">Issue</option>
                              <option value="Design">Design</option>
                              <option value="Wireframe">Wireframe</option>
                            </optgroup>
                          </select>
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
                        <div className="avatar-content">Charlie created this task</div>
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
                        <button type="button" className="btn btn-outline-danger add-todo">
                          Add Task
                        </button>
                        <button type="button" className="btn btn-outline-danger update-todo">
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
              {show || isNewTaskModalOpen ? <div
                className="app-content-overlay show"></div> : <div
                  className="app-content-overlay"></div>}

              {/* <div
                className={`app-content-overlay ${isNewTaskModalOpen ? "show" : ""
                  }`}
              ></div> */}
              <div className="todo-app-area">
                <div className="todo-app-list-wrapper">
                  <div className="todo-app-list">
                    <div className="todo-fixed-search d-flex justify-content-between align-items-center">
                    <div className="sidebar-toggle d-block d-lg-none" onClick={() => setShow(!show)} onTouchStart={() => setShow(!show)}>
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
                        <li className="todo-item" data-name="David Smith">
                          <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                            <div className="todo-title-area d-flex">
                              <i className="feather icon-more-vertical handle"></i>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkbox1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="checkbox1"
                                ></label>
                              </div>
                              <p className="todo-title mx-50 m-0 truncate">
                                Effective Hypnosis Quit Smoking Methods
                              </p>
                            </div>
                            <div className="todo-item-action d-flex align-items-center">
                              <div className="todo-badge-wrapper d-flex">
                                <span className="badge badge-primary badge-pill">
                                  Frontend
                                </span>
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
                        <li className="todo-item" data-name="John Doe">
                          <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                            <div className="todo-title-area d-flex">
                              <i className="feather icon-more-vertical handle"></i>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkbox2"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="checkbox2"
                                ></label>
                              </div>
                              <p className="todo-title mx-50 m-0 truncate">
                                How To Protect Your Computer Very Useful Tips
                              </p>
                            </div>
                            <div className="todo-item-action d-flex align-items-center">
                              <div className="todo-badge-wrapper d-flex"></div>
                              <div className="avatar ml-1">
                                <img
                                  src="/app-assets/images/portrait/small/avatar-s-2.png"
                                  alt="avatar"
                                  height="30"
                                  width="30"
                                />
                              </div>
                              <a className="todo-item-favorite ml-75 warning">
                                <i className="feather icon-star"></i>
                              </a>
                              <a className="todo-item-delete ml-75">
                                <i className="feather icon-trash-2"></i>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="todo-item" data-name="James Smith">
                          <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                            <div className="todo-title-area d-flex">
                              <i className="feather icon-more-vertical handle"></i>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkbox14"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="checkbox14"
                                ></label>
                              </div>
                              <p className="todo-title mx-50 m-0 truncate">
                                It is a good idea to think of your PC as an
                                office.
                              </p>
                            </div>
                            <div className="todo-item-action d-flex align-items-center">
                              <div className="todo-badge-wrapper d-flex">
                                <span className="badge badge-primary badge-pill">
                                  Frontend
                                </span>
                              </div>
                              <div className="avatar ml-1">
                                <img
                                  src="/app-assets/images/portrait/small/avatar-s-3.png"
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
                        <li className="todo-item" data-name="Maria Garcia">
                          <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                            <div className="todo-title-area d-flex">
                              <i className="feather icon-more-vertical handle"></i>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkbox4"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="checkbox4"
                                ></label>
                              </div>
                              <p className="todo-title mx-50 m-0 truncate">
                                Don't Let The Outtakes Take You Out
                              </p>
                            </div>
                            <div className="todo-item-action d-flex align-items-center">
                              <div className="todo-badge-wrapper d-flex">
                                <span className="badge badge-danger badge-pill ml-50">
                                  Issue
                                </span>
                                <span className="badge badge-pill badge-success ml-50">
                                  Backend
                                </span>
                              </div>
                              <div className="avatar ml-1">
                                <img
                                  src="../../../app-assets/images/portrait/small/avatar-s-4.png"
                                  alt="avatar"
                                  height="30"
                                  width="30"
                                />
                              </div>
                              <a className="todo-item-favorite ml-75 warning">
                                <i className="feather icon-star"></i>
                              </a>
                              <a className="todo-item-delete ml-75">
                                <i className="feather icon-trash-2"></i>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li className="todo-item" data-name="Maria Rodrigu">
                          <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                            <div className="todo-title-area d-flex">
                              <i className="feather icon-more-vertical handle"></i>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkbox5"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="checkbox5"
                                ></label>
                              </div>
                              <p className="todo-title mx-50 m-0 truncate">
                                Sony laptops are among the most well known
                                laptops on today
                              </p>
                            </div>
                            <div className="todo-item-action d-flex align-items-center">
                              <div className="todo-badge-wrapper d-flex"></div>
                              <div className="avatar ml-1">
                                <img
                                  src="../../../app-assets/images/portrait/small/avatar-s-5.png"
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
                        <li className="todo-item" data-name="Marry Smith">
                          <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                            <div className="todo-title-area d-flex">
                              <i className="feather icon-more-vertical handle"></i>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkbox6"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="checkbox6"
                                ></label>
                              </div>
                              <p className="todo-title mx-50 m-0 truncate">
                                Success Steps htmlFor Your Personal Or Business Life
                              </p>
                            </div>
                            <div className="todo-item-action d-flex align-items-center">
                              <div className="todo-badge-wrapper d-flex"></div>
                              <div className="avatar ml-1">
                                <img
                                  src="../../../app-assets/images/portrait/small/avatar-s-6.png"
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
                        <li className="todo-item" data-name="Maria Hern">
                          <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                            <div className="todo-title-area d-flex">
                              <i className="feather icon-more-vertical handle"></i>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="checkbox7"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="checkbox7"
                                ></label>
                              </div>
                              <p className="todo-title mx-50 m-0 truncate">
                                Believing Is The Absence Of Doubt
                              </p>
                            </div>
                            <div className="todo-item-action d-flex align-items-center">
                              <div className="todo-badge-wrapper d-flex"></div>
                              <div className="avatar ml-1">
                                <img
                                  src="../../../app-assets/images/portrait/small/avatar-s-7.png"
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
