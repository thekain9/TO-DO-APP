import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import Login from "./components/LogInUser";
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user); // Access the user state

  return (
    <Router>
      <div className="app">
        <h1>TO-DO's</h1>
        
        <Routes>
          <Route path="/login" element={user.isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={user.isAuthenticated ? (
            <>
              <TodoForm />
              <TodoList />
            </>
          ) : (
            <Navigate to="/login" />
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



