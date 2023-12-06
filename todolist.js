// TodoList.js

import React from 'react';
import TodoItem from './todoitem';
import './todolist.css';

const TodoList = ({ todos, onDelete }) => {
  // Check if todos is an array before mapping
  if (!Array.isArray(todos)) {
    console.error('Invalid todos data:', todos);
    return null; // or display an error message or an empty state
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onDelete={() => onDelete(todo._id)} />
      ))}
    </ul>
  );
};

export default TodoList;
