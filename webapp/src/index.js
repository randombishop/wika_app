import React from 'react';
import ReactDOM from 'react-dom';
import {web3Enable} from '@polkadot/extension-dapp' ;
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './ux/components/App';
import './ux/css/wika.css';
import './ux/css/awesome.css';
import WikaBackground from './background/background.js' ;
import WebappPort from './ux/utils/webapp_port' ;




// Define the Wika Background Interface
window.BACKGROUND_INTERFACE = new WikaBackground() ;

// Define the bridge from webapp to extension
window.WIKA_BRIDGE = new WebappPort() ;

// Initialize and startup the app
const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;
window.BACKGROUND_INTERFACE.initialize(defaultNetworkType, defaultNetworkUrl, () => {
    ReactDOM.render(
      <React.StrictMode>
        <App ref={(x) => {window.wikaReactApp = x;}}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
}) ;


// Enable Web3 when available
web3Enable("Wika Network").then((result) => {
    console.log('web3Enable', result) ;
})

