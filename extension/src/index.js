import React from 'react';
import ReactDOM from 'react-dom';
import './commons/css/wika.css';
import './commons/css/awesome.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './commons/components/App';


console.log('BACKGROUND') ;
window.BACKGROUND = window.chrome.extension.getBackgroundPage().BACKGROUND ;
console.log(window.BACKGROUND) ;

console.log('STARTING REACT APP') ;
ReactDOM.render(
  <React.StrictMode>
    <App ref={(x) => {window.wikaReactApp = x;}}/>
  </React.StrictMode>,
  document.getElementById('root')
);




