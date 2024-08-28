import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import Modal from 'react-modal'; // Import the Modal component from react-modal for displaying the filtered todos
import './TodoList.css'; // Import CSS for styling the TodoList component

const TodoList = ({ todos, onDelete, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState(''); // State to track the search input
    const [filteredTodos, setFilteredTodos] = useState([]); // State to store the filtered todos
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to control the modal visibility

    // Set the app element for accessibility with Modal
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    // Function to handle the search functionality
    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            return; // Do nothing if search term is empty
        }
        
        // Filter todos based on search term matching title, category, status, or priority
        const filtered = todos.filter(todo =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            todo.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
            todo.status.toLowerCase().includes(searchTerm.toLowerCase()) || 
            todo.priority.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // Sort filtered todos by date and reverse the order
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        filtered.reverse();
        
        setFilteredTodos(filtered); // Update state with filtered todos
        setModalIsOpen(true); // Open the modal to display filtered todos
    };

    // Function to handle changes in the search input field
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term state
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false); // Set modal visibility to false
    };

    return (
        <div className="todo-list">
            <div className="header">
                <h1 className="center">Todo List</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search title..."
                        value={searchTerm}
                        onChange={handleInputChange} // Update the search term as the user types
                    />
                    <button id='srch-btn' onClick={handleSearch}>Search</button> {/* Trigger search on button click */}
                </div>
            </div>

            {/* Modal to display the filtered todos */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal} // Close modal when clicking outside or pressing escape
                contentLabel="Filtered Todos Modal"
                className="modal2" // Custom CSS class for modal content
                overlayClassName="overlay" // Custom CSS class for modal overlay
            >
                <div className="modal-content2">
                    <span className="close-icon2" onClick={closeModal}>×</span> {/* Close modal button */}
                    <h2>Filtered Todos</h2>
                    {filteredTodos.map(todo => (
                        <div key={todo._id} className="todo-items2">
                            <h3>{todo.title}</h3>
                            <p><strong>Date&Time:</strong> {new Date(todo.date).toLocaleString()}</p>
                            <p><strong>Description:</strong> {todo.description}</p>
                            <p><strong>Category:</strong> {todo.category}</p>
                            <p><strong>Status:</strong> {todo.status}</p>
                            <p><strong>Priority:</strong> {todo.priority}</p>
                        </div>
                    ))}
                </div>
            </Modal>

            {/* Display all todos */}
            {[...todos].reverse().map(todo => (
                <div key={todo._id} className="todo-item">
                    <div className='date-title'>
                        <h3>Title: {todo.title}</h3>
                        <p><strong>Date&Time:</strong> {new Date(todo.date).toLocaleString()}</p>
                    </div>
                    
                    <div className='more-items'>
                        <p><strong>Description:</strong> {todo.description}</p>
                        <p><strong>Category:</strong> {todo.category}</p>
                        <p><strong>Status:</strong> {todo.status}</p>
                        <p><strong>Priority:</strong> {todo.priority}</p>
                    </div>

                    <div className='buttons'>
                        <button id="dlt-btn" onClick={() => onDelete(todo._id)}>Delete</button> {/* Delete button */}
                        <button onClick={() => onUpdate(todo._id)}>Update</button> {/* Update button */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
