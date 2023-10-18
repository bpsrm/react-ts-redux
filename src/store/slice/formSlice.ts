import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  name: string;
  detail: string;
  date: string;
  time: string;
  createBy: string;
}

interface FormState {
  todos: Todo[];
}

const initialState: FormState = {
  todos: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const editedTodo = action.payload;

      state.todos = state.todos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, deleteTodo } = formSlice.actions;
export const selectTodos = (state: { form: FormState }) => state.form.todos;
export default formSlice.reducer;
