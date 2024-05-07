const express = require("express");
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/getAllTasks",
  authenticateToken,
  todoController.getAllTasks
);

router.post("/createTask", authenticateToken, todoController.createTask);


module.exports = router;
