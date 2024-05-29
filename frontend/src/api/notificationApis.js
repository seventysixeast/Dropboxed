import API from "./baseApi";

const getAllNotifications = async (data) => {
  try {
    const response = await API.post(`/notification/getAllNotifications`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.status === 200) {
      throw new Error('Failed to get notifications');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const deleteNotification = async (data) => {
  try {
    const response = await API.post('/notification/deleteNotification', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete notification');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { getAllNotifications, deleteNotification };