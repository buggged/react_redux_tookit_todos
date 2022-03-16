import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initState = {
  todos: [], // { title, id, completed }
};

const addTodo = (state, action) => {
  const newTodo = {
    title: action.payload.title,
    id: nanoid(8),
    completed: false,
  };
  state.todos.push(newTodo)
};

const removeTodo = (state, action) => {
  const { todos } = state;
  const todoIndex = todos.findIndex((todo) => todo.id === action.payload.id);
  state.todos.splice(todoIndex, 1)
};

const markAsCompleted = (state, action) => {
  const { todos } = state;
  const todoIndex = todos.findIndex((todo) => todo.id === action.payload.id);
  state.todos[todoIndex].completed = !state.todos[todoIndex].completed
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
