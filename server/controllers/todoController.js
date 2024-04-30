const TaskTodo = require("../models/Todo");
const TaskTag = require("../models/TodoTags");
const TaskComment = require("../models/TodoComments");

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
                include: [TaskComment],
                order: [["task_order", "DESC"]],
            });
        } else {
            tasks = await TaskTodo.findAll({
                where: {
                    subdomain_id: subdomainId,
                    role_id: roleId,
                },
                include: [TaskComment],
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
    try {
        const {
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
            is_favourite
        } = req.body;

        const newTask = await TaskTodo.create({
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
            is_favourite
        });

        // Create TaskComment
        const newComment = await TaskComment.create({
            user_id,
            task_id: newTask.id, // Assuming newTask.id is the primary key of the TaskTodo record
            comments: comment,
            subdomain_id
        });

        res.status(201).json({ success: true, task: newTask, comment: newComment });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
};

module.exports = { getAllTasks, createTask };
