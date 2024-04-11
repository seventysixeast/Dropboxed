import API from "./baseApi";

const getAllServices = async () => {
  try {
    const response = await API.get('/service/getAllServices');
    if (response.status !== 200) {
      throw new Error('Failed to get all services');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { getAllServices };