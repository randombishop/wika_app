

console.log('WIKA BACKGROUND_EXT SCRIPT') ;

//import WikaBackground from './background.js' ;
//import ExtensionPort from './extension_port.js' ;
console.log('imports ok') ;

const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;

//const BACKGROUND = new WikaBackground() ;
//console.log('background instance ok') ;

//BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
//    console.log('background init ok')
//}) ;

function getBackground() {
    return "BACKGROUND" ;
}

//const PORT = new ExtensionPort() ;

