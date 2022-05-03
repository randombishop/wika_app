import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './commons/css/wika.css';
import './commons/css/awesome.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './background/background.js';
import './background/crypto.js';


window.initCrypto(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App ref={(x) => {window.wikaReactApp = x;}}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
}) ;




