const newBooking = async (bookingData) => {
  try {
    const response = await fetch(`/new-booking`, {
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

export { newBooking };