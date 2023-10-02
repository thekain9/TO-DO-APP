import { configureStore } from '@reduxjs/toolkit';
import todosReducer from "../features/todosSlice";
import userReducer from '../features/userSlice';  // Import the user slice

export default configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,  // Add the user reducer here
  },
});
