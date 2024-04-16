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

export { addGallery };