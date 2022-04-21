import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/wika.css';
import './css/simple.css';
import './css/awesome.css';


ReactDOM.render(
  <React.StrictMode>
    <App ref={(x) => {window.wikaReactApp = x;}}/>
  </React.StrictMode>,
  document.getElementById('root')
);




