import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task, index) => index !== action.payload
      );
    },
  },
});
export const { addTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;