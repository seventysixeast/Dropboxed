import axios from 'axios';

const newBooking = async (bookingData) => {
  try {
    const response = await fetch(`http://localhost:6977/booking/new-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error("Failed to add booking");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCalendar = async (calendarData) => {
  console.log(calendarData);
  try {
    const response = await fetch(`http://localhost:6977/booking/create-calendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calendarData),
    });
    if (!response.ok) {
      throw new Error("Failed to create calendar");
    }
    const filename = await response.text();
    return filename;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllBookings = async () => {
  try {
    const response = await axios.get('http://localhost:6977/booking/getAllBookings', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get all booking');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { newBooking, createCalendar, getAllBookings };
