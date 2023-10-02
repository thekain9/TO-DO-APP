import React from 'react';
import '../styles/EditModal.css';

// Define a functional component called 'EditModal'. It takes in two props: 'onClose' and 'children'.
const EditModal = ({ onClose, children }) => {
  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        {children}
      </div>
      <button className="edit-modal-close" onClick={onClose}>Close</button>
    </div>
  );
};

export default EditModal;
