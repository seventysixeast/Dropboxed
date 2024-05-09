import API from "./baseApi";

const getAllPhotographerAdmins = async () => {
  try {
    const response = await API.post('/photographerAdmin/getAllPhotographerAdmins', {});
    if (response.status !== 200) {
      throw new Error('Failed to get photographer admin');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const updatePhotographerAdmin = async (data) => {
  try {
    const response = await API.post('/photographerAdmin/updatePhotographerAdmin', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to create photographer admin');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const getPhotographerAdmin = async (data) => {
  try {
    const response = await API.post('/photographerAdmin/getPhotographerAdmin', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get photographer admin');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePhotographerAdmin = async (data) => {
  try {
    const response = await API.post('/photographerAdmin/deletePhotographerAdmin', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete photographer admin');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllPhotographerAdmins, updatePhotographerAdmin, getPhotographerAdmin, deletePhotographerAdmin };