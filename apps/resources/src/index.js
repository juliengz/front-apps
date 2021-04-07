import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import Resources from './Resources';
import Core from '@sewan/core'

ReactDOM.render(
    <React.StrictMode>
        <Core>
            <Resources/>
        </Core>
    </React.StrictMode>,
    document.getElementById('root')
);
