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
import {web3Enable} from '@polkadot/extension-dapp' ;
import WebappPort from './ux/utils/webapp_port' ;


// Enable Web3 when available
web3Enable("Wika Network").then((result) => {
    console.log('web3Enable', result) ;
})

// Define the bridge from webapp to extension
window.WIKA_BRIDGE = new WebappPort() ;

// Initialize and startup the app
window.getBackground((BACKGROUND) => {
    const defaultNetworkType = "Wika Testnet" ;
    const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;
    BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
        ReactDOM.render(
          <React.StrictMode>
            <App ref={(x) => {window.wikaReactApp = x;}}/>
          </React.StrictMode>,
          document.getElementById('root')
        );
    }) ;
}) ;



