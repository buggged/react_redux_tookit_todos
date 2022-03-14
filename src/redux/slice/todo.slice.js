import { createSlice } from "@reduxjs/toolkit";

const initState = {
  todos: [], // { title, id, completed }
};

const addTodo = (state, action) => {
  const { todos } = state;
  const newTodo = {
    title: action.payload.title,
    id: todos.length,
    completed: false,
  };
  return {
    ...state,
    todos: [...todos, newTodo],
  };
};

const removeTodo = (state, action) => {
  const { todos } = state;
  const newTodos = todos.filter((todo) => todo.id !== action.payload.id);
  return {
    ...state,
    todos: newTodos,
  };
};

const markAsCompleted = (state, action) => {
  const { todos } = state;
  const newTodos = todos.map((todo) => {
    if (todo.id === action.payload.id) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }
    return todo;
  });
  return {
    ...state,
    todos: newTodos,
  };
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initState,
  reducers: {
    addTodo,
    removeTodo,
    markAsCompleted,
  },
});

export default todoSlice;
