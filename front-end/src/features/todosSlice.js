import { createSlice } from '@reduxjs/toolkit';                         // Import createSlice from the Redux toolkit.

// Define the initial state for the todo slice
const initialTodoState = {
  nextId: 2,                                                            // Next ID to be used for a new todo.
  data: {
    1: {
      content: 'Content 1',                                             // Content of the first default todo.
      completed: false,                                                 // Completion status of the first default todo.
    },
  },
};

const todosSlice = createSlice({
  name: 'todos',                                                        // Name of this slice of the state.
  initialState: initialTodoState,                                       // The initial state for this slice.
  reducers: {                                                           // Reducer functions for this slice.
    viewTodo: (state, action) => {
      state.data = action.payload;                                      // Set the state data with the payload.
    },
    addTodo: (state, action) => {
      const newId = state.nextId;                                        // Get the next ID for the new todo.
      state.nextId++;                                                    // Increment the next ID for future todos.
      state.data[newId] = {                                              // Set the content and completion status for the new todo.
        content: action.payload,
        completed: false,
      };
    },
    editTodo: (state, action) => {
      const { id, content } = action.payload;                             // Destructure id and content from the action payload.
      if (state.data[id]) {                                              // If the todo with the specified ID exists...
        state.data[id].content = content;                                 // Update its content.
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;                                         // Get the ID of the todo to be deleted.
      delete state.data[id];                                              // Delete the todo with the specified ID.
    },
    completeTodo: (state, action) => {
      const id = action.payload;                                         // Get the ID of the todo to be marked as complete/incomplete.
      if (state.data[id]) {                                              // If the todo with the specified ID exists...
        state.data[id].completed = !state.data[id].completed;              // Toggle its completion status.
      }
    },
  },
});

export const { viewTodo, addTodo, editTodo, deleteTodo, completeTodo } = todosSlice.actions;  // Export the action creators.
export default todosSlice.reducer;                                                             // Export the reducer.

// Helper function to get the token from local storage
const getToken = () => localStorage.getItem('userToken');                 // Get the user token from local storage.

export const viewTodoServer = () => async (dispatch) => {                 // Async action to view todos from the server.
  try {
    const response = await fetch('http://localhost:5001/api/task', {
      method: 'GET',                                                      // Use the GET method.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`                            // Use the token for authorization.
      },
    });
    const data = await response.json();                                    // Parse the response data.
    dispatch(viewTodo(data));                                              // Dispatch the viewTodo action with the response data.
  } catch (error) {
    console.error('Error viewing your to-do list:', error);                // Log any errors.
  }
};

export const addTodoServer = (content) => async (dispatch) => {            // Async action to add a new todo on the server.
  try {
    const response = await fetch('http://localhost:5001/api/task', {
      method: 'POST',                                                     // Use the POST method.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`                            // Use the token for authorization.
      },
      body: JSON.stringify({ content }),                                   // Send the content as the request body.
    });
    const data = await response.json();                                    // Parse the response data.
    dispatch(addTodo(data.content));                                       // Dispatch the addTodo action with the response data.
  } catch (error) {
    console.error('Error adding to-do item:', error);                      // Log any errors.
  }
};

export const editTodoServer = (id, content) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    dispatch(editTodo({ id, content: data.content }));
  } catch (error) {
    console.error('Error editing to-do item:', error);
  }
};

export const deleteTodoServer = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/api/task/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
    });
    await response.json();
    dispatch(deleteTodo(id));
  } catch (error) {
    console.error('Error deleting to-do item:', error);
  }
};

export const completeTodoServer = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5001/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ completed: true }), // Assuming this is the structure you need
    });
    const data = await response.json();
    dispatch(completeTodo(id));
  } catch (error) {
    console.error('Error marking to-do as complete:', error);
  }
};

