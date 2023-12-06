import React, { useState, useEffect } from 'react';
import TodoList from './todolist';
import AddTodo from './addtodo';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const data = await response.json();

      // Check if the response is an array
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        console.error('API Response is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}` // Using template string
, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }

    
  };


  const handleViewTodos = () => {
    setViewMode(!viewMode);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Todo List</h1>
        <div>
          <AddTodo onAdd={handleAddTodo} />
          <button onClick={handleViewTodos}>{viewMode ? 'Hide' : 'View'}</button>
        </div>
      </div>
      {viewMode && <TodoList todos={todos} onDelete={handleDeleteTodo} />}
    </div>
  );
};

export default App;
