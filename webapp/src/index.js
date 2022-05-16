import React from 'react';
import ReactDOM from 'react-dom';
import App from './commons/components/App';
import './commons/css/wika.css';
import './commons/css/awesome.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './background/background.js';
import WikaBridge from './wika_bridge';


window.WIKA_BRIDGE = new WikaBridge() ;

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




