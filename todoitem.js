import React from 'react';
// TodoList.js

import './todolist';

// TodoItem.js
import './todoitem.css';

// AddTodo.js
import './addtodo';


const TodoItem = ({ todo, onDelete }) => {
  return (
    <li className="todo-item">
        <div>
        <p>{todo.text}</p>
        <p>Time: {todo.time}</p>   
        </div>
        <div className="buttons">
        <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>

      
    </li>
  );
};

export default TodoItem;
