import API from "./baseApi";

const newBooking = async (bookingData) => {
  try {
    const response = await API.post('/booking/new-booking', bookingData);
    if (response.status !== 200) {
      throw new Error('Failed to add booking');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProviders = async (data) => {
  try {
    const response = await API.post('/booking/providers', data);
    if (response.status !== 200) {
      throw new Error('Failed to create calendar');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const createCalendar = async (calendarData) => {
  try {
    const response = await API.post('/booking/create-calendar', calendarData);
    if (response.status !== 200) {
      throw new Error('Failed to create calendar');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllBookings = async (data) => {
  try {
    const response = await API.post(`/booking/getAllBookings`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to get all bookings');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBooking = async (data) => {
  try {
    const response = await API.post(`/booking/getBooking`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete booking');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteBooking = async (data) => {
  try {
    const response = await API.post('/booking/deleteBooking', data);
    if (response.status !== 200) {
      throw new Error('Failed to delete booking');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCalendarStatus = async (data) => {
  try {
    const response = await API.post('/booking/getCalendarStatus', data);
    if (response.status !== 200) {
      throw new Error('Failed to delete booking');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const updateBooking = async (data) => {
  try {
    const response = await API.post('/booking/updateBooking', data);
    if (response.status !== 200) {
      throw new Error('Failed to update booking');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllBookingTitles = async (data) => {
  try {
    const response = await API.post(`/booking/getAllBookingTitles`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to booking');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllServices = async (data) => {
  try {
    const response = await API.post(`/booking/getAllServices`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to services');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllPhotographers = async (data) => {
  try {
    const response = await API.post(`/booking/getAllPhotographers`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to photographers');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getProviders, newBooking, createCalendar, getAllBookings, getBooking, deleteBooking, updateBooking, getAllBookingTitles, getAllServices, getAllPhotographers, getCalendarStatus };