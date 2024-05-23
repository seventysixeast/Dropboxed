const express = require("express");
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/getAllTasks", todoController.getAllTasks);
router.post("/createTask", todoController.createTask);
router.post("/addComment", todoController.addComment);
router.post("/setTaskStatus", todoController.setTaskStatus);
router.post("/deleteTask", todoController.deleteTask)
router.post("/setTaskFavorite", todoController.setTaskFavorite)
router.post("/createTag", todoController.createTag)
router.post("/deleteTag", todoController.deleteTag)

module.exports = router;
