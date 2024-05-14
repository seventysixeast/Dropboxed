import API from "./baseApi";

const getAllImageTypes = async (data) => {
  try {
    const response = await API.post('/imageType/getImageTypes', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get all ImageTypes');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
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
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

export { getAllImageTypes, createImageType, getImageType, deleteImageType };