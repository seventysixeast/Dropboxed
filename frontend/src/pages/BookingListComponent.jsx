import React from "react";
// import "../app-assets/css/core/menu/menu-types/vertical-menu-modern.css";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import avatar5 from "../app-assets/images/portrait/small/avatar-s-14.png";
import avatar6 from "../app-assets/images/portrait/small/avatar-s-15.png";
import avatar7 from "../app-assets/images/portrait/small/avatar-s-4.png";
import avatar8 from "../app-assets/images/portrait/small/avatar-s-11.png";
import avatar9 from "../app-assets/images/portrait/small/avatar-s-19.png";
import avatar10 from "../app-assets/images/portrait/small/avatar-s-20.png";
import { Link } from "react-router-dom";

export const BookingListComponent = () => {
    return (
        <>
            {/* <!-- BEGIN: Main Menu--> */}
            <div
                className="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
                data-scroll-to-active="true"
            >
                <div className="main-menu-content">
                    <ul
                        className="navigation navigation-main"
                        id="main-menu-navigation"
                        data-menu="menu-navigation"
                    >
                        <li className=" navigation-header">
                            <span>General</span>
                            <i
                                className=" feather icon-minus"
                                data-toggle="tooltip"
                                data-placement="right"
                                data-original-title="General"
                            ></i>
                        </li>
                        <li className=" nav-item">
                            <Link to="/dashboard">
                                <i className="feather icon-home"></i>
                                <span className="menu-title" data-i18n="Dashboard">
                                    Dashboard
                                </span>
                                {/* <span className="badge badge badge-primary badge-pill float-right mr-2">
                  3
                </span> */}
                            </Link>
                        </li>
                        <li className=" nav-item">
                            <Link to="/service">
                                <i className="feather icon-monitor"></i>
                                <span className="menu-title" data-i18n="Templates">
                                    Service
                                </span>
                            </Link>
                        </li>
                        <li className=" nav-item">
                            <Link to="/downloafd">
                                <i className="feather icon-layout"></i>
                                <span className="menu-title" data-i18n="Layouts">
                                    Download
                                </span>
                            </Link>
                        </li>

                        <li className=" nav-item">
                            <Link to="/invoice">
                                <i className="feather icon-file-text"></i>
                                <span className="menu-title" data-i18n="Invoice">
                                    Invoice List
                                </span>
                            </Link>
                        </li>

                        <li className=" nav-item">
                            <Link to="/booking-list">
                                <i className="feather icon-zap"></i>
                                <span className="menu-title" data-i18n="Starter kit">
                                    Booking List
                                </span>
                                <span className="badge badge badge-primary badge-pill float-right mr-2">
                                    2
                                </span>
                            </Link>
                        </li>

                        <li className=" nav-item">
                            <Link to="/todo">
                                <i className="feather icon-check-square"></i>
                                <span className="menu-title" data-i18n="Todo Application">
                                    To Do
                                </span>
                            </Link>
                        </li>

                        <li className=" nav-item">
                            <Link to="/notifications">
                                <i className="feather icon-mail"></i>
                                <span className="menu-title" data-i18n="Email Application">
                                    Notifications
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <!-- END: Main Menu--> */}

            {/* <!-- BEGIN: Content--> */}

            <div className="app-content content">
                <div className="content-overlay" />
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2">
                            <h3 className="content-header-title mb-0">Notifications</h3>
                            <div className="row breadcrumbs-top">
                                <div className="breadcrumb-wrapper col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">Home</a>
                                        </li>
                                        {/* <li className="breadcrumb-item">
                                            <a href="#">Invoice</a>
                                        </li> */}
                                        <li className="breadcrumb-item active">Notifications</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* <div className="content-header-right col-md-6 col-12 mb-md-0 mb-2">
                            <div
                                className="btn-group float-md-right"
                                role="group"
                                aria-label="Button group with nested dropdown"
                            >
                                <div className="btn-group" role="group">
                                    <button
                                        className="btn btn-outline-primary dropdown-toggle dropdown-menu-right"
                                        id="btnGroupDrop1"
                                        type="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="feather icon-settings icon-left" /> Settings
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                        <a className="dropdown-item" href="card-bootstrap.html">
                                            Bootstrap Cards
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="component-buttons-extended.html"
                                        >
                                            Buttons Extended
                                        </a>
                                    </div>
                                </div>
                                <a
                                    className="btn btn-outline-primary"
                                    href="full-calender-basic.html"
                                >
                                    <i className="feather icon-mail" />
                                </a>
                                <a className="btn btn-outline-primary" href="timeline-center.html">
                                    <i className="feather icon-pie-chart" />
                                </a>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="content-body">
                        <div className="row mb-1 mt-1 mt-md-0">
                            <div className="col-12">
                                <a href="invoice-add.html" className="btn btn-primary">
                                    Create Invoice
                                </a>
                            </div>
                        </div>
                        
                    </div> */}
                    <div className="users-list-table">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    {/* datatable start */}
                                    <div className="table-responsive">
                                        <table id="users-list-datatable" className="table">
                                            <thead>
                                                <tr>
                                                    <th>S.no.</th>
                                                    <th>Company Name</th>
                                                    <th>Company Email</th>
                                                    <th className="d-none">last activity</th>
                                                    <th className="d-none">verified</th>
                                                    <th className="d-none">role</th>
                                                    <th>status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>300</td>
                                                    <td className="d-none">
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            dean3004
                                                        </a>
                                                    </td>
                                                    <td>Dean Stanley</td>
                                                    <td>amrit@mail.com</td>
                                                    <td className="d-none">No</td>
                                                    <td className="d-none">Staff</td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>301</td>
                                                    <td className="d-none">
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            zena0604
                                                        </a>
                                                    </td>
                                                    <td>Zena Buckley</td>
                                                    <td>zena@mail.com</td>
                                                    <td className="d-none">Yes</td>
                                                    <td className="d-none">User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                    <td>302</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            delilah0301
                                                        </a>
                                                    </td>
                                                    <td>Delilah Moon</td>
                                                    <td>03/01/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>303</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            hillary1807
                                                        </a>
                                                    </td>
                                                    <td>Hillary Rasmussen</td>
                                                    <td>18/07/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>304</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            herman2003
                                                        </a>
                                                    </td>
                                                    <td>Herman Tate</td>
                                                    <td>20/03/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>305</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            kuame3008
                                                        </a>
                                                    </td>
                                                    <td>Kuame Ford</td>
                                                    <td>30/08/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>306</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            fulton2009
                                                        </a>
                                                    </td>
                                                    <td>Fulton Stafford</td>
                                                    <td>20/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>307</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            piper0508
                                                        </a>
                                                    </td>
                                                    <td>Piper Jordan</td>
                                                    <td>05/08/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>308</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            neil1002
                                                        </a>
                                                    </td>
                                                    <td>Neil Sosa</td>
                                                    <td>10/02/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>309</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            caldwell2402
                                                        </a>
                                                    </td>
                                                    <td>Caldwell Chapman</td>
                                                    <td>24/02/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>310</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            wesley0508
                                                        </a>
                                                    </td>
                                                    <td>Wesley Oneil</td>
                                                    <td>05/08/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>311</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            tallulah2009
                                                        </a>
                                                    </td>
                                                    <td>Tallulah Fleming</td>
                                                    <td>20/09/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>312</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            iris2505
                                                        </a>
                                                    </td>
                                                    <td>Iris Maddox</td>
                                                    <td>25/05/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>313</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            caleb1504
                                                        </a>
                                                    </td>
                                                    <td>Caleb Bradley</td>
                                                    <td>15/04/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>314</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            illiana0410
                                                        </a>
                                                    </td>
                                                    <td>Illiana Grimes</td>
                                                    <td>04/10/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>315</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            chester0902
                                                        </a>
                                                    </td>
                                                    <td>Chester Estes</td>
                                                    <td>09/02/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>316</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            gregory2309
                                                        </a>
                                                    </td>
                                                    <td>Gregory Hayden</td>
                                                    <td>23/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>317</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            jescie1802
                                                        </a>
                                                    </td>
                                                    <td>Jescie Parker</td>
                                                    <td>18/02/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>318</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            sydney3101
                                                        </a>
                                                    </td>
                                                    <td>Sydney Cabrera</td>
                                                    <td>31/01/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>319</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            gray2702
                                                        </a>
                                                    </td>
                                                    <td>Gray Valenzuela</td>
                                                    <td>27/02/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>320</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            hoyt0305
                                                        </a>
                                                    </td>
                                                    <td>Hoyt Ellison</td>
                                                    <td>03/05/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>321</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            damon0209
                                                        </a>
                                                    </td>
                                                    <td>Damon Berry</td>
                                                    <td>02/09/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>322</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            kelsie0511
                                                        </a>
                                                    </td>
                                                    <td>Kelsie Dunlap</td>
                                                    <td>05/11/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>323</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            abel1606
                                                        </a>
                                                    </td>
                                                    <td>Abel Dunn</td>
                                                    <td>16/06/2020</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>324</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            nina2208
                                                        </a>
                                                    </td>
                                                    <td>Nina Byers</td>
                                                    <td>22/08/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>325</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            erasmus1809
                                                        </a>
                                                    </td>
                                                    <td>Erasmus Walter</td>
                                                    <td>18/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>326</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            yael2612
                                                        </a>
                                                    </td>
                                                    <td>Yael Marshall</td>
                                                    <td>26/12/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-warning">Close</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>327</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            thomas2012
                                                        </a>
                                                    </td>
                                                    <td>Thomas Dudley</td>
                                                    <td>20/12/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>328</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            althea2810
                                                        </a>
                                                    </td>
                                                    <td>Althea Turner</td>
                                                    <td>28/10/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>329</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            jena2206
                                                        </a>
                                                    </td>
                                                    <td>Jena Schroeder</td>
                                                    <td>22/06/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>330</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            hyacinth2201
                                                        </a>
                                                    </td>
                                                    <td>Hyacinth Maxwell</td>
                                                    <td>22/01/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>331</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            madeson1907
                                                        </a>
                                                    </td>
                                                    <td>Madeson Byers</td>
                                                    <td>19/07/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>332</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            elmo0707
                                                        </a>
                                                    </td>
                                                    <td>Elmo Tran</td>
                                                    <td>07/07/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>333</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            shelley0309
                                                        </a>
                                                    </td>
                                                    <td>Shelley Eaton</td>
                                                    <td>03/09/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>334</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            graham0301
                                                        </a>
                                                    </td>
                                                    <td>Graham Flores</td>
                                                    <td>03/01/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                    <td>
                                                        <span className="badge badge-danger">Banned</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>335</td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-view.html">
                                                            erasmus2110
                                                        </a>
                                                    </td>
                                                    <td>Erasmus Mclaughlin</td>
                                                    <td>21/10/2019</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                    <td>
                                                        <span className="badge badge-success">Active</span>
                                                    </td>
                                                    <td>
                                                        <a href="../../../html/ltr/vertical-menu-template/page-users-edit.html">
                                                            <i className="feather icon-edit-1" />
                                                        </a>
                                                    </td>
                                                </tr> */}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* datatable ends */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* <!-- END: Content--> */}

            <div className="sidenav-overlay"></div>
            <div className="drag-target"></div>
        </>
    );
};
