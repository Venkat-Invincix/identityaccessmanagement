import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// importing BrowserRouter so we can use Route inside app

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root')
);
