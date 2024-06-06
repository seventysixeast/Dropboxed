import API from "./baseApi";

const getAllInvoices = async (data) => {
    try {
        const response = await API.post(`/invoice/getAllInvoices`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to get all invoices");
        }
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getInvoiceData = async (data) => {
    try {
        const response = await API.post(`/invoice/getInvoiceData`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to get Invoice Data!");
        }
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteInvoiceById = async (data) => {
    try {
        const response = await API.post(`/invoice/deleteInvoice`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to delete Invoice!");
        }
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateInvoice = async (data) => {
    try {
        const response = await API.post('/invoice/updateInvoice', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.status === 200) {
            throw new Error('Failed to update collection');
        }
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

const sendInvoice = async (data) => {
    try {
        const response = await API.post('/invoice/send-invoice', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error('Failed to send invoice');
        }
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};


export { getAllInvoices, deleteInvoiceById, getInvoiceData, updateInvoice, sendInvoice };

