import React, { useState } from 'react';                     // Import React and the useState hook.
import { useDispatch } from 'react-redux';                  // Import the useDispatch hook from 'react-redux' for dispatching actions.
import { editTodo, deleteTodo, completeTodo } from "../features/todosSlice"; // Import actions related to todo management.
import EditModal from './TextBox';                           // Import the EditModal component, which is used for editing the content of a todo.

const TodoItem = ({ id, content, completed }) => {
  const dispatch = useDispatch();                           // Get the dispatch function from Redux.

  const [isEditing, setIsEditing] = useState(false);         // State and setter to check if the todo is currently being edited.
  const [newContent, setNewContent] = useState(content);     // State and setter for the updated content of the todo when editing.

  const handleEditConfirm = () => {                          // Handler function to confirm the editing of a todo.
    if (newContent !== content) {                            // Check if the updated content is different from the original content.
      dispatch(editTodo({ id, content: newContent }));       // Dispatch the editTodo action with the new content.
      setIsEditing(false);                                   // Close the edit modal after editing.
    }
  };

  const handleDelete = () => {                               // Handler function to delete a todo.
    dispatch(deleteTodo(id));                                // Dispatch the deleteTodo action with the todo's ID.
  };

  const handleComplete = () => {                             // Handler function to mark a todo as complete or incomplete.
    dispatch(completeTodo(id));                              // Dispatch the completeTodo action with the todo's ID.
  };


  return (
    <div>
      <h3>{content}</h3>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={handleComplete}
        className={completed ? 'completed-button' : 'incomplete-button'}
      >
        {completed ? 'Completed' : 'Mark as completed'}
      </button>

      {isEditing && (
        <EditModal onClose={() => setIsEditing(false)}>
          <p>Edit to-do:</p>
          <input 
            type="text" 
            className="edit-modal-input"
            value={newContent}
            onChange={e => setNewContent(e.target.value)} 
          />
          <button onClick={handleEditConfirm}>Confirm Edit</button>
        </EditModal>
      )}
    </div>
  );
}

export default TodoItem;



