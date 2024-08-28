import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import the new root API from React DOM
import App from './App'; // Import the main App component

// Create a root element and render the React application
const root = ReactDOM.createRoot(document.getElementById('root')); // Find the 'root' element in the HTML and create a root for rendering
root.render(
  <React.StrictMode> {/* Wrap the App component in React.StrictMode for additional checks and warnings in development mode */}
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);
