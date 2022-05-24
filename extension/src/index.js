import React from 'react';
import ReactDOM from 'react-dom';
import App from './ux/components/App';
import './ux/css/wika.css';
import './ux/css/awesome.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



/*window.getBackground = (callback) => {
    window.chrome.runtime.getBackgroundPage(function(backgroundPage){
        const BACKGROUND = backgroundPage.getBackground() ;
        callback(BACKGROUND) ;
    })
}*/




ReactDOM.render(
  <React.StrictMode>
    <App ref={(x) => {window.wikaReactApp = x;}}/>
  </React.StrictMode>,
  document.getElementById('root')
);



