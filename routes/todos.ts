import express from "express";
import { requireAuth } from "../middleware/auth";
import { createTodo, listTodos, updateTodo, deleteTodo, toggleTodo } from "../controllers/todoController";
import { validate } from "../middleware/validate";
import { createTodoSchema, updateTodoSchema } from "../schemas/todoSchema";

const router = express.Router();

router.use(requireAuth);

router.get("/", listTodos);
router.post("/", validate(createTodoSchema), createTodo);
router.put("/:id", validate(updateTodoSchema), updateTodo);
router.delete("/:id", deleteTodo);
router.post("/:id/toggle", toggleTodo);

export default router;
