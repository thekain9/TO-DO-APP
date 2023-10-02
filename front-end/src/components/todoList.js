import React from 'react';
// Import the React library
import { useSelector } from 'react-redux';
// Import the useSelector function from react-redux to access Redux state
import TodoItem from "./todoItem"
// Import the TodoItem component from the 'todoItem.js' file

import { useDispatch } from 'react-redux';
import { logout } from "../features/userSlice"; 


const TodoList = () => {
  // Define a functional component named TodoList
  const todos = useSelector((state) => state.todos.data);
  // Use the useSelector hook to get the 'data' property from the 'todos' state in Redux store
  // 'todos' will contain an object with todo items
  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleLogout = () => {
    dispatch(logout()); // Call the logout action
  };

  return (
    // Return JSX that represents the component's UI
    <div className="todo-list">
      {/* Create a div with the class name 'todo-list' */}
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      {Object.keys(todos).map((id) => (
        // Iterate over the keys (IDs) of the 'todos' object using the map function
        //This line uses the map function to iterate over the keys (IDs) of the todos object. 
        //It's essentially creating an array of JSX elements, each representing a TodoItem componen
        <TodoItem
          key={id}
          //is used by React internally to optimize rendering and updates in a list.
          // Pass 'id' as a 'key' prop to uniquely identify TodoItem components
          id={id}
          // Pass 'id' as a prop to TodoItem component
          //is a custom prop to provide the specific id of the todo to the TodoItem component 
          //for its own logic and behavior.
          content={todos[id].content}
          // Pass the 'content' property of the todo as a prop to TodoItem component
          completed={todos[id].completed}
          // Pass the 'completed' property of the todo as a prop to TodoItem component
        />
      ))}
    </div>
  );
}

export default TodoList;
// Export the TodoList component as the default export

