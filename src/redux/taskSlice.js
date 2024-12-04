import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'All', // Filter state can be 'All', 'Completed', 'Pending', or 'Overdue'
  searchQuery: '', // Search query for filtering tasks based on title or description
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      const { title, description, dueDate } = action.payload;
      const newTask = {
        id: state.tasks.length + 1, // Simple ID generation (could be replaced by a more sophisticated ID system)
        title,
        description,
        dueDate,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    
    // Delete a task
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    
    // Mark a task as completed or undo it
    markCompleted: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed; // Toggle completion status
      }
    },
    
    // Reorder tasks (for drag and drop functionality)
    reorderTasks: (state, action) => {
      state.tasks = action.payload; // Reorder tasks based on drag-and-drop result
    },
    
    // Set the current filter (All, Completed, Pending, Overdue)
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    // Set the search query for filtering tasks
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  markCompleted,
  reorderTasks,
  setFilter,
  setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;
