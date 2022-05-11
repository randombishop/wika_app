import {web3Enable, web3Accounts} from '@polkadot/extension-dapp';
import {u8aToHex} from '@polkadot/util';
import {cryptoWaitReady, keccakAsHex, decodeAddress} from '@polkadot/util-crypto';


import {getEnvironment} from './utils.js' ;
import WikaNetwork from './network.js' ;
import sendTransaction from './transaction.js' ;
import {encryptWithAES, decryptWithAES, importAccount, generateAccount} from './crypto.js' ;
import {StorageApp, StorageExt} from './storage.js' ;

console.log('EXECUTING BACKGROUND SCRIPT') ;

// Pointers to background functions
window.BACKGROUND = {
    cryptoReady: false,
    web3Wallets: null,
    network: new WikaNetwork(),
    encryptWithAES: encryptWithAES,
    decryptWithAES: decryptWithAES,
    importAccount: importAccount,
    generateAccount: generateAccount,
    web3Enable: web3Enable,
    web3Accounts: web3Accounts,
    u8aToHex: u8aToHex,
    decodeAddress: decodeAddress,
    keccakAsHex: keccakAsHex,
    sendTransaction: sendTransaction
}

// Environment 'app' vs 'ext'
const env = getEnvironment() ;
window.BACKGROUND.env = env ;
console.log('Detected env = '+env) ;

// Storage implementation
window.BACKGROUND.storage = (env==='app')?new StorageApp():new StorageExt() ;

// Crypto and network initialization, must be called before starting the app
window.BACKGROUND.initialize = (networkType, networkUrl, callback) => {
    cryptoWaitReady().then(() => {
        window.BACKGROUND.cryptoReady = true;
        window.BACKGROUND.network.connect(networkType, networkUrl, () => {
            window.BACKGROUND.web3Enable("Wika Network").then((result) => {
                window.BACKGROUND.web3Wallets = result ;
                callback() ;
            });
        }) ;
    }) ;
}

// One time initialization if we are in extension
if (env === 'ext') {
    const defaultNetworkType = "Wika Testnet" ;
    const defaultNetworkUrl = "wss://testnode3.wika.network:443" ;
    window.BACKGROUND.initialize(defaultNetworkType, defaultNetworkUrl, () => {
        console.log('BACKGROUND init done.')
    }) ;
}

