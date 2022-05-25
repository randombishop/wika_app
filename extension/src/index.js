import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import App from './ux/components/App';
import './ux/css/wika.css';
import './ux/css/awesome.css';
import BackgroundInterface from './BackgroundInterface' ;



// Define the Wika Background Interface
window.BACKGROUND_INTERFACE = new BackgroundInterface() ;


ReactDOM.render(
  <React.StrictMode>
    <App ref={(x) => {window.wikaReactApp = x;}}/>
  </React.StrictMode>,
  document.getElementById('root')
);




