import {u8aToHex} from '@polkadot/util' ;
import {cryptoWaitReady, keccakAsHex, decodeAddress} from '@polkadot/util-crypto' ;
import '@polkadot/wasm-crypto/initOnlyAsm';



import {getEnvironment} from './utils.js' ;
import WikaNetwork from './network.js' ;
import {importAccount, generateAccount} from './crypto.js' ;
import {StorageApp, StorageExt} from './storage.js' ;


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
        // Done
        console.log('env = '+this.env) ;
        console.log('WikaBackground Constructor DONE') ;
    }



    // ------------------
    // Crypto and network
    // ------------------

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

    getBalance = (address, callback) => {
        this.network.getBalance(address, callback) ;
    }

    getUrl = (url, callback) => {
        this.network.getUrl(url, callback) ;
    }

    getLike = (address, url, callback) => {
        this.network.getLike(address, url, callback) ;
    }

    getLikePrice = (callback) => {
        this.network.getLikePrice(callback) ;
    }

    getOwnersRequestPrice = (callback) => {
        this.network.getOwnersRequestPrice(callback) ;
    }

    getBlockNumber =  (callback) => {
        this.network.getBlockNumber(callback) ;
    }

    getUrlOwner = (url, callback) => {
        this.network.getUrlOwner(url, callback) ;
    }

    getOwnerRequest = (url, callback) => {
        this.network.getOwnerRequest(url, callback) ;
    }

    getOwnerResult = (url, callback) => {
        this.network.getOwnerResult(url, callback) ;
    }

    createTransaction = (txType, params, callback) => {
        function _tx() {
            switch (txType) {
                case 'like': return this.network.txLike(params.url, params.referrer, params.numLikes) ;
                case 'owner_request': return this.network.txOwnerRequest(params.url) ;
                default: return null ;
            }
        }
        const tx = _tx() ;
        callback(tx) ;
    }

    keccakAsHex = (text, callback) => {
        const hash = keccakAsHex(text) ;
        callback(hash) ;
    }

    generateAccount = (callback) => {
        const account = generateAccount() ;
        callback(account) ;
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



    // -------
    // Storage
    // -------

    getAccounts = (callback) => {
        this.storage.get('accounts', callback) ;
    }

    getAccount = (callback) => {
        this.storage.get('account', callback) ;
    }

    getTab = (callback) => {
        this.storage.get('tab', callback) ;
    }

    setAccounts = (accounts, callback) => {
        this.storage.set('accounts', accounts, callback) ;
    }

    setAccount = (account, callback) => {
        this.storage.set('account', account, callback) ;
    }

    setTab = (tab, callback) => {
        this.storage.set('tab', tab, callback) ;
    }



}


export default WikaBackground ;










