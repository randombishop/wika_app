import {cryptoWaitReady} from '@polkadot/util-crypto';
import WikaNetwork from './network.js' ;
import Transaction from './transaction.js' ;
import {encryptWithAES, decryptWithAES, importAccount, generateAccount} from './crypto.js' ;

window.BACKGROUND = {
    cryptoReady: false,
    network: new WikaNetwork(),
    encryptWithAES: encryptWithAES,
    decryptWithAES: decryptWithAES,
    importAccount: importAccount,
    generateAccount: generateAccount
}


window.BACKGROUND.initCrypto = (callback) => {
    cryptoWaitReady().then(() => {
        window.BACKGROUND.cryptoReady = true;
        callback() ;
    }) ;
}

window.BACKGROUND.sendTransaction = (tx, account, callback) => {
    let t = new Transaction(tx, account, callback) ;
    t.send() ;
}
