import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
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
import Select from "react-select";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import TableCustom from "../components/Table";
import { useGoogleLogin, } from '@react-oauth/google';
import { useAuth } from "../context/authContext";
import API from "../api/baseApi";

export const BookingListComponent = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6977";
  const { authData } = useAuth();
  const [providers, setProviders] = useState([]);
  const [packages, setPackages] = useState([]);
  const [packagePrice, setPackagePrices] = useState([]);
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(0);
  const buttonRef = useRef(null);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [showConfirmModel, setShowConfirmModel] = useState(false);
  const userId = authData.user ? authData.user.id : null;
  const calendarSub = authData.user ? authData.user.calendarSub : null;
  const [showDateModel, setShowDateModel] = useState(false);

  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    package: 1,
    services: '',
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
    services: '',
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
      const convertedTime = convertTo24Hour(bookingData.fromTime);
      const hoursToAdd = Math.floor(bookingData.toTime / 60);
      const minutesToAdd = bookingData.toTime % 60;

      let [currentHours, currentMinutes, currentSeconds] = convertedTime.split(":");
      currentHours = parseInt(currentHours, 10) + hoursToAdd;
      currentMinutes = parseInt(currentMinutes, 10) + minutesToAdd;
      if (currentMinutes >= 60) {
        currentHours += 1;
        currentMinutes -= 60;
      }

      currentHours = ("0" + currentHours).slice(-2);
      currentMinutes = ("0" + currentMinutes).slice(-2);

      let newToTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;
      console.log('newToTime');

      const bookingDataToSend = {
        user_id: bookingData.client,
        package_ids: bookingData.services,
        package: 0,
        photographer_id: bookingData.provider,
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

      setBookingData({
        title: "",
        package: 1,
        services: '',
        prefferedDate: new Date(),
        fromTime: "",
        toTime: "",
        client: "",
        comment: "",
        provider: "",
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
    const { name, value } = e.target;
    console.log(e.target.name);

    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
    getAllBookingsData();

    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    if (providers.length === 0) {
      try {
        const response = await API.get("/booking/providers");
        const data = response.data;
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
    const selectedDate = new Date(arg.date);
    const selectedTime = selectedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setBookingData((prevData) => {
      const newData = {
        ...prevData,
        prefferedDate: selectedDate,
        fromTime: selectedTime,
      };
      return newData;
    });

    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const handleNewCustomer = () => {
    setShowNewCustomer(!showNewCustomer);
  };

  const handleSelectedChange = (selectedOptions) => {
    setSelectedService(selectedOptions);

    const selectedValues = selectedOptions.map(option => option.value);
    const selectedValuesString = selectedValues.join(', ');

    console.log(selectedValuesString);
    setBookingData((prevData) => ({
      ...prevData,
      services: selectedValuesString,
    }));
    // The rest of your code...
    const selectedPrices = selectedOptions.map((option) => {
      const price = packagePrice.find((pack) => pack.id === option.value);
      return price.price;
    });

    const totalPrice = selectedPrices.reduce((acc, price) => acc + price, 0);
    setSelectedPackagePrice(totalPrice);
  };

  const getAllBookingsData = async () => {
    try {
      let allBookingData = await getAllBookings(userId);
      setBookingsData(allBookingData.data);
      let events = allBookingData.data.map((booking) => ({
        id: booking.id,
        title: booking.booking_title,
        start: `${booking.booking_date}T${booking.booking_time}`,
        end: `${booking.booking_date}T${booking.booking_time_to}`,
      }));

      setEvents(events);
      console.log(events);
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const getBookingData = (data) => {
    console.log(data);
    setBookingData({
      title: data.booking_title,
      package: data.package,
      services: data.package_ids,
      prefferedDate: data.booking_date,
      fromTime: data.booking_time,
      toTime: data.booking_time_to,
      client: data.user_id,
      comment: data.comment,
      provider: data.photographer_id,
      customer: data.user_id,
    });
  }

  const deleteBookingData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", bookingIdToDelete);
      formDataToSend.append("user_id", userId);
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

  const updateTimeData = async () => {
    try {
      const booking = bookingsData.find((booking) => booking.id === parseInt(updateData.id));
      const formDataToSend = new FormData();
      formDataToSend.append("id", updateData.id);
      formDataToSend.append("booking_date", booking.booking_date);
      formDataToSend.append("booking_time", updateData.startTime);
      formDataToSend.append("booking_time_to", updateData.endTime);
      formDataToSend.append("user_id", userId);
      formDataToSend.append("package_ids", booking.package_ids);
      formDataToSend.append("package", booking.package);
      formDataToSend.append("photographer_id", booking.photographer_id);
      formDataToSend.append("booking_status", 1);
      formDataToSend.append("comment", booking.comment);


      await newBooking(formDataToSend);
      getAllBookingsData();

      setUpdateData({
        title: "",
        package: 1,
        services: '',
        prefferedDate: new Date(),
        fromTime: "",
        toTime: "60",
        client: "",
        comment: "",
        provider: "",
        customer: "",
      });
      setShowConfirmModel(false);
      toast.success("Booking updated successfully");
    } catch (error) {
      toast.error(error);
      console.error("Failed to add booking:", error.message);
    }
  };
  const handleEventResize = (arg) => {
    let id = arg.event._def.publicId;

    let newDate = new Date(arg.event.start + "Z");
    let endDate = new Date(arg.event.end + "Z");
    newDate.setDate(newDate.getDate());

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

    setUpdateData((prevData) => ({
      ...prevData,
      id: id,
      prefferedDate: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
    }));
    console.log(updateData);


    setShowConfirmModel(true);
  };

  const updateDateData = async () => {
    try {
      const booking = bookingsData.find((booking) => booking.id === parseInt(updateData.id));
      const formDataToSend = new FormData();
      formDataToSend.append("id", updateData.id);
      formDataToSend.append("booking_date", updateData.prefferedDate);
      formDataToSend.append("booking_time", updateData.startTime);
      formDataToSend.append("booking_time_to", updateData.endTime);
      formDataToSend.append("user_id", userId);
      formDataToSend.append("package_ids", booking.package_ids);
      formDataToSend.append("package", booking.package);
      formDataToSend.append("photographer_id", booking.photographer_id);
      formDataToSend.append("booking_status", 1);
      formDataToSend.append("comment", booking.comment);


      await newBooking(formDataToSend);
      getAllBookingsData();

      setUpdateData({
        title: "",
        package: 1,
        services: '',
        prefferedDate: new Date(),
        fromTime: "",
        toTime: "60",
        client: "",
        comment: "",
        provider: "",
        customer: "",
      });
      setShowDateModel(false);
      toast.success("Booking updated successfully");
    } catch (error) {
      toast.error(error);
      console.error("Failed to add booking:", error.message);
    }
  };
  const handleDateChange = (arg) => {
    let id = arg.event._def.publicId;

    let newDate = new Date(arg.event.start + "Z");
    let endDate = new Date(arg.event.end + "Z");

    let newDateString = newDate.toISOString().split("T")[0];
    console.log(newDateString);

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

    setShowDateModel(true);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Booking Date",
        accessor: "booking_date",
        headerStyle: { width: '200px' },
      },
      {
        Header: "Booking Time",
        accessor: "booking_time",
      },
      {
        Header: "Client",
        accessor: "client_name",
      },
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
              ref={buttonRef}
              type="button"
              className="btn btn-icon btn-outline-primary"
              onClick={() => getBookingData(props.row.original)}
              data-toggle="modal"
              data-target="#appointment"
            >
              <i className="feather white icon-edit"></i>
            </button>

            <button
              className="btn btn-icon btn-outline-danger ml-1"
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

  const subscribe = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios.post(`${API_URL}/auth/google`, {
        code: codeResponse.code,
        id: userId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Backend response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    onError: () => {
      console.error('Google login failed');
    },
    scope: "https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.readonly",
    flow: 'auth-code',
    include_granted_scopes: true
  });

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
                    <div className='d-flex' >
                      {calendarSub == null ? <></> :
                        <>
                          {calendarSub == 0 ? <button onClick={subscribe} type="button"
                            className="btn btn-outline-primary btn-block" title="Already subscribed to the calendar">Subscribe to Calendar</button> :
                            <button type="button"
                              className="btn btn-outline-primary btn-block" disabled title="Already subscribed to the calendar">Subscribed</button>
                          }</>
                      }
                      <button
                        ref={buttonRef}
                        type="button"
                        className="btn btn-outline-primary btn-block"
                        data-toggle="modal"
                        data-target="#appointment"
                      >
                        New Appointment
                      </button>
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
                                          Providers
                                        </label>
                                        <Select
                                          className="select2 w-100"
                                          name="providers"
                                          defaultValue={bookingData.provider}
                                          onChange={(e) => {
                                            setBookingData({
                                              ...bookingData,
                                              provider: e.value,
                                            });
                                          }}
                                          options={providers.map((provider) => ({
                                            label: provider.name,
                                            value: provider.id,
                                          }))}
                                          isSearchable
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
                                                style={{ display: 'flex form-select', alignItems: 'center' }}
                                              >
                                                <img
                                                  src={data.profile_photo || avatar1}
                                                  className="mr-1 ml-1"
                                                  width={"14px"}
                                                  height={"14px"}
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
                                        <Select
                                          className="select2 w-100"
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
                                                style={{ display: 'flex form-select ', alignItems: 'center' }}
                                              >
                                                <img
                                                  src={toolIcons}
                                                  className="mr-1 ml-1"
                                                  width={"14px"}
                                                  height={"14px"}
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
                                            className="select2 w-100"
                                            name="clients"
                                            defaultValue={bookingData.client}
                                            onChange={(e) => {
                                              setBookingData({
                                                ...bookingData,
                                                client: e.value,
                                              });
                                            }}
                                            options={clientList.map((client) => ({
                                              label: (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                  <img
                                                    src={client.profile_photo || avatar1}
                                                    alt="Profile"
                                                    style={{ marginRight: '10px', borderRadius: '50%', width: '30px', height: '30px' }}
                                                  />
                                                  <span>{client.name}</span>
                                                </div>
                                              ),
                                              value: client.id,
                                            }))}
                                            isSearchable
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
                                value={bookingData.id ? "Update" : "Save"}
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
        onConfirm={updateTimeData}
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
      <DeleteModal
        isOpen={showDateModel}
        onClose={() => setShowDateModel(false)}
        onConfirm={updateDateData}
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
