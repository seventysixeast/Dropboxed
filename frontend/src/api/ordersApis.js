import API from "./baseApi";


const getAllOrders = async (data) => {
    try {
        const response = await API.post('/orders/getAllOrders', data);
        if (response.status !== 200) {
            throw new Error('Failed to get orders');
        }
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
};



export { getAllOrders };
