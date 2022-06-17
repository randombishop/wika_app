

console.log('WIKA BACKGROUND_EXT SCRIPT') ;

import WikaBackground from './background.js' ;
import ExtensionInternalPort from './extension_internal_port.js' ;
import ExtensionExternalPort from './extension_external_port.js' ;
console.log('imports ok') ;

const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;

const BACKGROUND = new WikaBackground() ;
const INTERNAL_PORT = new ExtensionInternalPort(BACKGROUND) ;
const EXTERNAL_PORT = new ExtensionExternalPort(BACKGROUND) ;
console.log('background instances ok') ;

BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
    console.log('background init ok')
}) ;
