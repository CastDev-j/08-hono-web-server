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
  const todos = getTodos();
  return c.json({
    success: true,
    todos,
  });
});

app.post("/", sValidator("json", createTodoParamSchema), (c) => {
  const { title } = c.req.valid("json");

  const newTodo = addTodo(title);

  return c.json({
    success: true,
    newTodo,
  });
});

app.get("/:id", sValidator("param", getTodoByIdParamSchema), (c) => {
  const { id } = c.req.valid("param");

  const todo = getTodoById(id);

  if (!todo) {
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
    todo,
  });
});

app.delete("/:id", sValidator("param", deleteTodoParamSchema), (c) => {
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
  sValidator("param", updateTodoParamSchema),
  sValidator("json", updateTodoBodySchema),
  (c) => {
    const { id } = c.req.valid("param");
    const { completed, title } = c.req.valid("json");

    const updatedTodo = updateTodo({ id, completed, title });

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
