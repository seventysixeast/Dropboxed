import API from "./baseApi";

const getAllPhotographersAndSubdomains = async () => {
  try {
    const response = await API.post('/photographerandsubdomain/getAllPhotographersAndSubdomains', {});
    if (response.status !== 200) {
      throw new Error('Failed to get user');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const createPhotographerAndSubdomain = async (data) => {
  try {
    const response = await API.post('/photographerandsubdomain/createPhotographerAndSubdomain', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to create user');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const getPhotographerAndSubdomain = async (data) => {
  try {
    const response = await API.post('/photographerandsubdomain/getPhotographerAndSubdomain', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get user');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePhotographerAndSubdomain = async (data) => {
  try {
    const response = await API.post('/photographerandsubdomain/deletePhotographerAndSubdomain', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete user');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllPhotographersAndSubdomains, createPhotographerAndSubdomain, getPhotographerAndSubdomain, deletePhotographerAndSubdomain };