const mongoose = require('mongoose');

// Define a schema for the "Todo" collection
const TodoSchema = new mongoose.Schema({
    // Title of the todo item, required field
    title: {
        type: String,
        required: true
    },
    // Description of the todo item, optional field
    description: String,
    // Date of the todo item creation or update, defaults to current date and time
    date: {
        type: Date,
        default: Date.now
    },
    // Status of the todo item, can only be "Incomplete" or "Complete", defaults to "Incomplete"
    status: {
        type: String,
        enum: ['Incomplete', 'Complete'], 
        default: 'Incomplete' 
    },
    // Priority level of the todo item, can only be "Low", "Medium", or "High", defaults to "Low"
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    // Category of the todo item, optional field
    category: String
});

// Export the Todo model based on the defined schema
module.exports = mongoose.model('TodoModels', TodoSchema);
