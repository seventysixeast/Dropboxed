import API from "./baseApi";

const getAllClients = async () => {
  try {
    const response = await API.get('/client/getAllClients');
    if (response.status !== 200) {
      throw new Error('Failed to get all clients');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
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
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

export { getAllClients, createClient, getClient, deleteClient };
