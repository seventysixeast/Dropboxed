import API from "./baseApi";

const getAllServices = async (data) => {
  console.log(data);

  try {
    const response = await API.post('/service/getAllservices', data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to get services');
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};


export { getAllServices };