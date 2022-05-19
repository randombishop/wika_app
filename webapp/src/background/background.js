import {web3Enable, web3Accounts} from '@polkadot/extension-dapp';
import {u8aToHex} from '@polkadot/util';
import {cryptoWaitReady, keccakAsHex, decodeAddress} from '@polkadot/util-crypto';


import {getEnvironment} from './utils.js' ;
import WikaNetwork from './network.js' ;
import sendTransaction from './transaction.js' ;
import {encryptWithAES, decryptWithAES, importAccount, generateAccount} from './crypto.js' ;
import {StorageApp, StorageExt} from './storage.js' ;


// Transaction
class WikaBackground {

    constructor() {
        console.log('WikaBackground Constructor START') ;
        // pointers to background functions
        this.cryptoReady = false ;
        this.web3Wallets = null ;
        this.network = new WikaNetwork() ;
        this.encryptWithAES = encryptWithAES ;
        this.decryptWithAES = decryptWithAES ;
        this.importAccount = importAccount ;
        this.generateAccount = generateAccount ;
        this.web3Enable = web3Enable ;
        this.web3Accounts = web3Accounts ;
        this.u8aToHex = u8aToHex ;
        this.decodeAddress = decodeAddress ;
        this.keccakAsHex = keccakAsHex ;
        this.sendTransaction = sendTransaction ;
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
            self.network.connect(networkType, networkUrl, () => {
                self.web3Enable("Wika Network").then((result) => {
                    self.web3Wallets = result ;
                    callback() ;
                });
            }) ;
        }) ;
    }

}


export default WikaBackground ;










