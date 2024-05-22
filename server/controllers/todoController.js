const TaskTodo = require("../models/Todo");
const TaskTag = require("../models/TodoTags");
const TaskComment = require("../models/TodoComments");
const Users = require("../models/Users"); // Import the Users model

const getAllTasks = async (req, res) => {
  const subdomainId = req.body.subdomain_id;
  const roleId = req.body.role_id;

  try {
    let tasks;
    if (roleId !== 5) {
      tasks = await TaskTodo.findAll({
        where: {
          subdomain_id: subdomainId,
        },
        include: [
          {
            model: TaskComment,
          },
          {
            model: Users,
            as: "author",
            attributes: ["id", "name", "profile_photo"],
          },
        ],
        order: [["task_order", "DESC"]],
      });
    } else {
      tasks = await TaskTodo.findAll({
        where: {
          subdomain_id: subdomainId,
          role_id: roleId,
        },
        include: [
          {
            model: TaskComment,
          },
          {
            model: Users,
            as: "author",
            attributes: ["id", "user_name", "profile_photo"],
          },
        ],
        order: [["task_order", "DESC"]],
      });
    }
    const tags = await TaskTag.findAll({
      where: {
        subdomain_id: subdomainId,
      },
    });

    const tasksData = tasks && tasks.length > 0 ? tasks : [];
    const tagsData = tags && tags.length > 0 ? tags : [];
    res.status(200).json({ success: true, tasks: tasksData, tags: tagsData });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to list tasks" });
  }
};

const createTask = async (req, res) => {
  let newTask, newComment;
  try {
    const {
      id,
      user_id,
      subdomain_id,
      role_id,
      task_title,
      assign_user,
      task_assigndate,
      task_description,
      task_tags,
      comments,
      status,
      is_favourite,
    } = req.body;

    if (id === "") {
      newTask = await TaskTodo.create({
        user_id,
        subdomain_id,
        role_id,
        task_title,
        assign_user,
        task_assigndate,
        task_tags,
        task_description,
        comments,
        status,
        is_favourite,
      });

      const taskOrder = newTask.id;
      await TaskTodo.update(
        { task_order: taskOrder },
        { where: { id: newTask.id } }
      );
    } else {
      await TaskTodo.update(
        {
          task_title,
          assign_user,
          task_assigndate,
          task_tags,
          task_description,
          comments,
          status,
          is_favourite,
        },
        { where: { id } }
      );
      newTask = await TaskTodo.findByPk(id);
    }

    if (comments.trim() !== "") {
      console.log("Adding new comment");
      newComment = await TaskComment.create({
        user_id,
        task_id: newTask.id,
        comments: comments,
        subdomain_id,
      });
    }



    res.status(201).json({ success: true, task: newTask, comment: newComment });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

const addComment = async (req, res) => {
  try {
    const { task_id, user_id, comments, subdomain_id } = req.body;
    const newComment = await TaskComment.create({
      task_id,
      user_id,
      comments,
      subdomain_id,
    });
    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

const setTaskStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await TaskTodo.update({ status }, { where: { id } });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Failed to update task status" });
  }
};

const setTaskFavorite = async (req, res) => {
  try {
    const { id, is_favourite } = req.body;
    await TaskTodo.update({ is_favourite }, { where: { id } });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating task favorite:", error);
    res.status(500).json({ error: "Failed to update task favorite" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.body;

  try {
    await TaskComment.destroy({
      where: {
        task_id: id,
      },
    });

    await TaskTodo.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  addComment,
  setTaskStatus,
  setTaskFavorite,
  deleteTask,
};
