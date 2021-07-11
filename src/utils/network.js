import { ApiPromise, WsProvider } from '@polkadot/api';


class WikaNetwork {

    constructor(endpoint) {
        this.endpoint = endpoint ;
        this.api = null ;
    }

    connect = (callback) => {
        let self = this ;
        self.wsProvider = new WsProvider(self.endpoint) ;
        ApiPromise.create({ provider: self.wsProvider })
            .then((api) => {
                self.api = api ;
                callback() ;
            }).catch(err => {
                alert(err)
            }) ;
    }

    disconnect = (callback) => {
        this.api.disconnect().then(callback) ;
    }

    getBalance = (address, callback) => {
        return this.api.query.system.account(address, callback)
            .catch((err) => {
                alert(err) ;
            }) ;
    }

    getUrl = (url, callback) => {
        return this.api.query.likes.urls(url, callback)
            .catch((err) => {
                alert(err) ;
            }) ;
    }

    getLike = (address, url, callback) => {
        return this.api.query.likes.likes(address, url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getLikePrice = (callback) => {
        return this.api.query.likes.likePrice(callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getOwnersRequestPrice = (callback) => {
        return this.api.query.owners.requestPrice(callback)
                .catch((err) => {
                    alert(err) ;
                }) ;
    }

    getUrlOwner = (url, callback) => {
        return this.api.query.owners.owners(url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getOwnerRequest = (url, callback) => {
        return this.api.query.owners.requests(url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getOwnerResult = (url, callback) => {
        return this.api.query.owners.results(url, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    getBlockNumber = (callback) => {
        return this.api.query.system.number(callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }




    txLike = (signer, url, referrer, numLikes, callback) => {
        return this.api.tx.likes.like(url, referrer, numLikes)
                    .signAndSend(signer, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

    txOwnerRequest = (signer, url, callback) => {
        return this.api.tx.owners.requestUrlCheck(url)
                    .signAndSend(signer, callback)
                    .catch((err) => {
                        alert(err) ;
                    }) ;
    }

}

export default WikaNetwork ;
