import {cryptoWaitReady} from '@polkadot/util-crypto';
import WikaNetwork from './network.js' ;
import Transaction from './transaction.js' ;


window.BACKGROUND = {
    network: new WikaNetwork(),
    cryptoReady: false,
}


window.initCrypto = (callback) => {
    cryptoWaitReady().then(() => {
        window.BACKGROUND.cryptoReady = true;
        callback() ;
    }) ;
}

window.sendTransaction = (tx, account, callback) => {
    let t = new Transaction(tx, account, callback) ;
    t.send() ;
}
