import { useState } from 'react';
// Import the useState hook for managing component state
import { useDispatch } from 'react-redux';
// Import the useDispatch function from react-redux to access the Redux dispatch
import { addTodo } from "../features/todosSlice";
// Import the addTodo action creator from the todosSlice file

const TodoForm= () => {
  // Define a functional component named TodoForm
  const [content, setContent] = useState('');
  // Initialize a piece of component state named "content" using the useState hook
  // The "content" state will store the value of the input field

  const dispatch = useDispatch();
  // Initialize a variable "dispatch" by calling the useDispatch function
  // This allows the component to dispatch actions to the Redux store

  const handleSubmit = (e) => {
    // Define a function "handleSubmit" that will be called when the form is submitted
    e.preventDefault();
    // Prevent the default form submission behavior
    
    if (content.trim() !== '') {
      // Check if the "content" state value is not empty or only whitespace
      dispatch(addTodo(content));
      // Dispatch the addTodo action with the "content" value as payload
      setContent('');
      // Clear the "content" state by setting it to an empty string
    }
  };

  return (
    // Return JSX that represents the component's UI
    <form onSubmit={handleSubmit}>
      {/* Form element with "onSubmit" event handler set to "handleSubmit" */}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        // Input element with "value" attribute bound to the "content" state
        // "onChange" event handler updates the "content" state as user types
        placeholder="Add a new to-do"
      />
      <button type="submit">Add</button>
      {/* Button element with "type" attribute set to "submit" to submit the form */}
    </form>
  );
}

export default TodoForm;
// Export the TodoForm component as the default export

