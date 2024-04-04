import axios from 'axios';

const getAllImageTypes = async () => {
  try {
    const response = await axios.get('http://localhost:6977/imageType/getImageTypes', {
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
    const response = await axios.post('http://localhost:6977/imageType/createImageType', imageTypeData, {
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
    const response = await axios.post('http://localhost:6977/imageType/getImageType', data, {
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
    const response = await axios.post('http://localhost:6977/imageType/deleteImageType', data, {
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