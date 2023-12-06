const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-uri' with your MongoDB connection string)
mongoose.connect('mongodb+srv://mahasvinekkalapudi:test@cluster0.oua6s3i.mongodb.net/?retryWrites=true&w=majority',{

  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Todo schema
const todoSchema = new mongoose.Schema({
  text: String,
  time: String,
});

// Create Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/todos', async (req, res) => {
  const newTodo = req.body;
  try {
    const savedTodo = await Todo.create(newTodo);
    res.json(savedTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/todos/:id', async (req, res) => {
    const todoId = req.params.id;
  
    try {
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
  
      if (!deletedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      // Fetch updated list of todos after deletion
      const updatedTodos = await Todo.find();
      
      res.json(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});
//todlist-backend folder-server.js