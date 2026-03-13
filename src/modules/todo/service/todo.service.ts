import { ContentfulStatusCode } from "hono/utils/http-status";
import { PrismaClient } from "../../../generated/prisma/client";
import { Todo } from "../interface/todo.interface";

export const todoService = (prisma: PrismaClient) => {
  const getTodos = async () => {
    try {
      const todos = await prisma.todo.findMany();

      return {
        success: true,
        data: todos,
        code: 200 as ContentfulStatusCode,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        code: 500 as ContentfulStatusCode,
      };
    }
  };

  const getTodoById = async (id: string) => {
    try {
      const todo = await prisma.todo.findUnique({
        where: { id },
      });

      if (!todo) {
        return {
          success: false,
          data: undefined,
          code: 404 as ContentfulStatusCode,
        };
      }

      return {
        success: true,
        data: todo,
        code: 200 as ContentfulStatusCode,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        code: 500 as ContentfulStatusCode,
      };
    }
  };

  const addTodo = async (title: string) => {
    try {
      const newTodo = await prisma.todo.create({
        data: {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: new Date(),
        },
      });

      return {
        success: true,
        data: newTodo,
        code: 200 as ContentfulStatusCode,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        code: 500 as ContentfulStatusCode,
      };
    }
  };

  const updateTodo = async ({ completed, id, title }: Partial<Todo>) => {
    try {
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: {
          title,
          completed,
        },
      });

      return {
        success: true,
        data: updatedTodo,
        code: 200 as ContentfulStatusCode,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        code: 500 as ContentfulStatusCode,
      };
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const deletedTodo = await prisma.todo.delete({
        where: { id },
      });

      return {
        success: true,
        data: deletedTodo,
        code: 200 as ContentfulStatusCode,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        code: 500 as ContentfulStatusCode,
      };
    }
  };

  return {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
  };
};
