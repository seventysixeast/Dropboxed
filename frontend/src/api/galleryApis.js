import API from "./baseApi";

const addGallery = async (galleryData) => {
  try {
    const response = await API.post('/gallery/addGallery', galleryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to create gallery');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { addGallery };