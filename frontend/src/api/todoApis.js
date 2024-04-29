import API from "./baseApi";

const getAlltasks = async (data) => {
  try {
    const response = await API.post("/todo/getAllTasks", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export { getAlltasks };

