import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { newBooking } from "../api/bookingApis";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export const BookingListComponent = () => {
  const [providers, setProviders] = useState([]);
  const [packages, setPackages] = useState([]);
  const [packagePrice, setPackagePrices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState();
  const [selectedPackagePrice, setSelectedPackagePrice] = useState();
  const bookings = [
    {
      title: "Booking 1",
      package: "Studio",
      services: "Studio Photography",
      prefferedDate: new Date("2024-04-01T10:00:00"),
      fromTime: "10:00",
      toTime: "12:00",
      client: "Peter",
      comment: "First booking comment",
    },
    {
      title: "Booking 2",
      package: "Essential",
      services: "Essential Floor Plan",
      prefferedDate: new Date("2024-04-05T13:00:00"),
      fromTime: "13:00",
      toTime: "15:00",
      client: "Admin",
      comment: "Second booking comment",
    },
    {
      title: "Booking 3",
      package: "Premium",
      services: "Premium Photography",
      prefferedDate: new Date("2024-04-10T16:00:00"),
      fromTime: "16:00",
      toTime: "18:00",
      client: "Belle",
      comment: "Third booking comment",
    },
  ];

  const events = bookings.map((booking, index) => ({
    id: index,
    title: booking.title,
    start: booking.prefferedDate,
    end: booking.prefferedDate,
  }));
  console.log(events);
  const [bookingData, setBookingData] = useState({
    title: "",
    package: "",
    services: "",
    prefferedDate: new Date(),
    fromTime: "",
    toTime: "",
    client: "",
    comment: "",
    provider: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingDataToSend = {
        user_id: 77777,
        booking_title: bookingData.title,
        client_name: bookingData.client,
        client_address: bookingData.title,
        package: 1,
        package_ids: bookingData.services,
        photographer_id: 12,
        booking_date: bookingData.prefferedDate,
        booking_time: bookingData.fromTime,
        booking_time_to: bookingData.toTime,
        booking_status: 1, // Example booking status, replace with actual value
        comment: bookingData.comment,
      };
      console.log(bookingDataToSend);
      await newBooking(bookingDataToSend);
      // Handle success
    } catch (error) {
      console.error("Failed to add booking:", error.message);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProviders = async () => {
      if (providers.length === 0) {
        try {
          const response = await fetch(
            "http://localhost:6977/booking/providers"
          );
          const data = await response.json();
          setProviders(data.usersWithRoleId1);
          setPackages(data.packages);
          const prices = data.packages.map((pack) => ({
            id: pack.id,
            price: pack.package_price,
          }));
          setPackagePrices(prices);
        } catch (error) {
          console.error("Error fetching providers:", error.message);
        }
      }
    };

    fetchProviders();
  }, []);

  const handleSelectedChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSelectedPackage(value);
    setSelectedPackagePrice(
      packagePrice.find((price) => price.id === parseInt(value)).price
    );
  };
  console.log(selectedPackage);

  return (
    <>
      <div className="app-content content">
        <div className={`content-overlay`}></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-6 mb-2">
              <h3 className="content-header-title mb-0">Booking List</h3>
              <div className="row breadcrumbs-top">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Bookings</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center mb-2">
              <ul className="list-inline mb-0">
                <li>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-block"
                      data-toggle="modal"
                      data-target="#bootstrap"
                    >
                      New Appointment
                    </button>

                    <div
                      className="modal fade text-left"
                      id="bootstrap"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="myModalLabel35"
                      aria-hidden="true"
                      style={{ display: "none" }}
                    >
                      <div className="modal-dialog modal-md " role="document">
                        <div className="modal-content">
                          <div
                            className="modal-header"
                            style={{ backgroundColor: "#DEE6EE" }}
                          >
                            <h3 className="card-title px-2">Appointment</h3>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div style={{ backgroundColor: "#EEF3F6" }}>
                              <div className="px-2" style={{ width: "300px" }}>
                                <ul
                                  className="nav nav-tabs nav-underline"
                                  style={{ backgroundColor: "#EEF3F6" }}
                                >
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-toggle="tab"
                                      href="#tab1"
                                    >
                                      Details
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#tab2"
                                    >
                                      Customer
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="provider">Provider</label>
                              <select
                                className="select2 form-control"
                                name="provider"
                                value={bookingData.provider}
                                onChange={handleChange}
                              >
                                {providers.map((provider) => (
                                  <option key={provider.id} value={provider.id}>
                                    {provider.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="package">
                                Package (Optional)
                              </label>
                              <select
                                className="select2 form-control"
                                name="package"
                                value={bookingData.package}
                                onChange={handleSelectedChange}
                              >
                                <option value="">Select Package</option>
                                {packages.map((pack) => (
                                  <option key={pack.id} value={pack.id}>
                                    {/* <img
                                      src={pack.profile_photo}
                                      alt={pack.package_name}
                                    /> */}
                                    {pack.package_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="modal-body d-flex">
                              <input
                                type="text"
                                id="comment"
                                className="form-control border-primary mr-1"
                                placeholder="Write Comment"
                                name="comment"
                                value={selectedPackagePrice}
                                onChange={handleChange}
                                required
                              />
<div className="input-group">
  <select
    className="select2 form-control fas fa-caret-down"
    name="services"
    value={bookingData.toTime}
    onChange={handleChange}
    required
  >
    <option value="60">60 Mins</option>
    <option value="75">75 Mins</option>
    <option value="90">90 Mins</option>
    <option value="120">120 Mins</option>
    <option value="150">150 Mins</option>
    <option value="180">180 Mins</option>
  </select>
</div>
                            </div>

                            <div className="modal-body">
                              <label htmlFor="services">
                                Services (Optional)
                              </label>
                              <select
                                className="select2 form-control"
                                name="services"
                                value={bookingData.services}
                                onChange={handleChange}
                                required
                              >
                                <option value="Studio">
                                  Studio Photography
                                </option>
                                <option value="Essential">
                                  Essential Photography
                                </option>
                                <option value="Premium">
                                  Premium Photography
                                </option>
                                <option value="Studio">
                                  Studio Floor Plan
                                </option>
                                <option value="Essential">
                                  Essential Floor Plan
                                </option>
                                <option value="Premium">
                                  Premium Floor Plan
                                </option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label className="d-block">
                                Preffered Date *
                              </label>
                              <DatePicker
                                className="form-control w-100 d-block"
                                id="datetimepicker4"
                                name="prefferedDate"
                                selected={bookingData.prefferedDate}
                                onChange={(date) =>
                                  setBookingData((prevData) => ({
                                    ...prevData,
                                    prefferedDate: date,
                                  }))
                                }
                              />
                            </div>
                            <div className="modal-body">
                              <label>From Time *</label>
                              <select
                                className="select2 form-control"
                                name="fromTime"
                                value={bookingData.fromTime}
                                onChange={handleChange}
                                required
                              >
                                <option value="1">7:00</option>
                                <option value="2">7:30</option>
                                <option value="3">8:00</option>
                                <option value="3">8:30</option>
                                <option value="3">9:00</option>
                                <option value="3">9:30</option>
                                <option value="3">10:00</option>
                                <option value="3">10:30</option>
                                <option value="3">11:00</option>
                                <option value="3">11:30</option>
                                <option value="3">12:00</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label>To Time *</label>
                              <select
                                className="select2 form-control"
                                name="toTime"
                                value={bookingData.toTime}
                                onChange={handleChange}
                                required
                              >
                                <option value="1">7:00</option>
                                <option value="2">7:30</option>
                                <option value="3">8:00</option>
                                <option value="3">8:30</option>
                                <option value="3">9:00</option>
                                <option value="3">9:30</option>
                                <option value="3">10:00</option>
                                <option value="3">10:30</option>
                                <option value="3">11:00</option>
                                <option value="3">11:30</option>
                                <option value="3">12:00</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label>Select Client</label>
                              <select
                                className="select2 form-control"
                                name="client"
                                value={bookingData.client}
                                onChange={handleChange}
                                required
                              >
                                <option value="1">Peter</option>
                                <option value="2">Admin</option>
                                <option value="3">Belle</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="comment">
                                Comment (optional)
                              </label>
                              <input
                                type="text"
                                id="comment"
                                className="form-control border-primary"
                                placeholder="Write Comment"
                                name="comment"
                                value={bookingData.comment}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="modal-footer">
                              <input
                                type="submit"
                                className="btn btn-primary btn"
                                value="Save"
                              />
                              <input
                                type="reset"
                                className="btn btn-secondary btn"
                                data-dismiss="modal"
                                value="Close"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`modal fade text-left d-none`}
                      id="reschedule"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="myModalLabel35"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h3 className="card-title">Reschedule</h3>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                              <label htmlFor="title">Booking Title *</label>
                              <input
                                type="text"
                                id="title"
                                className="form-control border-primary"
                                placeholder="Enter Client Address"
                                name="title"
                                value={bookingData.title}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="modal-body">
                              <label htmlFor="package">
                                Package (Optional)
                              </label>
                              <select
                                className="select2 form-control"
                                name="package"
                                value={bookingData.package}
                                onChange={handleChange}
                              >
                                <option value="Studio">Studio Package</option>
                                <option value="Essential">
                                  Essential Package
                                </option>
                                <option value="Premium">Premium Package</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="services">
                                Services (Optional)
                              </label>
                              <select
                                className="select2 form-control"
                                name="services"
                                value={bookingData.services}
                                onChange={handleChange}
                                required
                              >
                                <option value="Studio">
                                  Studio Photography
                                </option>
                                <option value="Essential">
                                  Essential Photography
                                </option>
                                <option value="Premium">
                                  Premium Photography
                                </option>
                                <option value="Studio">
                                  Studio Floor Plan
                                </option>
                                <option value="Essential">
                                  Essential Floor Plan
                                </option>
                                <option value="Premium">
                                  Premium Floor Plan
                                </option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label className="d-block">
                                Preffered Date *
                              </label>
                              <DatePicker
                                className="form-control w-100 d-block"
                                id="datetimepicker4"
                                name="prefferedDate"
                                selected={bookingData.prefferedDate}
                                onChange={(date) =>
                                  setBookingData((prevData) => ({
                                    ...prevData,
                                    prefferedDate: date,
                                  }))
                                }
                              />
                            </div>
                            <div className="modal-body">
                              <label>From Time *</label>
                              <select
                                className="select2 form-control"
                                name="fromTime"
                                value={bookingData.fromTime}
                                onChange={handleChange}
                                required
                              >
                                <option value="1">7:00</option>
                                <option value="2">7:30</option>
                                <option value="3">8:00</option>
                                <option value="3">8:30</option>
                                <option value="3">9:00</option>
                                <option value="3">9:30</option>
                                <option value="3">10:00</option>
                                <option value="3">10:30</option>
                                <option value="3">11:00</option>
                                <option value="3">11:30</option>
                                <option value="3">12:00</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label>To Time *</label>
                              <select
                                className="select2 form-control"
                                name="toTime"
                                value={bookingData.toTime}
                                onChange={handleChange}
                                required
                              >
                                <option value="1">7:00</option>
                                <option value="2">7:30</option>
                                <option value="3">8:00</option>
                                <option value="3">8:30</option>
                                <option value="3">9:00</option>
                                <option value="3">9:30</option>
                                <option value="3">10:00</option>
                                <option value="3">10:30</option>
                                <option value="3">11:00</option>
                                <option value="3">11:30</option>
                                <option value="3">12:00</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label>Select Client</label>
                              <select
                                className="select2 form-control"
                                name="client"
                                value={bookingData.client}
                                onChange={handleChange}
                                required
                              >
                                <option value="1">Peter</option>
                                <option value="2">Admin</option>
                                <option value="3">Belle</option>
                              </select>
                            </div>
                            <div className="modal-body">
                              <label htmlFor="comment">
                                Comment (optional)
                              </label>
                              <input
                                type="text"
                                id="comment"
                                className="form-control border-primary"
                                placeholder="Write Comment"
                                name="comment"
                                value={bookingData.comment}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div className="modal-footer">
                              <input
                                type="submit"
                                className="btn btn-primary btn"
                                value="Save"
                              />
                              <input
                                type="reset"
                                className="btn btn-secondary btn"
                                data-dismiss="modal"
                                value="Close"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-body">
            <section id="events-examples">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-content collapse show">
                      <div className="card-body fc-theme-bootstrap">
                        <FullCalendar
                          plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                          ]}
                          initialView="timeGridWeek"
                          headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                          }}
                          editable={true}
                          selectable={true}
                          events={events}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="users-list-table">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered zero-configuration">
                      <thead>
                        <tr>
                          <th>Booking Date</th>
                          <th>Booking Time</th>
                          <th>Client</th>
                          <th>Code</th>
                          <th>Address</th>
                          <th>Comment</th>
                          <th>Status</th>
                          <th>Action</th>
                          <th className="d-none"></th>
                          <th className="d-none"></th>
                          <th className="d-none"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>22-03-2024</td>
                          <td>10:30 am - 01:00 pm</td>
                          <td>Client Name</td>
                          <td>
                            <span
                              className="bullet bullet-sm tooltip_color"
                              style={{ backgroundColor: "#000000" }}
                            ></span>
                          </td>
                          <td>
                            Essential Clothing Limited, Mouchak - Fulbaria Road,
                            Bangladesh
                          </td>
                          <td>Test Comment</td>
                          <td>
                            <span className="badge badge-warning">Pending</span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-secondary mr-1 mb-1"
                              title="Edit"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger mr-1 mb-1"
                              title="Delete"
                            >
                              <i className="fa fa-remove"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-primary mr-1 mb-1"
                              title="Turn into Gallery"
                            >
                              <i className="fa fa-solid fa-image"></i>
                            </button>
                          </td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                        </tr>
                        <tr>
                          <td>26-03-2024</td>
                          <td>03:00 pm - 06:00 am</td>
                          <td>Client Name</td>
                          <td>
                            <span
                              className="bullet bullet-sm tooltip_color"
                              style={{ backgroundColor: "#000000" }}
                            ></span>
                          </td>
                          <td>First Canadian Place, Toronto, ON, Canada</td>
                          <td> </td>
                          <td>
                            <span className="badge badge-danger">Notify</span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-secondary mr-1 mb-1"
                              title="Edit"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger mr-1 mb-1"
                              title="Delete"
                            >
                              <i className="fa fa-remove"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-primary mr-1 mb-1"
                              title="Turn into Gallery"
                            >
                              <i className="fa fa-solid fa-image"></i>
                            </button>
                          </td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                        </tr>
                        <tr>
                          <td>26-03-2024</td>
                          <td>03:00 pm - 06:00 am</td>
                          <td>Client Name</td>
                          <td>
                            <span
                              className="bullet bullet-sm tooltip_color"
                              style={{ backgroundColor: "#000000" }}
                            ></span>
                          </td>
                          <td>First Canadian Place, Toronto, ON, Canada</td>
                          <td> </td>
                          <td>
                            <span className="badge badge-success">Booked</span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-secondary mr-1 mb-1"
                              title="Edit"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger mr-1 mb-1"
                              title="Delete"
                            >
                              <i className="fa fa-remove"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-primary mr-1 mb-1"
                              title="Turn into Gallery"
                            >
                              <i className="fa fa-solid fa-image"></i>
                            </button>
                          </td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                          <td className="d-none"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
