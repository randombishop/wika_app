import {ApiPromise, WsProvider, Keyring} from '@polkadot/api';
import {web3FromSource} from '@polkadot/extension-dapp';
import {parseError} from "./misc";


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



    txMonitor = (callback) => (result) => {
        let status = result.status ;
        if (status.isInBlock) {
            callback({status:'In block'}) ;
        } else if (status.isFinalized) {
            this.unsubTransaction();
            let err = parseError(result) ;
            if (err) {
                callback({status:'Error', err: err}) ;
            } else {
                callback({status:'Done'}) ;
            }
        }
    }


    txLike = (account, url, referrer, numLikes, callback) => {
        let mode = account.mode ;
        if (mode==='web3') {
            this.txLikeWeb3(account, url, referrer, numLikes, callback) ;
        } else {
            this.txLikeLocal(account, url, referrer, numLikes, callback) ;
        }
    }

    txLikeLocal = (account, url, referrer, numLikes, callback) => {
        let address = account.address ;
        let keyring = new Keyring({ type: 'sr25519' });
        let signer = keyring.addFromUri(account.phrase);
        console.log('txLikeLocal', address, url, referrer, numLikes, signer);
        let self = this ;
        let txLike = self.txLikeInstance(url, referrer, numLikes) ;
        callback({status:'Sending'}) ;
        txLike.signAndSend(signer, self.txMonitor(callback)).then((s) => {
            self.unsubTransaction = s;
        }).catch((err) => {
            callback({status:'Error', err: err}) ;
        }) ;
    }

    txLikeWeb3 = (account, url, referrer, numLikes, callback) => {
        let source = account.source ;
        let address = account.address ;
        console.log('txLikeWeb3', source, address, url, referrer, numLikes);
        let self = this ;
        web3FromSource(source).then((injector) => {
            let txLike = self.txLikeInstance(url, referrer, numLikes) ;
            callback({status:'Sending'}) ;
            txLike.signAndSend(address, {signer: injector.signer}, self.txMonitor(callback)).then((s) => {
                self.unsubTransaction = s;
            }).catch((err) => {
                callback({status:'Error', err: err}) ;
            }) ;
        });
    }

    txLikeInstance = (url, referrer, numLikes) => {
        return this.api.tx.likes.like(url, referrer, numLikes) ;
    }



}

export default WikaNetwork ;
