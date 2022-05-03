import WikaNetwork from './network.js' ;
import Transaction from './transaction.js' ;
import {encryptWithAES, decryptWithAES, importAccount, generateAccount} from './crypto.js' ;
import {web3Enable, web3Accounts} from '@polkadot/extension-dapp';
import {u8aToHex} from '@polkadot/util';
import {cryptoWaitReady, keccakAsHex, decodeAddress} from '@polkadot/util-crypto';

import {} from '@polkadot/util-crypto';


window.BACKGROUND = {
    cryptoReady: false,
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
