import { Request, Response, NextFunction } from "express";
import Todo from "../models/Todo.js";

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const { title, description, dueDate } = req.body;
    const todo = await Todo.create({
      user: user._id,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const listTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const todos = await Todo.find({ user: user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: user._id },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

export const toggleTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const todo = await Todo.findOne({ _id: req.params.id, user: user._id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    next(err);
  }
};
