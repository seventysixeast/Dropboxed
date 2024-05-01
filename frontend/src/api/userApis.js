import API from "./baseApi";

const getUser = async (data) => {
  try {
    const response = await API.post('/user/getUser', data);
    if (response.status !== 200) {
      throw new Error('Failed to get user');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const updateUser = async (data) => {
  try {
    const response = await API.post('/user/updateUser', data, {
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

const changePassword = async (data) => {
  try {
    const response = await API.post('/user/changePassword', data);
    if (response.status !== 200) {
      throw new Error('Failed to change password');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { getUser, updateUser, changePassword };
