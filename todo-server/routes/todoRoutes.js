const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router object
const Todo = require('../models/TodoModels'); // Import the Todo model

// GET route to fetch all todos
router.get('/', async (req, res) => {
    try {
        // Fetch all todo items from the database
        const todos = await Todo.find();
        // Respond with the fetched todo items in JSON format
        res.json(todos);
    } catch (err) {
        // If an error occurs, respond with a 500 status and the error message
        res.status(500).json({ message: err.message });
    }
});

// POST route to create a new todo
router.post('/', async (req, res) => {
    // Create a new todo instance with data from the request body
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        category: req.body.category,
    });

    try {
        // Save the new todo item to the database
        const newTodo = await todo.save();
        // Respond with a 201 status and the created todo item in JSON format
        res.status(201).json(newTodo);
    } catch (err) {
        // If validation fails, respond with a 400 status and the error message
        res.status(400).json({ message: err.message });
    }
});

// DELETE route to remove a todo by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the todo item by ID and delete it from the database
        await Todo.findByIdAndDelete(req.params.id);
        // Respond with a message indicating the todo was deleted
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        // If an error occurs, respond with a 500 status and the error message
        res.status(500).json({ message: err.message });
    }
});

// PUT route to update a todo by ID
router.put('/:id', async (req, res) => {
    try {
        // Find the todo item by ID and update it with the new data
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Respond with the updated todo item in JSON format
        res.json(updatedTodo);
    } catch (err) {
        // If an error occurs, respond with a 500 status and the error message
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; // Export the router to be used in other parts of the application
