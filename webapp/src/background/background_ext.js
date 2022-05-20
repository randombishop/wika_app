import WikaBackground from './background.js' ;
import ExtensionPort from './extension_port.js' ;

const defaultNetworkType = "Wika Testnet" ;
const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;

const BACKGROUND = new WikaBackground() ;
BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
    console.log('BACKGROUND init done.')
}) ;


const PORT = new ExtensionPort() ;

