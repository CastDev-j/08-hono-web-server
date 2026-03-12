import { z } from "zod";

// Rehusable schemas

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

const updateTodoBodySchema = z.object({
  title: validateTodoTitle.optional(),
  completed: z.boolean(),
});

export const todoSchemas = {
  getTodoByIdParamSchema,
  createTodoParamSchema,
  deleteTodoParamSchema,
  updateTodoParamSchema,
  updateTodoBodySchema,
};
