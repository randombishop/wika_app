

console.log('WIKA BACKGROUND_EXT SCRIPT') ;

import WikaBackground from './background.js' ;
<<<<<<< HEAD
import ExtensionInternalPort from './extension_internal_port.js' ;
=======
import ExtensionPort from './extension_port.js' ;
>>>>>>> master
console.log('imports ok') ;

const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;

const BACKGROUND = new WikaBackground() ;
<<<<<<< HEAD
const PORT = new ExtensionInternalPort(BACKGROUND) ;
=======
const PORT = new ExtensionPort(BACKGROUND) ;
>>>>>>> master
console.log('background instances ok') ;

BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
    console.log('background init ok')
}) ;
