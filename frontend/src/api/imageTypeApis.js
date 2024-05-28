import API from "./baseApi";

const getAllImageTypes = async (data) => {
  try {
    const response = await API.post(`/imageType/getImageTypes`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.status === 200) {
      throw new Error('Failed to get ImageTypes');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const createImageType = async (imageTypeData) => {
  try {
    const response = await API.post('/imageType/createImageType', imageTypeData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to create ImageType');
    }
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getImageType = async (data) => {
  try {
    const response = await API.post('/imageType/getImageType', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get ImageType');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const deleteImageType = async (data) => {
  try {
    const response = await API.post('/imageType/deleteImageType', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete ImageType');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { getAllImageTypes, createImageType, getImageType, deleteImageType };