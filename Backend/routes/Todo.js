const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/Todo");


router.get("/todos", getAllTodos);


router.get("/todo/:todoId", getTodo);

router.post("/todo/create", createTodo);

router.patch("/todo/:todoId", updateTodo);

router.delete("/todo/:todoId", deleteTodo);

module.exports = router;
