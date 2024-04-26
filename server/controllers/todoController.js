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
        const commentsData = tasks.flatMap(task => task.TaskComments) || [];

        res.status(200).json({ success: true, tasks: tasksData, tags: tagsData, comments: commentsData });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to list tasks" });
    }
};

module.exports = { getAllTasks };
