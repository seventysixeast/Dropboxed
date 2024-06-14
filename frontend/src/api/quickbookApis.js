import API from "./baseApi";

const getQuickBooksAuthUrl = async () => {
  try {
    const response = await API.get('/qb/auth-url');
    if (response.status !== 200) {
      throw new Error('Failed to get QuickBooks auth URL');
    }
    return response.data.authUrl;
  } catch (error) {
    return error.response.data.error;
  }
};

const handleQuickBooksCallback = async (params) => {
  try {
    console.log("params",params)
    const response = await API.get('/qb/callback', { params });
    if (response.status !== 200) {
      throw new Error('Failed to handle QuickBooks callback');
    }
    return response.data;
  } catch (error) {
    return error.response.data.error;
  }
};

export { getQuickBooksAuthUrl, handleQuickBooksCallback };
