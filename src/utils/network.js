import {ApiPromise, WsProvider} from '@polkadot/api';


class WikaNetwork {

    constructor(endpoint) {
        this.endpoint = endpoint ;
        this.api = null ;
    }

    connect = (callback) => {
        let self = this ;
        self.wsProvider = new WsProvider(self.endpoint) ;
        return ApiPromise.create({ provider: self.wsProvider })
            .then((api) => {
                self.api = api ;
                callback() ;
            }) ;
    }

    disconnect = (callback) => {
        return this.api.disconnect().then(callback) ;
    }

    getBalance = (address, callback) => {
        return this.api.query.system.account(address, callback) ;
    }

    getUrl = (url, callback) => {
        return this.api.query.likes.urls(url, callback) ;
    }

    getLike = (address, url, callback) => {
        return this.api.query.likes.likes(address, url, callback) ;
    }

    getLikePrice = (callback) => {
        return this.api.query.likes.likePrice(callback) ;
    }

    getOwnersRequestPrice = (callback) => {
        return this.api.query.owners.requestPrice(callback) ;
    }

    getUrlOwner = (url, callback) => {
        return this.api.query.owners.owners(url, callback) ;
    }

    getOwnerRequest = (url, callback) => {
        return this.api.query.owners.requests(url, callback) ;
    }

    getOwnerResult = (url, callback) => {
        return this.api.query.owners.results(url, callback) ;
    }

    getBlockNumber = (callback) => {
        return this.api.query.system.number(callback) ;
    }




    txLike = (address, injector, url, referrer, numLikes, callback) => {
        let tx = this.api.tx.likes.like(url, referrer, numLikes) ;
        return tx.signAndSend(address, {signer: injector.signer}, callback) ;
    }

    txOwnerRequest = (address, injector, url, callback) => {
        let tx = this.api.tx.owners.requestUrlCheck(url) ;
        return tx.signAndSend(address, {signer: injector.signer}, callback) ;
    }

}

export default WikaNetwork ;
