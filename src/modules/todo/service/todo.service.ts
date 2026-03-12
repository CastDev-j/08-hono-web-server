export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, title: "Learn Hono", completed: false },
  { id: 2, title: "Build a REST API", completed: false },
  { id: 3, title: "Deploy to Cloudflare Workers", completed: false },
];

export const todoService = () => {
  const getTodos = () => {
    return todos;
  };

  const getTodoById = (id: number) => {
    return todos.find((t) => t.id === id);
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  };

  const updateTodo = (id: number, completed: boolean) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = completed;
      return todo;
    }
  };

  const deleteTodo = (id: number) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      return todos.splice(index, 1)[0];
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
