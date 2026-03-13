import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { todoService } from "../service/todo.service";
import { todoSchemas } from "../schema/todo.schema";

const app = new Hono();

const {
  createTodoParamSchema,
  deleteTodoParamSchema,
  getTodoByIdParamSchema,
  updateTodoBodySchema,
  updateTodoParamSchema,
} = todoSchemas;

const { addTodo, deleteTodo, getTodos, updateTodo, getTodoById } =
  todoService();

app.get("/", (c) => {
  const { success, data } = getTodos();

  if (!success) {
    return c.json(
      {
        success: false,
        message: "Failed to retrieve todos",
      },
      500,
    );
  }

  return c.json({
    success: true,
    todos: data,
  });
});

app.post("/", sValidator("json", createTodoParamSchema), (c) => {
  const { title } = c.req.valid("json");

  const { success, data } = addTodo(title);

  if (!success) {
    return c.json(
      {
        success: false,
        message: "Failed to add todo",
      },
      500,
    );
  }

  return c.json({
    success: true,
    newTodo: data,
  });
});

app.get("/:id", sValidator("param", getTodoByIdParamSchema), (c) => {
  const { id } = c.req.valid("param");

  const { success, data } = getTodoById(id);

  if (!success) {
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
    todo: data,
  });
});

app.delete("/:id", sValidator("param", deleteTodoParamSchema), (c) => {
  const { id } = c.req.valid("param");
  const { success, data } = deleteTodo(id);

  if (!success) {
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
  sValidator("param", updateTodoParamSchema),
  sValidator("json", updateTodoBodySchema),
  (c) => {
    const { id } = c.req.valid("param");
    const { completed, title } = c.req.valid("json");

    const { success, data } = updateTodo({ id, completed, title });

    if (!success) {
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
      updatedTodo: data,
    });
  },
);

export default app;
