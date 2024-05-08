import API from "./baseApi";

const getAllPhotographers = async (data) => {
  try {
    const response = await API.post('/photographer/getAllPhotographers', data);
    if (response.status !== 200) {
      throw new Error('Failed to get photographer');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const createPhotographer = async (data) => {
  try {
    const response = await API.post('/photographer/createPhotographer', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to create photographer');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const getPhotographer = async (data) => {
  try {
    const response = await API.post('/photographer/getPhotographer', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get photographer');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePhotographer = async (data) => {
  try {
    const response = await API.post('/photographer/deletePhotographer', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete photographer');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllPhotographers, createPhotographer, getPhotographer, deletePhotographer };