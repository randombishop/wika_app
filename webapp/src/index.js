import React from 'react';
import ReactDOM from 'react-dom';
import App from './ux/components/App';
import './ux/css/wika.css';
import './ux/css/awesome.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './background/background_web.js';



const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;
window.BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
    ReactDOM.render(
      <React.StrictMode>
        <App ref={(x) => {window.wikaReactApp = x;}}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
}) ;




