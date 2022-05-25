

console.log('WIKA BACKGROUND_EXT SCRIPT') ;

import WikaBackground from './background.js' ;
import ExtensionInternalPort from './extension_internal_port.js' ;
console.log('imports ok') ;

const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;

const BACKGROUND = new WikaBackground() ;
const PORT = new ExtensionInternalPort(BACKGROUND) ;
console.log('background instances ok') ;

BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
    console.log('background init ok')
}) ;
