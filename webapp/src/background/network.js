import {ApiPromise, WsProvider} from '@polkadot/api' ;


class WikaNetwork {

    constructor() {
        this.type = null ;
        this.endpoint = null ;
        this.api = null ;
    }

    connect = (type, endpoint, callback) => {
        let self = this ;
        self.type = null ;
        self.endpoint = null ;
        self.api = null ;
        self.wsProvider = new WsProvider(endpoint) ;
        return ApiPromise.create({ provider: self.wsProvider })
            .then((api) => {
                self.type = type ;
                self.endpoint = endpoint ;
                self.api = api ;
                callback() ;
            }) ;
    }

    getReady = () => {
        return (this.api != null) ;
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

    getUrlInfo = (address, url, callback) => {
        Promise.all([this.api.query.likes.urls(url),this.api.query.likes.likes(address, url)])
            .then((result) => {
                let ans = {
                    urlLikes: Number(result[0][0]),
                    likesSubmittedAt: Number(result[1][0]),
                    likesSubmittedCount:Number(result[1][1]),
                    likesSubmittedRemaining:Number(result[1][2])
                } ;
                callback(ans) ;
            }) ;
    }

    txLike = (url, referrer, numLikes) => {
        return this.api.tx.likes.like(url, referrer, numLikes) ;
    }

    txOwnerRequest = (url) => {
        return this.api.tx.owners.requestUrlCheck(url) ;
    }

}

export default WikaNetwork ;