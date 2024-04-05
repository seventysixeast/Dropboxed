import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCalendar, newBooking } from "../api/bookingApis";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import { createClient } from "../api/clientApis";
import Select from "react-select";

export const BookingListComponent = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [packages, setPackages] = useState([]);
  const [packagePrice, setPackagePrices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState();
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(0);
  const [appointmentTime, setAppointmentTime] = useState();
  const buttonRef = useRef(null);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [events, setEvents] = useState([]);

  const [showUpdateBox, setShowUpdateBox] = useState(false);
  //variable for handle date change data
  const [updateData, setUpdateData] = useState({
    title: "",
    package: 1,
    services: null,
    prefferedDate: new Date(),
    fromTime: "",
    toTime: "",
    client: "",
    comment: "",
    provider: "",
    customer: "",
  });

  const [bookingData, setBookingData] = useState({
    title: "",
    package: 1,
    services: null,
    prefferedDate: new Date(),
    fromTime: "",
    toTime: "",
    client: "",
    comment: "",
    provider: "",
    customer: "",
  });

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    mobile: "",
    office: "",
    home: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  };
  // Function to handle changes in customer data
  const handleCustomerDataChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const data = await createClient(customerData);
      // console.log(data.data.id);
      // Function to convert 12-hour time to 24-hour time

      const convertedTime = convertTo24Hour(bookingData.fromTime);
      const hoursToAdd = Math.floor(bookingData.toTime / 60);
      const minutesToAdd = bookingData.toTime % 60;

      let [currentHours, currentMinutes, currentSeconds] =
        convertedTime.split(":");

      currentHours = parseInt(currentHours, 10) + hoursToAdd;
      currentMinutes = parseInt(currentMinutes, 10) + minutesToAdd;

      if (currentMinutes >= 60) {
        currentHours += 1;
        currentMinutes -= 60;
      }

      currentHours = ("0" + currentHours).slice(-2);
      currentMinutes = ("0" + currentMinutes).slice(-2);

      let newToTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;
      console.log(selectedProvider.value, selectedClient.value);
      const values = selectedService.map((service) => service.value);
      const formattedValues = values.join(", ");

      const bookingDataToSend = {
        user_id: selectedClient.value,
        package_ids: formattedValues,
        package: 0,
        photographer_id: selectedProvider.value,
        booking_date: bookingData.prefferedDate,
        booking_time: convertedTime,
        booking_time_to: newToTime,
        booking_status: 1,
        comment: bookingData.comment,
      };
      await newBooking(bookingDataToSend);
    } catch (error) {
      console.error("Failed to add booking:", error.message);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:6977/booking/get-bookings"
        );
        const data = await response.json();
        let events = data.map((booking) => ({
          id: booking.id,
          title: booking.booking_title,
          start: `${booking.booking_date}T${booking.booking_time}`,
          end: `${booking.booking_date}T${booking.booking_time_to}`,
        }));

        console.log(events);
        setBookings(data);
        setEvents(events);

        console.log(data);
        console.log(events);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    const fetchProviders = async () => {
      if (providers.length === 0) {
        try {
          const response = await fetch(
            "http://localhost:6977/booking/providers"
          );
          const data = await response.json();
          setProviders(data.usersWithRoleId1);
          setClientList(data.users);
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

    getBookings();
    fetchProviders();
  }, []);

  // const handleSelectedChange = (e) => {
  //   const { name, value } = e.target;
  //   setBookingData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   setSelectedPackage(value);
  //   setBookingData((prevData) => ({
  //     ...prevData,
  //     package: value,
  //   }));
  //   setSelectedPackagePrice(
  //     packagePrice.find((price) => price.id === parseInt(value)).price
  //   );
  // };

  const handleDateClick = (arg) => {
    console.log("Date clicked:", arg);
    const selectedDate = new Date(arg.date);
    const selectedTime = selectedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log("Selected time:", selectedTime);

    setBookingData((prevData) => {
      console.log("Previous data:", prevData);
      const newData = {
        ...prevData,
        prefferedDate: selectedDate,
        fromTime: selectedTime,
      };
      console.log("New data:", newData);
      return newData;
    });

    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const handleNewCustomer = () => {
    setShowNewCustomer(!showNewCustomer);
  };

  const handleCreateCalendar = async (e) => {
    e.preventDefault();
    try {
      const data = await createCalendar({ user_id: 16 });
    } catch (error) {
      console.error("Failed to create calendar:", error.message);
    }
  };

  const handleSelectedChange = (selectedOptions) => {
    setSelectedService(selectedOptions);
    // setSelectedPackagePrice
  };

  const handleDateChange = (arg) => {
    let id = arg.event._def.publicId;

    let newDate = new Date(arg.event.start);
    let endDate = new Date(arg.event.end);
    let newDateString = newDate.toISOString().split("T")[0];
    console.log(newDateString);
    let startTime = newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newStartTime = convertTo24Hour(startTime);
    const newEndTime = convertTo24Hour(endTime);

    setUpdateData({
      id: id,
      prefferedDate: newDateString,
      startTime: newStartTime,
      endTime: newEndTime,
    });

    setShowUpdateBox(true);
  };

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
                      ref={buttonRef}
                      type="button"
                      className="btn btn-outline-primary btn-block"
                      data-toggle="modal"
                      data-target="#appointment"
                    >
                      New Appointment
                    </button>
                    {/* <button
                      type="button"
                      className="btn btn-outline-primary btn-block"
                      onClick={handleCreateCalendar}
                    >
                      Create Calendar
                    </button> */}

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-block "
                      data-toggle="modal"
                      data-target="#confirmation"
                    >
                      Add Client
                    </button>
                    <div
                      className="modal fade text-left"
                      id="confirmation"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="myModalLabel35"
                      aria-hidden="true"
                      style={{ display: "none" }}
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              id="closeModal"
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
                            <div className="form-group">
                              <h3 className="text-center">Confirm Reschedule</h3>
                              <p>From: {updateData.prefferedDate.value} </p>
                              <p>To: {updateData.toTime}</p>
                            </div>
                            <div className="modal-footer">
                              <input
                                type="reset"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                value="Close"
                              />
                              <input
                                type="submit"
                                className="btn btn-primary btn"
                                value="Close"
                              />
                            </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade text-left"
                      id="appointment"
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
                            <div>
                              <div className="">
                                <ul
                                  className="nav nav-tabs nav-underline"
                                  style={{ backgroundColor: "#EEF3F6" }}
                                >
                                  <li
                                    className="nav-item"
                                    style={{ width: "300px" }}
                                  >
                                    <a
                                      className="nav-link active"
                                      data-toggle="tab"
                                      href="#tab1"
                                    >
                                      Details
                                    </a>
                                  </li>
                                  <li
                                    className="nav-item"
                                    style={{ width: "300px" }}
                                  >
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#tab2"
                                    >
                                      Customer
                                    </a>
                                  </li>
                                </ul>

                                <div
                                  className="container"
                                  style={{ position: "relative" }}
                                >
                                  <div className="tab-content">
                                    <div
                                      className="tab-pane fade show active"
                                      id="tab1"
                                    >
                                      <div className="modal-body d-flex px-4">
                                        <label
                                          htmlFor="provider"
                                          style={{ width: "10rem" }}
                                        >
                                          Provider
                                        </label>
                                        <Select
                                          className="form-select w-100 "
                                          name="customer"
                                          defaultValue={selectedProvider}
                                          onChange={setSelectedProvider}
                                          options={providers.map((client) => ({
                                            label: (
                                              <>
                                                <img
                                                  src={client.image || avatar1}
                                                  alt={client.name}
                                                  style={{
                                                    width: "20px",
                                                    marginRight: "10px",
                                                  }}
                                                />
                                                {client.name}
                                              </>
                                            ),
                                            value: client.id,
                                          }))}
                                          isSearchable
                                          hideSelectedOptions
                                        />
                                      </div>
                                      <div className="modal-body d-flex px-4">
                                        <label
                                          htmlFor="services"
                                          style={{ width: "10rem" }}
                                        >
                                          Service
                                        </label>
                                        <Select
                                          className="form-select w-100 "
                                          defaultValue={selectedService}
                                          onChange={handleSelectedChange}
                                          options={packages.map((pkg) => ({
                                            label: pkg.package_name,
                                            value: pkg.id,
                                          }))}
                                          isSearchable
                                          isMulti
                                          hideSelectedOptions
                                        />
                                      </div>

                                      <div className="modal-body d-flex px-4">
                                        <div style={{ width: "21rem" }}></div>
                                        <input
                                          type="text"
                                          id="price"
                                          className="form-control border-primary mr-1"
                                          name="price"
                                          value={`$ ${selectedPackagePrice}`}
                                          disabled
                                        />
                                        <div className="input-group">
                                          <select
                                            className="select2 form-control fa fa-caret-down"
                                            name="toTime"
                                            value={bookingData.toTime}
                                            onChange={handleChange}
                                            required
                                          >
                                            <option value="60">60 Mins</option>
                                            <option value="75">75 Mins</option>
                                            <option value="90">90 Mins</option>
                                            <option value="120">
                                              120 Mins
                                            </option>
                                            <option value="150">
                                              150 Mins
                                            </option>
                                            <option value="180">
                                              180 Mins
                                            </option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="modal-body d-flex px-4">
                                        <label
                                          htmlFor="datetimepicker4"
                                          style={{ width: "10rem" }}
                                        >
                                          Date/Time
                                        </label>
                                        <DatePicker
                                          className="form-control custom-datepicker"
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
                                        <select
                                          className="select2 form-control w-50 ml-1"
                                          name="fromTime"
                                          value={bookingData.fromTime}
                                          onChange={handleChange}
                                          required
                                        >
                                          <option value="0">Select Time</option>
                                          <option value="12:00 AM">
                                            12:00 AM
                                          </option>
                                          <option value="12:30 AM">
                                            12:30 AM
                                          </option>
                                          <option value="01:00 AM">
                                            01:00 AM
                                          </option>
                                          <option value="01:30 AM">
                                            01:30 AM
                                          </option>
                                          <option value="02:00 AM">
                                            02:00 AM
                                          </option>
                                          <option value="02:30 AM">
                                            02:30 AM
                                          </option>
                                          <option value="03:00 AM">
                                            03:00 AM
                                          </option>
                                          <option value="03:30 AM">
                                            03:30 AM
                                          </option>
                                          <option value="04:00 AM">
                                            04:00 AM
                                          </option>
                                          <option value="04:30 AM">
                                            04:30 AM
                                          </option>
                                          <option value="05:00 AM">
                                            05:00 AM
                                          </option>
                                          <option value="05:30 AM">
                                            05:30 AM
                                          </option>
                                          <option value="06:00 AM">
                                            06:00 AM
                                          </option>
                                          <option value="06:30 AM">
                                            06:30 AM
                                          </option>
                                          <option value="07:00 AM">
                                            07:00 AM
                                          </option>
                                          <option value="07:30 AM">
                                            07:30 AM
                                          </option>
                                          <option value="08:00 AM">
                                            08:00 AM
                                          </option>
                                          <option value="08:30 AM">
                                            08:30 AM
                                          </option>
                                          <option value="09:00 AM">
                                            09:00 AM
                                          </option>
                                          <option value="09:30 AM">
                                            09:30 AM
                                          </option>
                                          <option value="10:00 AM">
                                            10:00 AM
                                          </option>
                                          <option value="10:30 AM">
                                            10:30 AM
                                          </option>
                                          <option value="11:00 AM">
                                            11:00 AM
                                          </option>
                                          <option value="11:30 AM">
                                            11:30 AM
                                          </option>
                                          <option value="12:00 PM">
                                            12:00 PM
                                          </option>
                                          <option value="12:30 PM">
                                            12:30 PM
                                          </option>
                                          <option value="01:00 PM">
                                            01:00 PM
                                          </option>
                                          <option value="01:30 PM">
                                            01:30 PM
                                          </option>
                                          <option value="02:00 PM">
                                            02:00 PM
                                          </option>
                                          <option value="02:30 PM">
                                            02:30 PM
                                          </option>
                                          <option value="03:00 PM">
                                            03:00 PM
                                          </option>
                                          <option value="03:30 PM">
                                            03:30 PM
                                          </option>
                                          <option value="04:00 PM">
                                            04:00 PM
                                          </option>
                                          <option value="04:30 PM">
                                            04:30 PM
                                          </option>
                                          <option value="05:00 PM">
                                            05:00 PM
                                          </option>
                                          <option value="05:30 PM">
                                            05:30 PM
                                          </option>
                                          <option value="06:00 PM">
                                            06:00 PM
                                          </option>
                                          <option value="06:30 PM">
                                            06:30 PM
                                          </option>
                                          <option value="07:00 PM">
                                            07:00 PM
                                          </option>
                                          <option value="07:30 PM">
                                            07:30 PM
                                          </option>
                                          <option value="08:00 PM">
                                            08:00 PM
                                          </option>
                                          <option value="08:30 PM">
                                            08:30 PM
                                          </option>
                                          <option value="09:00 PM">
                                            09:00 PM
                                          </option>
                                          <option value="09:30 PM">
                                            09:30 PM
                                          </option>
                                          <option value="10:00 PM">
                                            10:00 PM
                                          </option>
                                          <option value="10:30 PM">
                                            10:30 PM
                                          </option>
                                          <option value="11:00 PM">
                                            11:00 PM
                                          </option>
                                          <option value="11:30 PM">
                                            11:30 PM
                                          </option>
                                        </select>
                                      </div>

                                      <div className="modal-body d-flex px-4 justify-content-between ">
                                        <label
                                          htmlFor="notify"
                                          style={{ width: "10rem" }}
                                        >
                                          Notify
                                        </label>

                                        <select
                                          className="select2 form-control w-50"
                                          name="notify"
                                          value={bookingData.notify}
                                          onChange={handleChange}
                                          required
                                        >
                                          <option value="0">
                                            Select Frequency
                                          </option>
                                          <option value="1">Never</option>
                                          <option value="2">Once</option>
                                          <option value="3">Always</option>
                                        </select>
                                      </div>

                                      <div className="modal-body d-flex px-4">
                                        <label
                                          htmlFor="comment"
                                          style={{ width: "10rem" }}
                                        >
                                          Comment
                                        </label>
                                        <textarea
                                          type="text"
                                          id="comment"
                                          className="form-control border-primary"
                                          placeholder="Notes for the customer."
                                          name="comment"
                                        />
                                      </div>
                                    </div>

                                    <div className="tab-pane fade" id="tab2">
                                      {showNewCustomer == false && (
                                        <div className="modal-body d-flex px-4 justify-content-between ">
                                          <Select
                                            className="form-select w-100 "
                                            name="customer"
                                            defaultValue={selectedClient}
                                            onChange={setSelectedClient}
                                            options={clientList.map(
                                              (client) => ({
                                                label: (
                                                  <>
                                                    <img
                                                      src={
                                                        client.image || avatar1
                                                      }
                                                      alt={client.name}
                                                      style={{
                                                        width: "20px",
                                                        marginRight: "10px",
                                                      }}
                                                    />
                                                    {client.name}
                                                  </>
                                                ),
                                                value: client.id,
                                              })
                                            )}
                                            isSearchable
                                            hideSelectedOptions
                                          />
                                        </div>
                                      )}
                                      {showNewCustomer ? (
                                        <>
                                          <div className="modal-body d-flex px-4 justify-content-between   ">
                                            <label
                                              htmlFor="home"
                                              style={{ width: "10rem" }}
                                            >
                                              <img
                                                src={avatar1}
                                                className="border border-red mr-1 -mt-1"
                                                style={{
                                                  width: "4rem",
                                                  borderRadius: "50%",
                                                }}
                                                alt="profile_icon"
                                              />
                                            </label>

                                            <input
                                              type="text"
                                              className="form-control "
                                              name="name"
                                              value={customerData.name}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="Name"
                                            />
                                          </div>
                                          <div className="modal-body d-flex px-4">
                                            <label
                                              htmlFor="email"
                                              style={{ width: "10rem" }}
                                            >
                                              Email
                                            </label>
                                            <input
                                              type="email"
                                              className="form-control"
                                              name="email"
                                              value={customerData.email}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="Email"
                                            />
                                          </div>
                                          <div className="modal-body d-flex px-4">
                                            <label
                                              htmlFor="moblie"
                                              style={{ width: "10rem" }}
                                            >
                                              Mobile
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="mobile"
                                              value={customerData.mobile}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="Mobile"
                                            />
                                          </div>
                                          <div className="modal-body d-flex px-4">
                                            <label
                                              htmlFor="office"
                                              style={{ width: "10rem" }}
                                            >
                                              Office
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="office"
                                              value={customerData.office}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="Office"
                                            />
                                          </div>
                                          <div className="modal-body d-flex px-4">
                                            <label
                                              htmlFor="home"
                                              style={{ width: "10rem" }}
                                            >
                                              Home
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="home"
                                              value={customerData.home}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="Home"
                                            />
                                          </div>
                                          <div className="modal-body d-flex px-4">
                                            <label
                                              htmlFor="address"
                                              style={{ width: "10rem" }}
                                            >
                                              Address
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="address"
                                              value={customerData.address}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="Address"
                                            />
                                          </div>
                                          <div className="modal-body d-flex px-4">
                                            <div
                                              style={{ width: "47rem" }}
                                            ></div>
                                            <input
                                              type="text"
                                              className="form-control mr-1"
                                              name="city"
                                              value={customerData.city}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="City"
                                            />

                                            <input
                                              type="text"
                                              className="form-control  mr-1"
                                              name="state"
                                              value={customerData.state}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="State"
                                            />

                                            <input
                                              type="text"
                                              className="form-control "
                                              name="zip"
                                              value={customerData.zip}
                                              onChange={
                                                handleCustomerDataChange
                                              }
                                              placeholder="Zip"
                                            />
                                          </div>
                                          <input
                                            className="btn btn-outline-primary mb-1 btn ml-4"
                                            onClick={handleNewCustomer}
                                            value="Cancel"
                                            readOnly
                                          />
                                        </>
                                      ) : (
                                        <input
                                          className="btn btn-outline-primary mb-1 btn ml-4"
                                          onClick={handleNewCustomer}
                                          value="+ New Customer"
                                          readOnly
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                          firstDay={1}
                          dateClick={handleDateClick}
                          initialView="timeGridWeek"
                          eventDrop={handleDateChange}
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
                    <table className="table-inverse table-striped table-bordered zero-configuration">
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
