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

const createTask = async (data) => {
  try {
    const response = await API.post("/todo/createTask", data);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to create task");
    }
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const addComment = async (data) => {
  try {
    const response = await API.post("/todo/addComment", data);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Failed to add comment");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

const setTaskStatus = async (data) => {
  try {
    const response = await API.post("/todo/setTaskStatus", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to set status");
    }
  } catch (error) {
    console.error("Error setting status:", error);
    throw error;
  }
};

const setTaskFavorite = async (data) => {
  try {
    const response = await API.post("/todo/setTaskFavorite", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to set favorite");
    }
  } catch (error) {
    console.error("Error setting favorite:", error);
    throw error;
  }
};

const deleteTask = async (data) => {
  try {
    const response = await API.post("/todo/deleteTask", data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export { getAlltasks, createTask, addComment, setTaskStatus, setTaskFavorite, deleteTask };
