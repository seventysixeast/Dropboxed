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
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/authContext";
import API from "../api/baseApi";
import ConfirmModal from "../components/ConfirmModal";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { getDocumentElement } from "@floating-ui/utils/dom";

export const BookingListComponent = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6977";
  const { authData } = useAuth();
  const { user } = authData;
  const roleId = user.role_id;
  const subdomainId = user.subdomain_id;
  const [providers, setProviders] = useState([]);
  const [packages, setPackages] = useState([]);
  const [packagePrice, setPackagePrices] = useState([]);
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(0);
  const buttonRef = useRef(null);
  const tabRef = useRef(null);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [bookingAddress, setBookingAddress] = useState(null);
  const [toTime, setToTime] = useState("60");

  const [clientList, setClientList] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [showConfirmModel, setShowConfirmModel] = useState(false);
  const userId = authData.user ? authData.user.id : null;
  const calendarSub = authData.user ? authData.user.calendarSub : null;
  const [showDateModel, setShowDateModel] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyCheckbox, setNotifyCheckbox] = useState(false);

  const [bookingData, setBookingData] = useState({
    title: "",
    package: 1,
    services: "",
    prefferedDate: new Date(),
    fromTime: "",
    toTime: "60",
    client: "",
    comment: "",
    provider: "",
    customer: "",
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    package: 1,
    services: "",
    prefferedDate: new Date(),
    fromTime: "",
    toTime: "60",
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
      const convertedTime = bookingData.fromTime;
      console.log(bookingData.toTime);
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

      const bookingDataToSend = {
        id: bookingIdToDelete,
        package_ids: bookingData.services,
        package: 0,
        photographer_id: `${bookingData.provider}`,
        booking_date: bookingData.prefferedDate,
        booking_time: bookingData.fromTime,
        booking_time_to: newToTime,
        booking_status: notifyCheckbox,
        comment: bookingData.comment,
        booking_title: bookingAddress.label,
        subdomain_id: subdomainId,
      };
      if (roleId == 3) {
        bookingDataToSend.user_id = userId;
      } else {
        bookingDataToSend.user_id = bookingData.client;
      }

      await newBooking(bookingDataToSend);
      getAllBookingsData();
      if (buttonRef.current) {
        buttonRef.current.click();
      }

      setBookingData({
        title: "",
        package: 1,
        services: "",
        prefferedDate: new Date(),
        fromTime: "",
        toTime: "60",
        client: "",
        comment: "",
        provider: "",
      });
      setBookingIdToDelete(null);

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
      setSelectedProvider(null);
      setSelectedService(null);
      setSelectedClient(null);
      setBookingAddress(null);
      setNotifyCheckbox(false);
      setToTime("60");
      setSelectedPackagePrice(0);
      setBookingIdToDelete(null);

      if (roleId == 3) {
        toast.success("Booking request sent. Please await confirmation.");
      } else {
        toast.success("Booking added successfully");
      }
    } catch (error) {
      console.error("Failed to add booking:", error.message);
    }
    tabChange2()
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (subdomainId != undefined && roleId != undefined) {
      getAllBookingsData(subdomainId);

      fetchProviders();
    }
  }, [subdomainId]);

  const fetchProviders = async () => {
    if (providers.length === 0) {
      try {
        const response = await API.post("/booking/providers", { subdomainId });
        const data = response.data;
        setProviders(data.usersWithRoleId2);
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

    const hours = selectedDate.getHours();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const minutes = selectedDate.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours < 12 ? "AM" : "PM";

    const selectedTime = `${formattedHours}:${formattedMinutes}:00`;

    setBookingData((prevData) => ({
      ...prevData,
      prefferedDate: selectedDate,
      fromTime: selectedTime,
    }));

    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const handleNewCustomer = () => {
    setShowNewCustomer(!showNewCustomer);
  };

  const handleSelectedChange = (selectedOptions) => {
    setSelectedService(selectedOptions);

    const selectedValues = selectedOptions.map((option) => option.value);
    const selectedValuesString = selectedValues.join(", ");
    setBookingData((prevData) => ({
      ...prevData,
      services: selectedValuesString,
    }));
    const selectedPrices = selectedOptions.map((option) => {
      const price = packagePrice.find((pack) => pack.id === option.value);
      return price.price;
    });

    const totalPrice = selectedPrices.reduce((acc, price) => acc + price, 0);
    setSelectedPackagePrice(totalPrice);
  };

  const handleProviderChange = (selectedOptions) => {
    setSelectedProvider(selectedOptions);

    const selectedValues = selectedOptions.map((option) => option.value);
    const selectedValuesString = selectedValues.join(", ");

    setBookingData((prevData) => ({
      ...prevData,
      provider: selectedValuesString,
    }));
  };

  const handleClientChange = (selectedOptions) => {
    setSelectedClient(selectedOptions);
    setBookingData((prevData) => ({
      ...prevData,
      client: selectedOptions.value,
    }));
  };

  const getAllBookingsData = async () => {
    const datatosend = {
      subdomainId: subdomainId,
      roleId: roleId,
    };
    try {
      let allBookingData = await getAllBookings(datatosend);
      let altData = allBookingData;
      if (roleId == 3) {
        allBookingData = {
          data: allBookingData.data.filter(
            (booking) => booking.user_id === userId
          ),
        };
        setBookingsData(allBookingData.data);
      } else {
        setBookingsData(allBookingData.data);
      }

      let events = altData.data.map((booking) => {
        let title = booking.booking_title;
        let color = "#ff748c";
        let borderColor = "#ff748c";
        let editable = true;
        let status = booking.booking_status;

        if (roleId === 3) {
          if (booking.user_id !== userId) {
            title = "Limited Availability";
            color = "gray";
            borderColor = "gray";
            editable = false;
          } else {
            if (status === 0) {
              color = "#ff748c";
              borderColor = "#ff748c";
            } else {
              color = "#00b5b8";
              borderColor = "#00b5b8";
            }
          }
        }

        return {
          id: booking.id,
          title: title,
          start: `${booking.booking_date}T${booking.booking_time}`,
          end: `${booking.booking_date}T${booking.booking_time_to}`,
          color: color,
          editable: editable,
          status: status,
        };
      });
      setEvents(events);
    } catch (error) {
      console.error("Failed to:", error.message);
    }
  };

  const getBookingData = (data) => {
    console.log(data);
    let array = [];
    setBookingIdToDelete(data.id);
    if (data.package_ids) {
      if (data.package_ids.includes(",")) {
        data.package_ids.split(", ").forEach((element) => {
          array.push(parseInt(element));
        });
      } else {
        array.push(parseInt(data.package_ids));
      }
    }

    setNotifyCheckbox(data.booking_status)

    const selectedServices = array
      .map((id) => packages.find((pack) => pack.id === id))
      .filter(Boolean);

    setBookingAddress({ label: data.booking_title, value: {} });

    const finalservice = selectedServices.map((serv) => ({
      label: serv.package_name,
      value: serv.id,
      package_price: serv.package_price,
    }));

    const selectedPrices = selectedServices.map((serv) => serv.package_price);
    const totalPrice = selectedPrices.reduce((acc, price) => acc + price, 0);
    setSelectedPackagePrice(totalPrice);
    setSelectedService(finalservice);

    let prvdr = [];
    if (data.photographer_id) {
      if (data.photographer_id.includes(", ")) {
        data.photographer_id.split(", ").forEach((element) => {
          prvdr.push(parseInt(element));
        });
      } else {
        prvdr.push(parseInt(data.photographer_id));
      }
    }

    const selectedProvider = prvdr.map((id) =>
      providers.find((provider) => provider.id === parseInt(id))
    );

    const finalProvider =
      selectedProvider &&
      selectedProvider.map((prov) => ({
        label: prov.name || "",
        value: prov.id,
      }));

    setSelectedProvider(finalProvider);

    const clint = clientList.find(
      (client) => client.id === parseInt(data.user_id)
    );

    const finalClient = clint && [
      {
        label: clint.name,
        value: clint.id,
      },
    ];
    setSelectedClient(finalClient);
    const bookingDate = new Date(data.booking_date);
    const bookingTime = new Date(
      `${bookingDate.toISOString().split("T")[0]}T${data.booking_time}`
    );
    const bookingTimeTo = new Date(
      `${bookingDate.toISOString().split("T")[0]}T${data.booking_time_to}`
    );
    const bookingTimeDiff = bookingTimeTo - bookingTime;
    const bookingTimeDiffMinutes = Math.floor(bookingTimeDiff / (1000 * 60));
    setToTime(bookingTimeDiffMinutes);

    setBookingData({
      title: data.booking_title,
      package: data.package,
      services: data.package_ids,
      prefferedDate: data.booking_date,
      fromTime: data.booking_time,
      toTime: `${bookingTimeDiffMinutes}`,
      client: data.user_id,
      comment: data.comment,
      provider: data.photographer_id,
      customer: data.user_id,
    });
  };

  const handleEventClick = (event) => {
    let id = event.event._def.publicId;

    let data = bookingsData.find((booking) => booking.id === parseInt(id));
    getBookingData(data);
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

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
      const booking = bookingsData.find(
        (booking) => booking.id === parseInt(updateData.id)
      );
      const formDataToSend = new FormData();
      formDataToSend.append("id", updateData.id);
      formDataToSend.append("booking_date", booking.booking_date);
      formDataToSend.append("booking_time", updateData.fromTime);
      formDataToSend.append("booking_time_to", updateData.toTime);
      formDataToSend.append("user_id", booking.user_id);
      formDataToSend.append("package_ids", booking.package_ids);
      formDataToSend.append("package", booking.package);
      formDataToSend.append("photographer_id", booking.photographer_id);
      formDataToSend.append("booking_status", notifyCheckbox);
      formDataToSend.append("comment", booking.comment);

      await newBooking(formDataToSend);
      getAllBookingsData();

      setUpdateData({
        title: "",
        package: 1,
        services: "",
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
      second: "2-digit",
      timeZone: "UTC",
    });
    let endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    });

    let booking = bookingsData.find((booking) => booking.id === parseInt(id));

    setUpdateData({
      id: id,
      title: booking.booking_title,
      package: booking.package,
      services: booking.package_ids,
      prefferedDate: booking.booking_date,
      fromTime: startTime,
      toTime: endTime,
      client: booking.user_id,
      comment: booking.comment,
      provider: booking.photographer_id,
      customer: booking.user_id,
    });

    setShowConfirmModel(true);
  };

  const updateDateData = async () => {
    try {
      const booking = bookingsData.find(
        (booking) => booking.id === parseInt(updateData.id)
      );
      const formDataToSend = new FormData();
      formDataToSend.append("id", updateData.id);
      formDataToSend.append("booking_date", updateData.prefferedDate);
      formDataToSend.append("booking_time", updateData.fromTime);
      formDataToSend.append("booking_time_to", updateData.toTime);
      formDataToSend.append("user_id", booking.user_id);
      formDataToSend.append("package_ids", booking.package_ids);
      formDataToSend.append("package", booking.package);
      formDataToSend.append("photographer_id", booking.photographer_id);
      formDataToSend.append("booking_status", notifyCheckbox);
      formDataToSend.append("comment", booking.comment);

      await newBooking(formDataToSend);
      getAllBookingsData();

      setUpdateData({
        title: "",
        package: 1,
        services: "",
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

    const newDateString = newDate.toISOString().split("T")[0];

    let startTime = newDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    });
    let endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    });

    console.log(startTime, endTime);
    const booking = bookingsData.find((booking) => booking.id === parseInt(id));

    setUpdateData({
      id: id,
      title: booking.booking_title,
      package: booking.package,
      services: booking.package_ids,
      prefferedDate: newDateString,
      fromTime: startTime,
      toTime: endTime,
      client: booking.user_id,
      comment: booking.comment,
      provider: booking.photographer_id,
      customer: booking.user_id,
    });

    setShowDateModel(true);
  };

  console.log(updateData);

  const handleNotifyChange = (data) => {
    setUpdateData({
      id: data.id,
      booking_status: data.booking_status,
    });

    setShowNotifyModal(true);
  };
  const updateBookingStatus = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", updateData.id);
      formDataToSend.append("booking_status", 1);

      await updateBooking(formDataToSend);
      getAllBookingsData();
      setBookingData({
        title: "",
        package: 1,
        services: "",
        prefferedDate: new Date(),
        fromTime: "",
        toTime: "60",
        client: "",
        comment: "",
        provider: "",
      });
      setBookingIdToDelete(null);

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
      setSelectedProvider(null);
      setSelectedService(null);
      setSelectedClient(null);
      setBookingAddress(null);
      setNotifyCheckbox(false);
      setToTime("60");
      setSelectedPackagePrice(0);
      setBookingIdToDelete(null);
      setShowNotifyModal(false);
      toast.success("Booking updated successfully");
    } catch (error) {
      toast.error(error);
    }
  };
  const columns = [
    {
      Header: "Booking Date",
      accessor: "booking_date",
      Cell: ({ value }) => (
        <div className="badge badge-pill badge-light-primary">
          {new Date(value).toLocaleDateString("UTC", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      ),
      headerStyle: { width: "200px" },
    },
    {
      Header: "Booking Time",
      accessor: "booking_time",
      Cell: ({ value, row }) => {
        if (!value || !row.original.booking_time_to) return null;

        const formatTime = (time) => {
          const [hours, minutes] = time.split(":");
          let formattedHours = parseInt(hours, 10) % 12 || 12;
          const ampm = parseInt(hours, 10) >= 12 ? "PM" : "AM";
          formattedHours =
            formattedHours < 10 ? `0${formattedHours}` : formattedHours;
          return `${formattedHours}:${minutes} ${ampm}`;
        };

        const formattedTime = formatTime(value);
        const formattedToTime = formatTime(row.original.booking_time_to);

        return (
          <span>
            {formattedTime} - {formattedToTime}
          </span>
        );
      },
    },
    {
      Header: "Client",
      accessor: "client_name",
    },
    {
      Header: "Address",
      accessor: "booking_title",
    },
    {
      Header: "Comment",
      accessor: "comment",
    },
    {
      Header: "Services",
      accessor: "package_ids",
      Cell: ({ value }) => {
        let array = [];
        if (value) {
          if (value.includes(",")) {
            value.split(", ").forEach((element) => {
              array.push(parseInt(element));
            });
          } else {
            array.push(parseInt(value));
          }
        }
        const selectedServices = array
          .map((id) => packages.find((pack) => pack.id === id))
          .filter(Boolean);

        const finalservice = selectedServices.map((serv) => ({
          value: serv.package_name,
          key: serv.id,
        }));
        return (
          <span>{finalservice.map((service) => service.value).join(", ")}</span>
        );
      },
    },
    {
      Header: "Photographer",
      accessor: "photographer_id",
      Cell: ({ value }) => {
        let prvdr = [];
        if (value) {
          if (typeof value === "string") {
            if (value.includes(", ")) {
              value.split(", ").forEach((element) => {
                const parsedInt = parseInt(element);
                if (!isNaN(parsedInt)) {
                  prvdr.push(parsedInt);
                }
              });
            } else {
              const parsedInt = parseInt(value);
              if (!isNaN(parsedInt)) {
                prvdr.push(parsedInt);
              }
            }
          } else if (Array.isArray(value)) {
            value.forEach((element) => {
              const parsedInt = parseInt(element);
              if (!isNaN(parsedInt)) {
                prvdr.push(parsedInt);
              }
            });
          }
        }

        const selectedProvider = prvdr.map((id) =>
          providers.find((provider) => provider.id === parseInt(id))
        );

        const finalProvider =
          selectedProvider &&
          selectedProvider.map((prov) => ({
            value: prov ? prov.name || "" : "",
            key: prov ? prov.id : null,
          }));

        // comma separate values
        return (
          <span>
            {finalProvider.map((provider) => provider.value).join(", ")}
          </span>
        );
      },
    },
    {
      Header: "Status",
      accessor: "booking_status",
      Cell: (props) => (
        <div className="">
          {props.row.original.booking_status === 0 ? (
            <a
              type="button"
              className="badge"
              style={{ backgroundColor: "#ff748c" }}
              title={roleId !== 3 ? "Notify client" : "Pending"}
              onClick={roleId !== 3 && props.row.original.photographer_id === "" ? null :  () => handleNotifyChange(props.row.original)}
              >
              {roleId !== 3 && props.row.original.photographer_id === ""
                ? "New Request"
                : roleId === 3
                ? "Pending"
                : "Notify"}
            </a>
          ) : (
            <a className="badge" title="Booked" disabled>
              Booked
            </a>
          )}
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (props) => (
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-icon btn-outline-primary"
            onClick={() => getBookingData(props.row.original)}
            data-toggle="modal"
            data-target="#appointment"
            title="Edit Booking"
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
            title="Delete Booking"
          >
            <i className="feather white icon-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const subscribe = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .post(
          `${API_URL}/auth/google`,
          {
            code: codeResponse.code,
            id: userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Backend response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    onError: () => {
      console.error("Google login failed");
    },
    scope:
      "https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.readonly",
    flow: "auth-code",
    include_granted_scopes: true,
  });

  const handleAddressChange = (address) => {
    setBookingAddress(address);
  };
  const resetAddress = () => {
    setBookingAddress(null);
  };

  const handleNotifyClose = () => {
    setShowNotifyModal(false);
    setBookingData({
      title: "",
      package: 1,
      services: "",
      prefferedDate: new Date(),
      fromTime: "",
      toTime: "60",
      client: "",
      comment: "",
      provider: "",
    });
    setBookingIdToDelete(null);

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
    setSelectedProvider(null);
    setSelectedService(null);
    setSelectedClient(null);
    setBookingAddress(null);
    setNotifyCheckbox(false);
    setToTime("60");
    setSelectedPackagePrice(0);
  };

  const handleDateModalClose = () => {
    setShowDateModel(false);
    setBookingData({
      title: "",
      package: 1,
      services: "",
      prefferedDate: new Date(),
      fromTime: "",
      toTime: "60",
      client: "",
      comment: "",
      provider: "",
    });
    setBookingIdToDelete(null);

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
    setSelectedProvider(null);
    setSelectedService(null);
    setSelectedClient(null);
    setBookingAddress(null);
    setNotifyCheckbox(false);
    setToTime("60");
    setSelectedPackagePrice(0);

    getAllBookingsData();
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModel(false);
    setBookingData({
      title: "",
      package: 1,
      services: "",
      prefferedDate: new Date(),
      fromTime: "",
      toTime: "60",
      client: "",
      comment: "",
      provider: "",
    });
    setBookingIdToDelete(null);

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
    setSelectedProvider(null);
    setSelectedService(null);
    setSelectedClient(null);
    setBookingAddress(null);
    setNotifyCheckbox(false);
    setToTime("60");
    setSelectedPackagePrice(0);
    getAllBookingsData();
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setBookingData({
      title: "",
      package: 1,
      services: "",
      prefferedDate: new Date(),
      fromTime: "",
      toTime: "60",
      client: "",
      comment: "",
      provider: "",
    });
    setBookingIdToDelete(null);

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
    setSelectedProvider(null);
    setSelectedService(null);
    setSelectedClient(null);
    setBookingAddress(null);
    setNotifyCheckbox(false);
    setToTime("60");
    setSelectedPackagePrice(0);
  };

  const handleAppointmentModalClose = () => {
    setBookingData({
      title: "",
      package: 1,
      services: "",
      prefferedDate: new Date(),
      fromTime: "",
      toTime: "60",
      client: "",
      comment: "",
      provider: "",
    });
    setBookingIdToDelete(null);

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
    setSelectedProvider(null);
    setSelectedService(null);
    setSelectedClient(null);
    setBookingAddress(null);
    setNotifyCheckbox(false);
    setToTime("60");
    setSelectedPackagePrice(0);
    setBookingIdToDelete(null);
    tabChange2();
  };

  const handleNotifyCheckbox = (event) => {
    setNotifyCheckbox(event.target.checked);
  };

  const handleToTimeChange = (event) => {
    setToTime(event.target.value);
    setBookingData({ ...bookingData, toTime: event.target.value });
  };

  const tabChange = () => {
    const tabb2 = document.getElementById("tabb2");
    const tabb1 = document.getElementById("tabb1");
    const tab1 = document.getElementById("tab1");
    const tab2 = document.getElementById("tab2");

    tab1.classList.remove("active");
    tabb1.classList.remove("active");
    tab2.classList.add("active");
    tabb2.classList.add("active");
  };

  const tabChange2 = () => {
    const tabb2 = document.getElementById('tabb2');
    const tabb1 = document.getElementById('tabb1');
    const tab1 = document.getElementById('tab1');
    const tab2 = document.getElementById('tab2');

    tab2.classList.remove('active');
    tabb2.classList.remove('active');
    tab1.classList.add('active');
    tabb1.classList.add('active');
}

  return (
    <>
      <div className="app-content content">
        <div className={`content-overlay`}></div>
        <div className="content-wrapper">
          <div
            className="content-header row mt-2"
            style={{ paddingBottom: "5px" }}
          >
            <div className="content-header-left col-md-6 col-6">
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
            <div className="content-header-right col-md-6 col-6 d-flex justify-content-end align-items-center ">
              <ul className="list-inline mb-0">
                <li>
                  <div className="form-group">
                    <div className="">
                      {calendarSub == null ? (
                        <></>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-primary mx-1"
                          disabled={calendarSub == 1}
                          onClick={subscribe}
                        >
                          {calendarSub == 1
                            ? "Subsribed"
                            : "Subsribe to Calendar"}
                        </button>
                      )}
                      <button
                        ref={buttonRef}
                        type="button"
                        className="btn btn-outline-primary"
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
                              onClick={handleAppointmentModalClose}
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <form onSubmit={handleSubmit} id="booking-form">
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
                                    {roleId !== 3 && (
                                      <a
                                        className="nav-link active"
                                        data-toggle="tab"
                                        href="#tab1"
                                        id="tabb1"
                                      >
                                        Details
                                      </a>
                                    )}
                                  </li>
                                  {roleId !== 3 && (
                                    <li
                                      className="nav-item"
                                      style={{ width: "300px" }}
                                    >
                                      <a
                                        className="nav-link"
                                        id="tabb2"
                                        data-toggle="tab"
                                        href="#tab2"
                                      >
                                        Customer
                                      </a>
                                    </li>
                                  )}
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
                                      {roleId !== 3 && (
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
                                            value={selectedProvider}
                                            onChange={handleProviderChange}
                                            options={providers.map(
                                              (provider) => ({
                                                label: provider.name,
                                                value: provider.id,
                                              })
                                            )}
                                            isSearchable
                                            isMulti
                                            components={{
                                              Option: ({
                                                data,
                                                innerRef,
                                                innerProps,
                                              }) => (
                                                <div
                                                  ref={innerRef}
                                                  {...innerProps}
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                  }}
                                                  className="customOptionClass"
                                                >
                                                  <img
                                                    src={
                                                      data.profile_photo ||
                                                      avatar1
                                                    }
                                                    alt="Profile"
                                                    style={{
                                                      marginRight: "10px",
                                                      borderRadius: "50%",
                                                      width: "30px",
                                                      height: "30px",
                                                      margin: "4px",
                                                    }}
                                                  />
                                                  <span>{data.label}</span>
                                                </div>
                                              ),
                                            }}
                                          />
                                        </div>
                                      )}
                                      <div className="modal-body d-flex px-4">
                                        <label
                                          htmlFor="address"
                                          style={{ width: "10rem" }}
                                        >
                                          Address
                                        </label>
                                        <div className="d-flex w-100">
                                          <GooglePlacesAutocomplete
                                            apiKey="AIzaSyCQUMJXi-NEPTZ6kIPn8-Drxi0wQCJbuQ0"
                                            selectProps={{
                                              bookingAddress,
                                              onChange: handleAddressChange,
                                              value: bookingAddress,
                                            }}
                                          />
                                          <p
                                            style={{
                                              marginLeft: "-4rem",
                                              paddingTop: "5px",
                                              position: "relative",
                                              fontWeight: "bold",
                                              cursor: "pointer",
                                              color: "gray",
                                              opacity: "50%",
                                            }}
                                            onClick={resetAddress}
                                            onMouseOver={(e) =>
                                              (e.target.style.opacity = "80%")
                                            }
                                            onMouseOut={(e) =>
                                              (e.target.style.opacity = "50%")
                                            }
                                            readOnly
                                          >
                                            X
                                          </p>
                                        </div>
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
                                          value={selectedService}
                                          onChange={handleSelectedChange}
                                          options={packages
                                            .map((pkg) => ({
                                              label: pkg.package_name,
                                              value: pkg.id,
                                              package_price: pkg.package_price,
                                            }))
                                            .sort((a, b) =>
                                              a.label < b.label ? -1 : 1
                                            )}
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
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  height: "30px",
                                                  marginTop: "4px",
                                                  marginBottom: "4px",
                                                  cursor: "pointer",
                                                }}
                                                className="customOptionClass"
                                              >
                                                <img
                                                  src={toolIcons}
                                                  style={{
                                                    marginRight: "10px",
                                                    borderRadius: "50%",
                                                    width: "10px",
                                                    height: "10px",
                                                    margin: "4px",
                                                  }}
                                                  alt=""
                                                />
                                                <span
                                                  title={data.label}
                                                  style={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                  }}
                                                >
                                                  {data.label}
                                                </span>
                                              </div>
                                            ),
                                          }}
                                        />
                                      </div>

                                      <div className="modal-body d-flex px-4">
                                        {roleId !== 3 ? (
                                          <div style={{ width: "25rem" }}>
                                            {" "}
                                            Price/ Duration
                                          </div>
                                        ) : (
                                          <div style={{ width: "11rem" }}>
                                            {" "}
                                            Price
                                          </div>
                                        )}
                                        <input
                                          type="text"
                                          id="price"
                                          className="form-control mr-1"
                                          name="price"
                                          value={`$ ${selectedPackagePrice}`}
                                          disabled
                                        />
                                        {roleId !== 3 && (
                                          <select
                                            className="select2 form-control"
                                            name="toTime"
                                            value={toTime}
                                            onChange={handleToTimeChange}
                                            style={{ cursor: "pointer" }}
                                            required
                                          >
                                            <option value="00">
                                              Select Time
                                            </option>
                                            <option value="30">
                                              30 Minutes
                                            </option>
                                            <option value="60">
                                              60 Minutes
                                            </option>
                                            <option value="90">
                                              90 Minutes
                                            </option>
                                            <option value="120">
                                              120 Minutes
                                            </option>
                                            <option value="150">
                                              150 Minutes
                                            </option>
                                            <option value="180">
                                              180 Minutes
                                            </option>
                                          </select>
                                        )}
                                      </div>

                                      <div className="modal-body d-flex px-4 ">
                                        <label
                                          htmlFor="datetimepicker4"
                                          style={{ width: "12rem" }}
                                        >
                                          Date / Time
                                        </label>
                                        <DatePicker
                                          className="form-control custom-datepicker mr-1"
                                          id="datetimepicker4"
                                          name="prefferedDate"
                                          selected={bookingData.prefferedDate}
                                          onChange={(date) =>
                                            setBookingData((prevData) => ({
                                              ...prevData,
                                              prefferedDate: date,
                                            }))
                                          }
                                          dateFormat="dd/MM/yyyy"
                                          required
                                        />

                                        <select
                                          className="select2 form-control w-50 ml-1"
                                          name="fromTime"
                                          value={bookingData.fromTime}
                                          style={{ cursor: "pointer" }}
                                          onChange={handleChange}
                                          required
                                        >
                                          <option value="0">Select Time</option>
                                          <option value="00:00:00">
                                            12:00 AM
                                          </option>
                                          <option value="00:30:00">
                                            12:30 AM
                                          </option>
                                          <option value="01:00:00">
                                            01:00 AM
                                          </option>
                                          <option value="01:30:00">
                                            01:30 AM
                                          </option>
                                          <option value="02:00:00">
                                            02:00 AM
                                          </option>
                                          <option value="02:30:00">
                                            02:30 AM
                                          </option>
                                          <option value="03:00:00">
                                            03:00 AM
                                          </option>
                                          <option value="03:30:00">
                                            03:30 AM
                                          </option>
                                          <option value="04:00:00">
                                            04:00 AM
                                          </option>
                                          <option value="04:30:00">
                                            04:30 AM
                                          </option>
                                          <option value="05:00:00">
                                            05:00 AM
                                          </option>
                                          <option value="05:30:00">
                                            05:30 AM
                                          </option>
                                          <option value="06:00:00">
                                            06:00 AM
                                          </option>
                                          <option value="06:30:00">
                                            06:30 AM
                                          </option>
                                          <option value="07:00:00">
                                            07:00 AM
                                          </option>
                                          <option value="07:30:00">
                                            07:30 AM
                                          </option>
                                          <option value="08:00:00">
                                            08:00 AM
                                          </option>
                                          <option value="08:30:00">
                                            08:30 AM
                                          </option>
                                          <option value="09:00:00">
                                            09:00 AM
                                          </option>
                                          <option value="09:30:00">
                                            09:30 AM
                                          </option>
                                          <option value="10:00:00">
                                            10:00 AM
                                          </option>
                                          <option value="10:30:00">
                                            10:30 AM
                                          </option>
                                          <option value="11:00:00">
                                            11:00 AM
                                          </option>
                                          <option value="11:30:00">
                                            11:30 AM
                                          </option>
                                          <option value="12:00:00">
                                            12:00 PM
                                          </option>
                                          <option value="12:30:00">
                                            12:30 PM
                                          </option>
                                          <option value="13:00:00">
                                            01:00 PM
                                          </option>
                                          <option value="13:30:00">
                                            01:30 PM
                                          </option>
                                          <option value="14:00:00">
                                            02:00 PM
                                          </option>
                                          <option value="14:30:00">
                                            02:30 PM
                                          </option>
                                          <option value="15:00:00">
                                            03:00 PM
                                          </option>
                                          <option value="15:30:00">
                                            03:30 PM
                                          </option>
                                          <option value="16:00:00">
                                            04:00 PM
                                          </option>
                                          <option value="16:30:00">
                                            04:30 PM
                                          </option>
                                          <option value="17:00:00">
                                            05:00 PM
                                          </option>
                                          <option value="17:30:00">
                                            05:30 PM
                                          </option>
                                          <option value="18:00:00">
                                            06:00 PM
                                          </option>
                                          <option value="18:30:00">
                                            06:30 PM
                                          </option>
                                          <option value="19:00:00">
                                            07:00 PM
                                          </option>
                                          <option value="19:30:00">
                                            07:30 PM
                                          </option>
                                          <option value="20:00:00">
                                            08:00 PM
                                          </option>
                                          <option value="20:30:00">
                                            08:30 PM
                                          </option>
                                          <option value="21:00:00">
                                            09:00 PM
                                          </option>
                                          <option value="21:30:00">
                                            09:30 PM
                                          </option>
                                          <option value="22:00:00">
                                            10:00 PM
                                          </option>
                                          <option value="22:30:00">
                                            10:30 PM
                                          </option>
                                          <option value="23:00:00">
                                            11:00 PM
                                          </option>
                                          <option value="23:30:00">
                                            11:30 PM
                                          </option>
                                        </select>
                                      </div>
                                      {roleId !== 3 && (
                                        <div className="modal-body d-flex px-4 align-items-center">
                                          <label
                                            htmlFor="notify"
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ marginLeft: "8rem" }}
                                          >
                                            Notify to Client
                                          </label>
                                          <input
                                            className="form-control h-25"
                                            style={{
                                              width: "3rem",
                                              marginBottom: "0.5rem",
                                            }}
                                            type="checkbox"
                                            id="notify"
                                            name="notify"
                                            checked={notifyCheckbox}
                                            onChange={handleNotifyCheckbox}
                                            value={notifyCheckbox}
                                          />
                                        </div>
                                      )}
                                      <div className="p-1 float-right">
                                        {roleId !== 3 ? (
                                          <a
                                            data-toggle="tab"
                                            href="#tab2"
                                            className="btn btn-primary btn mx-1"
                                            onClick={tabChange}
                                          >
                                            Save & Next
                                          </a>
                                        ) : (
                                          <input
                                            type="submit"
                                            className="btn btn-primary btn mx-1"
                                            value={
                                              bookingIdToDelete
                                                ? "Update"
                                                : "Add"
                                            }
                                          />
                                        )}
                                        <input
                                          onClick={handleAppointmentModalClose}
                                          type="reset"
                                          className="btn btn-secondary btn"
                                          data-dismiss="modal"
                                          value="Close"
                                        />
                                      </div>
                                    </div>

                                    <div className="tab-pane fade" id="tab2">
                                      {showNewCustomer == false && (
                                        <div className="modal-body d-flex px-4">
                                          <label
                                            htmlFor="client"
                                            style={{ width: "10rem" }}
                                          >
                                            Client
                                          </label>
                                          <Select
                                            className="select2 w-100"
                                            name="clients"
                                            value={selectedClient}
                                            onChange={handleClientChange}
                                            options={clientList
                                              .sort((a, b) =>
                                                a.name.localeCompare(b.name)
                                              )
                                              .map((client) => ({
                                                value: client.id,
                                                label: client.name,
                                              }))}
                                            isSearchable
                                            components={{
                                              Option: ({
                                                data,
                                                innerRef,
                                                innerProps,
                                              }) => (
                                                <div
                                                  ref={innerRef}
                                                  {...innerProps}
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                  }}
                                                  className="customOptionClass"
                                                >
                                                  <img
                                                    src={
                                                      data.profile_photo ||
                                                      avatar1
                                                    }
                                                    alt="Profile"
                                                    style={{
                                                      marginRight: "10px",
                                                      borderRadius: "50%",
                                                      width: "30px",
                                                      height: "30px",
                                                      margin: "4px",
                                                    }}
                                                  />
                                                  <span>{data.label}</span>
                                                </div>
                                              ),
                                            }}
                                          />
                                        </div>
                                      )}

                                      <div className="modal-body d-flex px-4">
                                        <label
                                          htmlFor="comment"
                                          style={{ width: "11rem" }}
                                        >
                                          Comment
                                        </label>
                                        <textarea
                                          type="text"
                                          id="comment"
                                          value={bookingData.comment}
                                          className="form-control"
                                          placeholder="Notes for the customer."
                                          name="comment"
                                          onChange={handleChange}
                                        />
                                      </div>
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
                                      <div className="p-1 flex float-right">
                                        <>
                                          <input
                                            type="submit"
                                            className="btn btn-primary btn mx-1"
                                            value={
                                              bookingData.id ? "Update" : "Add"
                                            }
                                          />
                                        </>

                                        <input
                                          type="reset"
                                          className="btn btn-secondary btn"
                                          data-dismiss="modal"
                                          value="Close"
                                          onClick={handleAppointmentModalClose}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
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
                                const days = [
                                  "Sunday",
                                  "Monday",
                                  "Tuesday",
                                  "Wednesday",
                                  "Thursday",
                                  "Friday",
                                  "Saturday",
                                ];
                                const day = date
                                  .getDate()
                                  .toString()
                                  .padStart(2, "0");
                                const month = (date.getMonth() + 1)
                                  .toString()
                                  .padStart(2, "0");
                                const dayName = days[date.getDay()];
                                return (
                                  <div className="responsive-header">
                                    <div>{`${day}/${month}`}</div>
                                    <div>{dayName}</div>
                                  </div>
                                );
                              },
                            },
                            timeGridDay: {
                              dayHeaderContent: ({ date }) => {
                                const days = [
                                  "Sunday",
                                  "Monday",
                                  "Tuesday",
                                  "Wednesday",
                                  "Thursday",
                                  "Friday",
                                  "Saturday",
                                ];
                                const day = date
                                  .getDate()
                                  .toString()
                                  .padStart(2, "0");
                                const month = (date.getMonth() + 1)
                                  .toString()
                                  .padStart(2, "0");
                                const dayName = days[date.getDay()];
                                return (
                                  <div className="responsive-header">
                                    <div>{`${day}/${month}`}</div>
                                    <div>{dayName}</div>
                                  </div>
                                );
                              },
                            },
                          }}
                          eventResize={handleEventResize}
                          firstDay={1}
                          dateClick={handleDateClick}
                          initialView="timeGridWeek"
                          eventClick={(info) => {
                            if (info.event.backgroundColor === "gray") {
                              return;
                            }
                            handleEventClick(info);
                          }}
                          eventDrop={handleDateChange}
                          headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                          }}
                          selectable={true}
                          events={events}
                          eventTimeFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                          }}
                          eventContent={(arg, createElement) => {
                            return (
                              <div
                                style={{
                                  borderColor: arg.event.borderColor,
                                  backgroundColor: arg.event.backgroundColor,
                                  color: arg.event.textColor,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxHeight: "100%",
                                  width: "100%",
                                  height: "100%",
                                  maxWidth: "100%",
                                }}
                              >
                                <span
                                  style={{ fontSize: "10px", fontWeight: "" }}
                                >
                                  {arg.event.start
                                    .toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                    .toUpperCase()}{" "}
                                  -{" "}
                                  {arg.event.end
                                    .toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })
                                    .toUpperCase()}
                                </span>
                                <br />
                                <b>{arg.event.title}</b>
                              </div>
                            );
                          }}
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
        onClose={handleDeleteModalClose}
        onConfirm={deleteBookingData}
        message="Are you sure you want to delete this appointment?"
      />
      <ConfirmModal
        isOpen={showConfirmModel}
        onClose={handleConfirmModalClose}
        onConfirm={updateTimeData}
        message="Do you wish to Reschedule the appointment?"
      />
      <ConfirmModal
        isOpen={showDateModel}
        onClose={handleDateModalClose}
        onConfirm={updateDateData}
        message="Do you wish to Reschedule the appointment?"
      />
      <ConfirmModal
        isOpen={showNotifyModal}
        onClose={handleNotifyClose}
        onConfirm={updateBookingStatus}
        message="Do you wish to confirm the booking and notify?"
      />
      <div className="sidenav-overlay"></div>
      <div className="drag-target"></div>
    </>
  );
};
