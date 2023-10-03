import { createSlice } from '@reduxjs/toolkit';       // Importing the createSlice utility from Redux toolkit

// Initial state
const initialUserState = {                            // Defining the initial state for the user slice
  user: null,                                         // Placeholder for user data
  token: null,                                        // Placeholder for authentication token
  isAuthenticated: false,                             // Flag to check if user is authenticated
  loading: false,                                     // Flag for loading status during async operations
  error: null,                                        // Placeholder for error messages
};

const userSlice = createSlice({                      // Creating a slice for user-related state management
  name: 'user',                                       // Name of this slice of the state
  initialState: initialUserState,                     // Setting the initial state
  reducers: {
    loginStart: (state) => {                          // Reducer for starting the login process
      state.loading = true;                           // Set the loading flag to true
    },
    loginSuccess: (state, action) => {                // Reducer for successful login
      state.user = action.payload.user;               // Set the user data from payload
      state.token = action.payload.token;             // Set the authentication token from payload
      state.isAuthenticated = true;                   // Mark user as authenticated
      state.loading = false;                          // Set the loading flag to false
      localStorage.setItem('userToken', action.payload.token); // Store token in local storage
    },
    loginFailure: (state, action) => {                // Reducer for login failures
      state.error = action.payload;                   // Set the error message from payload
      state.loading = false;                          // Set the loading flag to false
    },
    logout: (state) => {                              // Reducer for logging out
      state.user = null;                              // Clear user data
      state.token = null;                             // Clear authentication token
      state.isAuthenticated = false;                  // Mark user as not authenticated
      localStorage.removeItem('userToken');           // Remove token from local storage
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;  // Exporting the action creators
export default userSlice.reducer;                                                  // Exporting the user reducer

// Asynchronous action for user registration
export const registerUser = (username, password) => async (dispatch) => {
  console.log("Extracted username:", username);           // Log the extracted username
  console.log("Extracted password:", password);           // Log the extracted password
  dispatch(loginStart());                                 // Dispatch the loginStart action to set loading status
  try {
    const response = await fetch('http://localhost:5001/api/users/register', { // API call to register user
      method: 'POST',                                     // Using POST method for registration
      headers: {
        'Content-Type': 'application/json',               // Setting content type header
      },
      body: JSON.stringify({ username, password }),       // Sending username and password in request body
    });
    
    const data = await response.json();                   // Parsing the API response to JSON
    if (response.ok) {                                  // Check if the response status is OK
      dispatch(loginSuccess(data));                     
      return { message: "You have been registered successfully!" };
    } else {                                            // If response is not OK
      dispatch(loginFailure(data.error || 'Registration failed!'));
      return data;  // Return the server's error response
    }

  } catch (error) {
    dispatch(loginFailure(error.message));               
    return { message: 'An error occurred during registration.' };
  }
};

// Asynchronous action for user login
export const loginUser = (username, password) => async (dispatch) => {
  dispatch(loginStart());                                 // Dispatch the loginStart action to set loading status
  try {
    const response = await fetch('http://localhost:5001/api/users/login', {  // API call to login user
      method: 'POST',                                     // Using POST method for login
      headers: {
        'Content-Type': 'application/json',               // Setting content type header
      },
      body: JSON.stringify({ username, password }),       // Sending username and password in request body
    });
    
    const data = await response.json();                   // Parsing the API response to JSON
    if (data.token) {                                     // If a token exists in response (login success)
      dispatch(loginSuccess(data));                       // Dispatch loginSuccess action with response data
    } else {                                              // Else if login failed
      dispatch(loginFailure(data.error || 'Login failed!'));  // Dispatch loginFailure with error message
    }
  } catch (error) {
    dispatch(loginFailure(error.message));                // If there's an error in API call, dispatch loginFailure
  }
};

// Action to log the user out
export const logoutUser = () => (dispatch) => {
  dispatch(logout());                                     // Dispatch the logout action
};

