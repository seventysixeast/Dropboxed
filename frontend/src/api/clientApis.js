import axios from 'axios';

const getAllClients = async () => {
  try {
    const response = await axios.get('http://localhost:6977/client/getAllClients', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get all clients');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createClient = async (clientData) => {
  try {
    const response = await axios.post('http://localhost:6977/client/createClient', clientData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to create client');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getClient = async (data) => {
  try {
    const response = await axios.post('http://localhost:6977/client/getClient', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to get client');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteClient = async (data) => {
  try {
    const response = await axios.post('http://localhost:6977/client/deleteClient', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to delete client');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getAllClients, createClient, getClient, deleteClient };