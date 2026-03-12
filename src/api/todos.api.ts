import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { useTodos } from "../controllers/todo.controller";

const app = new Hono();

const validateTodoId = z
  .string()
  .refine(
    (val) => {
      const num = parseInt(val);
      return !isNaN(num) && num > 0;
    },
    { message: "ID must be a positive number" },
  )
  .transform((val) => parseInt(val));

const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const deleteTodoSchema = z.object({
  id: validateTodoId,
});

const updateTodoSchema = z.object({
  id: validateTodoId,
});

const updateTodoBodySchema = z.object({
  completed: z.boolean(),
});

const { addTodo, deleteTodo, getTodos, updateTodo } = useTodos();

app.get("/", (c) => {
  const todos = getTodos();
  return c.json({
    success: true,
    todos,
  });
});

app.post("/", zValidator("json", createTodoSchema), (c) => {
  const { title } = c.req.valid("json");

  const newTodo = addTodo(title);

  return c.json({
    success: true,
    newTodo,
  });
});

app.delete("/:id", zValidator("param", deleteTodoSchema), (c) => {
  const { id } = c.req.valid("param");
  const deletedTodo = deleteTodo(id);

  if (!deletedTodo) {
    return c.json(
      {
        success: false,
        message: `Todo with ID ${id} not found`,
      },
      404,
    );
  }
  return c.json({
    success: true,
    message: `Todo with ID ${id} deleted successfully`,
  });
});

app.put(
  "/:id",
  zValidator("param", updateTodoSchema),
  zValidator("json", updateTodoBodySchema),
  (c) => {
    const { id } = c.req.valid("param");
    const { completed } = c.req.valid("json");

    const updatedTodo = updateTodo(id, completed);

    if (!updatedTodo) {
      return c.json(
        {
          success: false,
          message: `Todo with ID ${id} not found`,
        },
        404,
      );
    }

    return c.json({
      success: true,
      updatedTodo,
    });
  },
);

export default app;
