const Todo = require("../models/Todo");

exports.getAllTodos = (req, res) => {
  Todo.find()
    .sort("-createdAt")
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Something went wrong in finding all todos",
      });
    });
};

exports.getTodo = (req, res) => {
  console.log(res.json(req.todo));
  return res.json(req.todo);
};

exports.createTodo = (req, res) => {
  const todo = new Todo(req.body);
  console.log(req.body);
  todo
    .save()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Something went wrong in finding all todos",
      });
    });
};

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.todoId;
    const getTodoById = await Todo.findByIdAndUpdate(id, req.body);
    res.send(getTodoById);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.todoId;
    const deletedID = await Todo.findByIdAndDelete(id);
    res.send(deletedID);
  } catch (error) {
    res.status(400).send(error);
  }
};
