const express = require("express");
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/getAllTasks", authenticateToken, todoController.getAllTasks);
router.post("/createTask", authenticateToken, todoController.createTask);
router.post("/addComment", authenticateToken, todoController.addComment);
router.post("/setTaskStatus", authenticateToken, todoController.setTaskStatus);
router.post("/deleteTask", authenticateToken, todoController.deleteTask)
router.post("/setTaskFavorite", authenticateToken, todoController.setTaskFavorite)

module.exports = router;
