import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  createCalendar,
  newBooking,
  updateBooking,
  getAllBookings,
  deleteBooking,
} from "../api/bookingApis";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import avatar1 from "../app-assets/images/portrait/small/avatar-s-1.png";
import toolIcons from "../assets/images/i.png";
import { createClient } from "../api/clientApis";
import Select from "react-select";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import TableCustom from "../components/Table";
import { GoogleLogin, useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';


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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [events, setEvents] = useState([]);

  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [bookingToUpdate, setBookingToUpdate] = useState(null);
  const [showConfirmModel, setShowConfirmModel] = useState(false);

  const [showUpdateBox, setShowUpdateBox] = useState(false);

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

  console.log(packages);

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

      console.log(hoursToAdd, minutesToAdd);

      let [currentHours, currentMinutes, currentSeconds] =
        convertedTime.split(":");
      console.log(convertedTime);
      currentHours = parseInt(currentHours, 10) + hoursToAdd;
      console.log(currentHours);
      currentMinutes = parseInt(currentMinutes, 10) + minutesToAdd;
      if (currentMinutes >= 60) {
        currentHours += 1;
        currentMinutes -= 60;
      }

      currentHours = ("0" + currentHours).slice(-2);
      currentMinutes = ("0" + currentMinutes).slice(-2);

      let newToTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;
      console.log(newToTime);
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
      getAllBookingsData();
      if (buttonRef.current) {
        buttonRef.current.click();
      }
      // clear data
      setBookingData({
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
      setCustomerData({
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

      toast.success("Booking added successfully");
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

  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    getAllBookingsData();

    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    if (providers.length === 0) {
      try {
        const response = await fetch("http://localhost:6977/booking/providers");
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
    // for each selectedOptions.value find the price in packages
    const selectedPrices = selectedOptions.map((option) => {
      const price = packagePrice.find((pack) => pack.id === option.value);
      return price.price;
    });
    console.log(selectedPrices);
    // add the selected prices as there are multiple and we need total of all
    const totalPrice = selectedPrices.reduce((acc, price) => acc + price, 0);
    console.log(totalPrice);
    setSelectedPackagePrice(totalPrice);
  };

  const handleDateChange = (arg) => {
    console.log(arg.event);
    let id = arg.event._def.publicId;
    console.log(arg.event.start);

    // Create Date objects with timezone offsets
    let newDate = new Date(arg.event.start + "Z"); // Assuming the date string is in UTC
    let endDate = new Date(arg.event.end + "Z"); // Assuming the date string is in UTC

    console.log(endDate, newDate);

    let newDateString = newDate.toISOString().split("T")[0];
    console.log(newDateString);

    // Convert times to UTC time with timezone offsets
    let startTime = newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    let endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

    const newStartTime = convertTo24Hour(startTime);
    const newEndTime = convertTo24Hour(endTime);
    console.log(newEndTime);
    setUpdateData({
      id: id,
      prefferedDate: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
    });

    setShowConfirmModel(true);
  };

  useEffect(() => { }, []);

  const getAllBookingsData = async () => {
    try {
      let allBookingData = await getAllBookings();
      setBookingsData(allBookingData.data);
      let events = allBookingData.data.map((booking) => ({
        id: booking.id,
        title: booking.booking_title,
        start: `${booking.booking_date}T${booking.booking_time}`,
        end: `${booking.booking_date}T${booking.booking_time_to}`,
      }));

      setEvents(events);
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const deleteBookingData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", bookingIdToDelete);
      let res = await deleteBooking(formDataToSend);
      setBookingsData((prevData) =>
        prevData.filter((booking) => booking.id !== bookingIdToDelete)
      );
      if (res.success) {
        toast.success(res.message);
        setShowDeleteModal(false);
        getAllBookingsData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditClick = (booking) => {
    console.log(booking);

    setUpdateData({
      id: booking.id,
      title: booking.title,
      package: 1,
      services: null,
      prefferedDate: new Date(booking.start),
      fromTime: booking.booking_time,
      toTime: booking.booking_time_to,
      client: "",
      comment: booking.comment,
      provider: "",
      customer: "",
    });
    setShowUpdateModel(true);
  };

  const updateBookingData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", updateData.id);
      formDataToSend.append("booking_date", updateData.prefferedDate);
      formDataToSend.append("booking_time", updateData.startTime);
      formDataToSend.append("booking_time_to", updateData.endTime);
      let res = await updateBooking(formDataToSend);
      if (res.success) {
        toast.success(res.message);
        getAllBookingsData();
        setUpdateData({
          title: "",
          package: 1,
          services: null,
          prefferedDate: new Date(),
          fromTime: "",
          toTime: "60",
          client: "",
          comment: "",
          provider: "",
          customer: "",
        });
        setShowConfirmModel(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEventResize = (arg) => {
    console.log(arg);
    let id = arg.event._def.publicId;

    // Create Date objects with timezone offsets
    let newDate = new Date(arg.event.start + "Z"); // Assuming the date string is in UTC
    let endDate = new Date(arg.event.end + "Z"); // Assuming the date string is in UTC
    console.log(newDate);
    newDate.setDate(newDate.getDate());

    let newDateString = newDate.toISOString().split("T")[0];
    // let newDateString = newDate.toISOString().split("T")[0];
    console.log(newDateString);

    // Convert times to UTC time with timezone offsets
    let startTime = newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    let endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

    const newStartTime = convertTo24Hour(startTime);
    const newEndTime = convertTo24Hour(endTime);

    setUpdateData({
      id: id,
      prefferedDate: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
    });
    setShowConfirmModel(true);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Booking Date",
        accessor: "booking_date",
        headerStyle: { width: "fit-content" },
      },
      {
        Header: "Booking Time",
        accessor: "booking_time",
      },
      {
        Header: "Client",
        accessor: "client_name",
      },
      // {
      //   Header: "Code",
      //   accessor: "User.colorcode",
      //   Cell: ({ value }) => (
      //     <div
      //       style={{
      //         width: "14px",
      //         height: "14px",
      //         borderRadius: "50%",
      //         backgroundColor: value,
      //         display: "flex",
      //         alignItems: "center",
      //         justifyContent: "center",
      //         margin: "auto",
      //       }}
      //     />
      //   ),
      // },

      {
        Header: "Address",
        accessor: "client_address",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Status",
        accessor: "booking_status",
        // 1 = pending, 2 = notify, 3 = booked
        Cell: ({ value }) => (
          <div className="badge badge-pill badge-light-primary">
            {value === 1 ? "Pending" : value === 2 ? "Notify" : "Booked"}
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => (
          <div className="d-flex">
            <button
              className="btn btn-icon btn-outline-primary "
              onClick={() => handleEditClick(props.row.original)}
            >
              <i className="feather white icon-edit"></i>
            </button>

            <button
              className="btn btn-icon btn-outline-danger ml-1"
              // onClick={() => setBookingIdToDelete(props.row.original.id);  setShowDeleteModal(true);}
              onClick={() => {
                setBookingIdToDelete(props.row.original.id);
                setShowDeleteModal(true);
              }}
              id="delete-row"
              data-toggle="modal"
              data-target="#deleteModal"
            >
              <i className="feather white icon-trash"></i>
            </button>

            <button
              className="btn btn-icon btn-outline-primary ml-1"
              title="Turn into Gallery"
            >
              <i className="feather white icon-image"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const onLoginSuccess = (response) => {
    setIsLoggedIn(true);
    console.log(response);
    setAccessToken(response.code);
  };

  const onLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: (response) => {
      console.log('Login successful:', response);
    },
    // flow: 'auth-code',
    onError: (error) => alert('Login Failed:', error)
  });

  const insertEvent = () => {
    const event = {
      title: 'Appointment',
      description: 'Description',
      startDate: '2024-04-08T09:00:00',
      endDate: '2024-04-08T10:00:00',
    };

    try {
      axios.post('http://localhost:6977/calender/addcalenderevent', {
        event: event,
        accessToken: accessToken
      })
    } catch (error) {
      // 
      console.error(error);
    }
  }


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

                    {/* <GoogleLogin
                    clientId='49494450157-past37o3hghtbn0vd7mn220ub5u975ef.apps.googleusercontent.com'
                    buttonText="Login with Google"
                    onSuccess={onLoginSuccess}
                    onError={onLoginFailure}
                    scope="https://www.googleapis.com/auth/calendar" // Request Calendar API scope
                    prompt="consent" // Ensure user consent is requested
                /> */}
                    <button onClick={login}>Sign in with Google 🚀 </button>
                  <button onClick={insertEvent}>Add Event</button>
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
                                          Providers
                                        </label>
                                        <Select
                                          className="form-select w-100"
                                          name="services"
                                          defaultValue={selectedService}
                                          onChange={handleSelectedChange}
                                          options={packages.map((pkg) => ({
                                            label: pkg.package_name,
                                            value: pkg.id,
                                            package_price: pkg.package_price,
                                          }))}
                                          isSearchable
                                          isMulti
                                          hideSelectedOptions
                                          required
                                          components={{
                                            Option: ({ data, innerRef, innerProps }) => (
                                              <div
                                                ref={innerRef}
                                                {...innerProps}
                                                className="d-flex align-items-center custom-class-select"
                                              >
                                                <img
                                                  src={avatar1}
                                                  className=""
                                                  style={{
                                                    marginLeft: "4px",
                                                    marginRight: "4px",
                                                  }}
                                                  width={"14px"}
                                                  alt=""
                                                />
                                                <span>{data.label}</span>
                                              </div>
                                            ),
                                          }}
                                        />
                                      </div>
                                      <div className="modal-body d-flex px-4">
                                        <label
                                          htmlFor="services"
                                          style={{ width: "10rem" }}
                                        >
                                          Service
                                        </label>
                                        {/* <Select
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
                                          required
                                        /> */}
                                        <Select
                                          className="form-select w-100"
                                          name="services"
                                          defaultValue={selectedService}
                                          onChange={handleSelectedChange}
                                          options={packages.map((pkg) => ({
                                            label: pkg.package_name,
                                            value: pkg.id,
                                            package_price: pkg.package_price,
                                          }))}
                                          isSearchable
                                          isMulti
                                          hideSelectedOptions
                                          required
                                          components={{
                                            Option: ({
                                              data,
                                              innerRef,
                                              innerProps,
                                            }) => (
                                              <div
                                                ref={innerRef}
                                                {...innerProps}
                                                className="d-flex align-items-center custom-class-select"
                                              >
                                                <img
                                                  src={toolIcons}
                                                  className=""
                                                  style={{
                                                    marginLeft: "4px",
                                                    marginRight: "4px",
                                                  }}
                                                  width={"14px"}
                                                  alt=""
                                                />
                                                <span>{data.label}</span>
                                              </div>
                                            ),
                                          }}
                                        />
                                      </div>

                                      <div className="modal-body d-flex px-4">
                                        <div style={{ width: "23rem" }}></div>
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
                                          style={{ width: "11rem" }}
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
                                          required
                                        />
                                        <select
                                          className="select2 form-control w-50 ml-1"
                                          name="fromTime"
                                          value={bookingData.fromTime}
                                          onChange={handleChange}
                                          required
                                        >
                                          <option value="">Select Time</option>
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

                                      {/* <div className="modal-body d-flex px-4 justify-content-between ">
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
                                        >
                                          <option value="0">
                                            Select Frequency
                                          </option>
                                          <option value="1">Never</option>
                                          <option value="2">Once</option>
                                          <option value="3">Always</option>
                                        </select>
                                      </div> */}

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
                                            required
                                          />
                                        </div>
                                      )}
                                      {/* {showNewCustomer ? (
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
                                      )} */}
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
                          views={{
                            timeGridWeek: {
                              dayHeaderContent: ({ date }) => {
                                const day = date
                                  .getDate()
                                  .toString()
                                  .padStart(2, "0");
                                const month = (date.getMonth() + 1)
                                  .toString()
                                  .padStart(2, "0");
                                return `${day}/${month}`;
                              },
                            },
                          }}
                          eventResize={handleEventResize}
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
      <TableCustom data={bookingsData} columns={columns} />
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteBookingData}
        message="Are you sure you want to delete this imageType?"
      />
      <DeleteModal
        isOpen={showConfirmModel}
        onClose={() => setShowConfirmModel(false)}
        onConfirm={updateBookingData}
        message={
          <>
            <div className="justify-items-center" role="alert">
              <h3 className="text-center">Confirm Rechedule </h3>
              <div className="p-2 text-center">
                <p className="mb-0 ">
                  Do you with to Reschedule the appointment?
                </p>
              </div>
            </div>
          </>
        }
      />

      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
