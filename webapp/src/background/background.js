import {u8aToHex} from '@polkadot/util' ;
import {cryptoWaitReady, keccakAsHex, decodeAddress} from '@polkadot/util-crypto' ;
import '@polkadot/wasm-crypto/initOnlyAsm';



import {getEnvironment, findAccount} from './utils.js' ;
import WikaNetwork from './network.js' ;
import {importAccount, generateAccount} from './crypto.js' ;
import {StorageApp, StorageExt} from './storage.js' ;
import Transaction from './transaction.js' ;

class WikaBackground {

    constructor() {
        console.log('WikaBackground Constructor START') ;
        // Environment: 'app' or 'ext'
        this.env = getEnvironment() ;
        // Crypto and blockchain connection
        this.cryptoReady = false ;
        this.network = new WikaNetwork() ;
        // Storage implementation
        this.storage = (this.env==='app')?new StorageApp():new StorageExt() ;
        // Unsubscription functions
        this.unsubFunctions = {} ;
        // Done
        console.log('env = '+this.env) ;
        console.log('WikaBackground Constructor DONE') ;
    }




    // ------------
    // Simple calls
    // ------------

    call = (message, callback) => {
        const func = message.func ;
        switch (func) {
            case 'initialize': return this.initialize(message.networkType, message.networkUrl, callback) ;
            case 'connect': return this.connect(message.networkType, message.networkUrl, callback) ;
            case 'getNetworkInfo': return this.getNetworkInfo(callback) ;
            case 'getLikePrice': return this.getLikePrice(callback) ;
            case 'getOwnersRequestPrice': return this.getOwnersRequestPrice(callback) ;
            case 'createTransaction': return this.createTransaction(message.txType, message.params, callback) ;
            case 'keccakAsHex': return this.keccakAsHex(message.text, callback) ;
            case 'generateAccount': return this.generateAccount(callback) ;
            case 'importAccount': return this.importAccount(message.phrase, callback) ;
            case 'getRawAddress': return this.getRawAddress(message.address, callback) ;
            case 'getData': return this.getData(message.field, callback) ;
            case 'saveData': return this.saveData(message.field, message.data, callback) ;
            default: return null ;
        }
    }

    initialize = (networkType, networkUrl, callback) => {
        const self = this ;
        cryptoWaitReady().then(() => {
            self.cryptoReady = true;
            self.connect(networkType, networkUrl, callback);
        }) ;
    }

    connect = (networkType, networkUrl, callback) => {
        this.network.connect(networkType, networkUrl, callback) ;
    }

    getNetworkInfo = (callback) => {
        callback({
            type: this.network.type,
            url: this.network.endpoint,
            ready: this.network.getReady()
        }) ;
    }

    createTransaction = (txType, params, callback) => {
        const self = this ;
        function _tx() {
            switch (txType) {
                case 'like': return self.network.txLike(params.url, params.referrer, params.numLikes) ;
                case 'owner_request': return self.network.txOwnerRequest(params.url) ;
                default: return null ;
            }
        }
        const tx = _tx() ;
        callback(tx) ;
    }

    generateAccount = (callback) => {
        callback(generateAccount()) ;
    }

    importAccount = (phrase, callback) => {
        try {
            const account = importAccount(phrase) ;
            account.imported = true ;
            callback(account) ;
        } catch (e) {
            alert(e)
        }
    }

    getRawAddress = (address, callback) => {
        const addressU8 = decodeAddress(address) ;
        const addressRaw = u8aToHex(addressU8) ;
        callback(addressRaw) ;
    }

    getLikePrice = (callback) => {
        this.network.getLikePrice(callback) ;
    }

    getOwnersRequestPrice = (callback) => {
        this.network.getOwnersRequestPrice(callback) ;
    }

    keccakAsHex = (text, callback) => {
        callback(keccakAsHex(text)) ;
    }

    getData = (field, callback) => {
        console.log('getData', field) ;
        this.storage.get(field, callback) ;
    }

    saveData = (field, data, callback) => {
        this.storage.set(field, data, callback) ;
    }






    // -------------
    // Subscriptions
    // -------------

    subscribe = (message, callback) => {
        const func = message.func ;
        switch (func) {
            case 'getBalance': return this.getBalance(message.address, callback) ;
            case 'getUrl': return this.network.getUrl(message.url, callback) ;
            case 'getLike': return this.network.getLike(message.address, message.url, callback) ;
            case 'getBlockNumber': return this.network.getBlockNumber(callback) ;
            case 'getUrlOwner': return this.network.getUrlOwner(message.url, callback) ;
            case 'getOwnerRequest': return this.network.getOwnerRequest(message.url, callback) ;
            case 'getOwnerResult': return this.network.getOwnerResult(message.url, callback) ;
            default: return null ;
        }
    }

    getBalance = (address, callback) => {
        const self = this ;
        self.network.getBalance(address, callback).then((f) => {
            self.unsubFunctions['getBalance'] = f ;
        }) ;
    }



    // -----------
    // Transaction
    // -----------

    transaction = (message, callback) => {
        const self = this ;
        const account = message.account ;
        console.log('background.transaction.account', account) ;
        self.createTransaction(message.txType, message.params, (tx) => {
            if (account.mode === 'web3') {
                self.sendTransactionUsingWeb3(tx, account, callback) ;
            } else {
                self.sendTransactionUsingPrivatePhrase(tx, account.address, callback) ;
            }
        }) ;

    }

    sendTransactionUsingPrivatePhrase = (tx, address, callback) => {
        this.getData('accounts', (accounts) => {
            const account = findAccount(accounts, address) ;
            const transaction = new Transaction(tx, account, callback) ;
            transaction.sendUsingPrivatePhrase() ;
        })
    }

    sendTransactionUsingWeb3 = (tx, account, callback) => {
        const transaction = new Transaction(tx, account, callback) ;
        transaction.sendUsingWeb3() ;
    }




    // -----
    // Unsub
    // -----

    unsub = (func, callback) => {
        const unsub_func = this.unsubFunctions[func] ;
        if (unsub_func) {
            unsub_func() ;
        }
        if (callback) {
            callback() ;
        }
    }





}


export default WikaBackground ;










