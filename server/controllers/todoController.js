const TaskTodo = require("../models/Todo");
const TaskTag = require("../models/TodoTags");
const TaskComment = require("../models/TodoComments");
const Users = require("../models/Users"); // Import the Users model

const getAllTasks = async (req, res) => {
  const subdomainId = req.body.subdomain_id;
  const roleId = req.body.role_id;

  console.log(subdomainId, roleId);

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
            as: "author", // Alias for the Users model
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
            as: "author", // Alias for the Users model
            attributes: ["id", "user_name", "profile_photo"], // Specify attributes to retrieve
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
      comment,
      status,
      is_favourite,
    } = req.body;

    if (id === "") {
      console.log("Creating new task");
      newTask = await TaskTodo.create({
        user_id,
        subdomain_id,
        role_id,
        task_title,
        assign_user,
        task_assigndate,
        task_tags,
        task_description,
        comment,
        status,
        is_favourite,
      });
    } else {
      console.log("Updating existing task");
      await TaskTodo.update(
        {
          task_title,
          assign_user,
          task_assigndate,
          task_tags,
          task_description,
          comment,
          status,
          is_favourite,
        },
        { where: { id } }
      );
      newTask = await TaskTodo.findByPk(id);
    }

    if (comment.trim() !== "") {
      console.log("Adding new comment");
      newComment = await TaskComment.create({
        user_id,
        task_id: newTask.id,
        comments: comment,
        subdomain_id,
      });
    }

    res.status(201).json({ success: true, task: newTask, comment: newComment });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

module.exports = { getAllTasks, createTask };
