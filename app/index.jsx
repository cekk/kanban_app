import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import alt from './libs/alt.js';
import storage from './libs/storage.js';
import persist from './libs/persist.js';

require('./main.css');

persist(alt, storage, 'app');
ReactDOM.render(<App />, document.getElementById('app'));
