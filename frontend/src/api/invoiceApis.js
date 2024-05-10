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


export { getAllInvoices, deleteInvoiceById };

