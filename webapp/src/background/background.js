import {u8aToHex} from '@polkadot/util' ;
import {cryptoWaitReady, keccakAsHex, decodeAddress} from '@polkadot/util-crypto' ;
import '@polkadot/wasm-crypto/initOnlyAsm';



import {getEnvironment} from './utils.js' ;
import WikaNetwork from './network.js' ;
import {encryptWithAES, decryptWithAES, importAccount, generateAccount} from './crypto.js' ;
import {StorageApp, StorageExt} from './storage.js' ;


// Transaction
class WikaBackground {

    constructor() {
        console.log('WikaBackground Constructor START') ;
        // pointers to background functions
        this.cryptoReady = false ;
        this.network = new WikaNetwork() ;
        this.encryptWithAES = encryptWithAES ;
        this.decryptWithAES = decryptWithAES ;
        this.importAccount = importAccount ;
        this.generateAccount = generateAccount ;
        this.u8aToHex = u8aToHex ;
        this.decodeAddress = decodeAddress ;
        this.keccakAsHex = keccakAsHex ;
        // Environment 'app' vs 'ext'
        this.env = getEnvironment() ;
        console.log('Detected env = '+this.env) ;
        // Storage implementation
        this.storage = (this.env==='app')?new StorageApp():new StorageExt() ;
    }

    initialize = (networkType, networkUrl, callback) => {
        const self = this ;
        cryptoWaitReady().then(() => {
            self.cryptoReady = true;
            self.network.connect(networkType, networkUrl, callback);
        }) ;
    }

}


export default WikaBackground ;










