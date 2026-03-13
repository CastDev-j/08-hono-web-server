import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { todoService } from "../service/todo.service";
import { todoSchemas } from "../schema/todo.schema";
import withPrisma from "../../../shared/prisma.shared";
import { PrismaClient } from "../../../generated/prisma/client";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
  Bindings: {
    NAME: string;
    ENV: string;
    API_URL: string;
    MI_API_SECRETA: string;
    DATABASE_URL: string;
  };
};

const app = new Hono<ContextWithPrisma>();

const {
  createTodoParamSchema,
  deleteTodoParamSchema,
  getTodoByIdParamSchema,
  updateTodoBodySchema,
  updateTodoParamSchema,
} = todoSchemas;

app.get("/", withPrisma, async (c) => {
  const { getTodos } = todoService(c.get("prisma"));

  const { success, data, code } = await getTodos();

  if (!success) {
    return c.json(
      {
        success: false,
        message: "Failed to retrieve todos",
      },
      code,
    );
  }

  return c.json({
    success: true,
    todos: data,
  });
});

app.post(
  "/",
  sValidator("json", createTodoParamSchema),
  withPrisma,
  async (c) => {
    const { title } = c.req.valid("json");
    const { addTodo } = todoService(c.get("prisma"));

    const { success, data, code } = await addTodo(title);

    if (!success) {
      return c.json(
        {
          success: false,
          message: "Failed to add todo",
        },
        code,
      );
    }

    return c.json(
      {
        success: true,
        newTodo: data,
      },
      code,
    );
  },
);

app.get(
  "/:id",
  sValidator("param", getTodoByIdParamSchema),
  withPrisma,
  async (c) => {
    const { id } = c.req.valid("param");
    const { getTodoById } = todoService(c.get("prisma"));

    const { success, data, code } = await getTodoById(id);

    if (!success) {
      return c.json(
        {
          success: false,
          message: `Todo with ID ${id} not found`,
        },
        code,
      );
    }

    return c.json({
      success: true,
      todo: data,
    });
  },
);

app.delete(
  "/:id",
  sValidator("param", deleteTodoParamSchema),
  withPrisma,
  async (c) => {
    const { id } = c.req.valid("param");
    const { deleteTodo } = todoService(c.get("prisma"));

    const { success, data, code } = await deleteTodo(id);

    if (!success) {
      return c.json(
        {
          success: false,
          message: `Todo with ID ${id} not found`,
        },
        code,
      );
    }

    return c.json({
      success: true,
      message: `Todo with ID ${id} deleted successfully`,
    });
  },
);

app.put(
  "/:id",
  sValidator("param", updateTodoParamSchema),
  sValidator("json", updateTodoBodySchema),
  withPrisma,
  async (c) => {
    const { id } = c.req.valid("param");
    const { completed, title } = c.req.valid("json");
    const { updateTodo } = todoService(c.get("prisma"));

    const { success, data, code } = await updateTodo({ id, completed, title });

    if (!success) {
      return c.json(
        {
          success: false,
          message: `Todo with ID ${id} not found`,
        },
        code,
      );
    }

    return c.json({
      success: true,
      updatedTodo: data,
    });
  },
);

export default app;
