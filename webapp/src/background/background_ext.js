

console.log('WIKA BACKGROUND_EXT SCRIPT') ;

import WikaBackground from './background.js' ;
import InternalPort from './internal_port.js' ;
import ExternalPort from './external_port.js' ;
console.log('imports ok') ;

const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;

const BACKGROUND = new WikaBackground() ;
const INTERNAL_PORT = new InternalPort(BACKGROUND) ;
const EXTERNAL_PORT = new ExternalPort(BACKGROUND) ;
console.log('background instances ok') ;

BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
    console.log('background init ok')
}) ;
