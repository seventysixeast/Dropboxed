import API from "./baseApi";

// const addGallery = async (galleryData) => {
//   try {
//     const response = await API.post('/collection/addGallery', galleryData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     if (response.status !== 200) {
//       throw new Error('Failed to add gallery');
//     }
//     return response.data;
//   } catch (error) {
//     return error.response.data.error;
//   }
// };

// const getAllCollections = async (data) => {
//   try {
//     const response = await API.post('/collection/getAllCollections', data);
//     if (response.status !== 200) {
//       throw new Error('Failed to get collections');
//     }
//     return response.data;
//   } catch (error) {
//     return error.response.data.error;
//   }
// };

// const updateGalleryLock = async (data) => {
//   try {
//     const response = await API.post('/collection/updateGalleryLock', data);
//     if (response.status !== 200) {
//       throw new Error('Failed to update Gallery');
//     }
//     return response.data;
//   } catch (error) {
//     return error.response.data.error;
//   }
// };

// const getCollection = async (data) => {
//   try {
//     const response = await API.post('/collection/getCollection', data, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.status === 200) {
//       throw new Error('Failed to get collection');
//     }
//     return response.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };


// create get orders with post 

const getAllOrders = async (data) => {
    try {
        const response = await API.post('/order/getOrders', data);
        if (response.status !== 200) {
            throw new Error('Failed to get orders');
        }
        return response.data;
    } catch (error) {
        return error.response.data.error;
    }
};



export { getAllOrders };
