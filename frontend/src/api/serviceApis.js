import API from "./baseApi";

const getAllServices = async (data) => {
  try {
    const response = await API.post("/service/getAllservices", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get services");
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

const getService = async (data) => {
  try {
    const response = await API.post("/service/getService", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get services");
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

const createService = async (data) => {
  try {
    const response = await API.post("/service/createService", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create service");
    }
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

const deleteService = async (data) => {
  try {
    const response = await API.post("/service/deleteService", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to delete service");
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

const updateServiceOrder = async (data) => {
  try {
    const response = await API.post("/service/updateServiceOrder", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to update service order");
    }
  } catch (error) {
    console.error("Error updating service order:", error);
    throw error;
  }
};

export { getAllServices, getService, createService, deleteService, updateServiceOrder };
