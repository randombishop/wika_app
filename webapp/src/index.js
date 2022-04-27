import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/wika.css';
import './css/awesome.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <App ref={(x) => {window.wikaReactApp = x;}}/>
  </React.StrictMode>,
  document.getElementById('root')
);




