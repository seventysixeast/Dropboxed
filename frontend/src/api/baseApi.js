//baseservice.js
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6977";
let csrfToken = null; 
export const fetchCsrfToken = async () => {
  try {
    if (csrfToken) {
      return csrfToken;
    }

    // const response = await axios.get(`${API_URL}/csrf-token`);
    // csrfToken = response.data.csrf_token; // Cache the CSRF token
    // return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

// Function to retrieve the access token
const getToken = () => {
  return localStorage.getItem('accessToken');
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

// export const checkUserLogin = async () => {
//   try {
//     const response = await axiosInstance.get('/user');
//     const user = response.data;
//     if (user.id) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw error;
//   }
// };

export default axiosInstance;
