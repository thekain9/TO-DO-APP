import React, { useState } from 'react';                             // Import React and the useState hook.
import { useDispatch } from 'react-redux';                          // Import the useDispatch hook from 'react-redux' for dispatching actions.
import { loginUser, registerUser } from "../features/userSlice";     // Import actions to handle user login and registration.
import Modal from './Alerts';                                        // Import the Modal component for alerts.

const Login = () => {
  const [username, setUsername] = useState('');                      // State and setter for username.
  const [password, setPassword] = useState('');                      // State and setter for password.
  const [confirmPassword, setConfirmPassword] = useState('');        // State and setter for confirm password.
  const [isRegistering, setIsRegistering] = useState(false);         // State and setter to determine if the user is registering or logging in.
  const [modalVisible, setModalVisible] = useState(false);           // State and setter for modal visibility (alternative to the alert prompt box)
  const [modalContent, setModalContent] = useState('');              // State and setter for modal content.
  const dispatch = useDispatch();                                   // Get the dispatch function from Redux.

  const handleLogin = async (e) => {                                // Define an async function to handle both login and registration.
    e.preventDefault();                                             // Prevent default form behavior (page reload).
    if (isRegistering) {                                            // Check if the user is trying to register.
      if (password !== confirmPassword) {                           // Password confirmation check.
        setModalContent("Passwords don't match!");                  // Set modal content for password mismatch.
        setModalVisible(true);                                      // Show modal.
        return;                                                     // Exit function early.
      }
      dispatch(registerUser(username, password));                    // Dispatch the registration action.
      setModalContent("You have been registered successfully! Please log in.");  // Set success modal content.
      setModalVisible(true);                                        // Show modal.
      setUsername('');                                              // Reset username.
      setPassword('');                                              // Reset password.
      setConfirmPassword('');                                       // Reset confirm password.
    } else {
      dispatch(loginUser(username, password));                       // Dispatch the login action.
      setModalContent("Unsuccessful log in, try again!");           // Set modal content for unsuccessful login.
      setModalVisible(true);                                        // Show modal.
    }
  };

  return (
    <div>
      {modalVisible && <Modal content={modalContent} onClose={() => setModalVisible(false)} />} {/*This is to control the closing of the Modal*/}
      <button onClick={() => setIsRegistering(false)}>Log In</button>
      <button onClick={() => setIsRegistering(true)}>Register</button>
      
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <br />
        {isRegistering && (
          <>
            <label>
              Confirm Password:
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </label>
            <br />
          </>
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <div className="footnotes">
        <small>*Username must be in the format of username@gmail.com</small>
        <br />
        <small>*Password must contain at least 6 characters</small>
      </div>
    </div>
  );
};

export default Login;



