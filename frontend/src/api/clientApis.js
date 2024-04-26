import API from "./baseApi";

const getAllClients = async (data) => {
  try {
    const response = await API.post('/client/getAllClients', data);
    if (response.status !== 200) {
      throw new Error('Failed to get client');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const getClientPhotographers = async (data) => {
  try {
    const response = await API.post('/client/getClientPhotographers', data);
    if (response.status !== 200) {
      throw new Error('Failed to get client');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};


const createClient = async (clientData) => {
  try {
    const response = await API.post('/client/createClient', clientData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to create client');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const getClient = async (data) => {
  try {
    const response = await API.post('/client/getClient', data);
    if (response.status !== 200) {
      throw new Error('Failed to get client');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const deleteClient = async (data) => {
  try {
    const response = await API.post('/client/deleteClient', data);
    if (response.status !== 200) {
      throw new Error('Failed to delete client');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const activeInactiveClient = async (data) => {
  try {
    const response = await API.post('/client/activeInactiveClient', data);
    if (response.status !== 200) {
      throw new Error('Failed to client status');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

const getAllPhotographers = async (data) => {
  try {
    const response = await API.post('/client/getAllPhotographers', data);
    if (response.status !== 200) {
      throw new Error('Failed to get photographers');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { getAllClients, createClient, getClient, deleteClient, activeInactiveClient, getAllPhotographers, getClientPhotographers };
