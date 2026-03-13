import { z } from "zod";

// Rehusable schemas

const validateTodoId = z.uuid();

const validateTodoTitle = z
  .string()
  .min(1, "Title is required")
  .max(100, "Title must be less than 100 characters");

// Request schemas

const getTodoByIdParamSchema = z.object({
  id: validateTodoId,
});

const createTodoParamSchema = z.object({
  title: validateTodoTitle,
});

const deleteTodoParamSchema = z.object({
  id: validateTodoId,
});

const updateTodoParamSchema = z.object({
  id: validateTodoId,
});

const updateTodoBodySchema = z
  .object({
    title: validateTodoTitle.optional(),
    completed: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.completed !== undefined, {
    message: "At least one field (title or completed) must be provided",
  });

export const todoSchemas = {
  getTodoByIdParamSchema,
  createTodoParamSchema,
  deleteTodoParamSchema,
  updateTodoParamSchema,
  updateTodoBodySchema,
};
