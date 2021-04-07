import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import Core from '@sewan/core';

ReactDOM.render(
  <React.StrictMode>
      <Core>
          <App />
      </Core>
  </React.StrictMode>,
  document.getElementById('root')
);
