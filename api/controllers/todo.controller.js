import Todo from '../models/todo.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
    console.log(req.body);
  if (!req.body.title || !req.body.description) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newTodo = new Todo({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    next(error);
  }
};

