import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import Backend from './backend';

var backend = new Backend();
// console.log(backend);
ReactDOM.render(<App backend={backend} />, document.querySelector('.react'));
