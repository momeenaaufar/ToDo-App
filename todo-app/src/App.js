import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import Axios for making HTTP requests
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Import routing components
import TodoForm from './components/TodoForm'; // Import TodoForm component
import TodoList from './components/TodoList'; // Import TodoList component
import TodoUpdateForm from './components/TodoUpdateForm'; // Import TodoUpdateForm component
import './App.css'; // Import custom CSS
import { LuListTodo } from "react-icons/lu"; // Import an icon from react-icons library

const App = () => {
    // State management
    const [todos, setTodos] = useState([]); // State for managing the list of todos
    const [showUpdateForm, setShowUpdateForm] = useState(false); // State for managing the visibility of the update form
    const [selectedTodoId, setSelectedTodoId] = useState(null); // State for tracking the ID of the selected todo for updating

    // Fetch todos from the server when the component mounts
    useEffect(() => {
        fetchTodos();
    }, []);

    // Function to fetch todos from the backend
    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Function to add a new todo
    const addTodo = async (title, description, completed, priority, category) => {
        try {
            const response = await axios.post('http://localhost:5000/api/todos', {
                title,
                description,
                status: completed ? 'Complete' : 'Incomplete',
                priority,
                category,
            });
            setTodos([...todos, response.data]); // Update the state with the new todo
            alert('Todo task added successfully!');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // Function to delete a todo
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id)); // Update the state by removing the deleted todo
            alert('Todo deleted successfully!');
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Function to open the update form for a specific todo
    const openUpdateForm = (id) => {
        setSelectedTodoId(id);
        setShowUpdateForm(true);
    };

    // Function to update a todo
    const updateTodo = async (id, updatedFields) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedFields);
            const updatedTodos = todos.map(todo =>
                todo._id === id ? response.data : todo
            );
            setTodos(updatedTodos); // Update the state with the updated todo
            setShowUpdateForm(false); // Close the update form
            alert('Todo updated successfully!');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Function to cancel the update operation and close the form
    const cancelUpdate = () => {
        setShowUpdateForm(false);
    };

    return (
        <Router> 
            <div className='container'>
                <div className="navbar">
                    <div className="logo">
                        <img src="images/m1.jpeg" alt="Logo" className="logo-img" />
                        <h2>TodoApp</h2>
                    </div>

                    <div className="title">
                        <Link to="/todos" className='link-todo'>
                            <LuListTodo 
                                id='link-todo-icon' style={{ color: 'black', fontSize: '20px' }} />
                            <p id='link-todo-p'>Todo List</p>
                        </Link>
                        <p style={{color:'white'}}>A simple and efficient way to manage your tasks.</p>
                    </div>
                </div>

                {/* Define routes */}
                <Routes>
                    <Route path="/todos" element={<TodoList todos={todos} onDelete={deleteTodo} onUpdate={openUpdateForm} />} />
                </Routes>

                <div className="hero">
                    <div className="hero-content">
                        <div className='hero-form'>
                            <TodoForm onAdd={addTodo} /> {/* Form to add new todos */}
                        </div>
                    </div>
                </div>

                {/* Conditional rendering of the update form modal */}
                {showUpdateForm && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={cancelUpdate}>&times;</span>
                            <TodoUpdateForm
                                todo={todos.find(todo => todo._id === selectedTodoId)}
                                onUpdate={updateTodo}
                                onCancel={cancelUpdate}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Router> 
    );
};

export default App;
