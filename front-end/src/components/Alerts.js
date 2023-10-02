import React from 'react';
import '../styles/Modal.css';

// Define a functional component called 'Modal'. It takes in two props: 'content' and 'onClose'.
const Modal = ({ content, onClose }) => (
  <div className="modal" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <span className="close" onClick={onClose}>&times;</span>
      {content}
    </div>
  </div>
);

export default Modal;  