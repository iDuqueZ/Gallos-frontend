import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Axios from 'axios';

Axios.defaults.baseURL='http://localhost:5000/'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


