import React, { useState, useEffect } from 'react';
import './UpdateFormStyle.css'; // Import CSS for styling the update form

const TodoUpdateForm = ({ todo, onUpdate, onCancel }) => {
    // Initialize state with the current todo data
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        priority: todo.priority,
        category: todo.category
    });

    // Update the form data when the `todo` prop changes
    useEffect(() => {
        setFormData({
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            priority: todo.priority,
            category: todo.category
        });
    }, [todo]);

    // Handle saving the updated todo
    const handleSave = () => {
        onUpdate(todo._id, formData); // Call onUpdate with the todo id and updated data
    };

    // Clear the form fields
    const handleClear = () => {
        setFormData({
            title: '',
            description: '',
            completed: false,
            priority: 'Low',
            category: 'Work'
        });
    };

    // Handle changes to form inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value; // Checkbox needs to handle checked state
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue // Update the state with the new value for the corresponding field
        }));
    };

    return (
        <div className="update-form">
            <h1>Update ToDo</h1>
            <div className='form-elements'>
                {/* Title input */}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Updated Title"
                />
                {/* Description input */}
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Updated Description"
                />

                {/* Completed checkbox */}
                <label>
                    Mark task as completed:
                    <input
                        type="checkbox"
                        name="completed"
                        checked={formData.completed}
                        onChange={handleChange}
                    />
                </label>

                <div className='update-cat-pri'>
                    {/* Category dropdown */}
                    <label>
                        Category:
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Study">Study</option>
                        </select>
                    </label>

                    {/* Priority dropdown */}
                    <label>
                        Priority:
                        <select name="priority" value={formData.priority} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>

                <div className='update-btns'>
                    {/* Clear button */}
                    <button id='update-clear-btn' onClick={handleClear}>Clear</button>
                    {/* Save button */}
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default TodoUpdateForm;
