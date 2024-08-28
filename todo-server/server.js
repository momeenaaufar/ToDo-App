const express = require('express'); // Import the Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies
const cors = require('cors'); // Import CORS middleware to handle Cross-Origin Resource Sharing

const app = express(); // Initialize the Express application
const PORT = process.env.PORT || 5000; // Define the port number, using an environment variable if available

// Middleware setup
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to allow cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo-list', {
    // Additional options can be provided here if needed, e.g., useNewUrlParser, useUnifiedTopology, etc.
})
.then(() => console.log('MongoDB connected')) // Log a success message if the connection is successful
.catch(err => console.log(err)); // Log an error message if the connection fails

// Import the Todo model
const Todo = require('./models/TodoModels');

// Route handling
app.use('/api/todos', require('./routes/todoRoutes')); // Use the routes defined in todoRoutes.js under the /api/todos path

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
