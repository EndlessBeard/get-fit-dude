import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/tailwind.css';
import './styles/animations.css';

// Create a root
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);