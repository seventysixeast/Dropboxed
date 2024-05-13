import API from "./baseApi";

const addGallery = async (galleryData) => {
  try {
    const response = await API.post('/collection/addGallery', galleryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to add gallery');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const getAllCollections = async (data) => {

  console.log(data);
  try {
    const response = await API.post('/collection/getAllCollections', data);
    console.log('response.data========>', response.data);
    if (response.status !== 200) {
      throw new Error('Failed to get collections');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }


};

const getCollection = async (data) => {
  try {
    const response = await API.post('/collection/getCollection', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get collection');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDropboxRefreshToken = async (data) => {
  try {
    const response = await API.post('/collection/getDropboxRefresh', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('No refresh token found');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteCollection = async (data) => {
  try {
    const response = await API.post('/collection/deleteCollection', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete collection');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { addGallery, getAllCollections, getCollection, getDropboxRefreshToken, deleteCollection };