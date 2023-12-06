import React, { useState } from 'react';
// TodoList.js
// eslint-disable-next-line no-unused-vars
import TodoItem from './todoitem';
import './todolist';

// TodoItem.js
import './todoitem.css';

// AddTodo.js

const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
        onAdd({ id: Date.now(), text, time });
        setText('');
        setTime('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
