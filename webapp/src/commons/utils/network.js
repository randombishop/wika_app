import {ApiPromise, WsProvider, Keyring} from '@polkadot/api';
import {web3FromSource} from '@polkadot/extension-dapp';
import {parseError} from "./misc";


class WikaNetwork {

    constructor() {
        this.endpoint = null ;
        this.api = null ;
    }

    connect = (endpoint, callback) => {
        let self = this ;
        self.endpoint = null ;
        self.wsProvider = new WsProvider(self.endpoint) ;
        return ApiPromise.create({ provider: self.wsProvider })
            .then((api) => {
                self.endpoint = endpoint ;
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

    sendTransaction = (tx, account, callback) => {
        let mode = account.mode ;
        if (mode==='web3') {
            this.sendTransactionWeb3(tx, account, callback) ;
        } else {
            this.sendTransactionLocal(tx, account, callback) ;
        }
    }

    sendTransactionLocal = (tx, account, callback) => {
        let address = account.address ;
        let keyring = new Keyring({ type: 'sr25519' });
        let signer = keyring.addFromUri(account.phrase);
        console.log('sendTransactionLocal', address, signer);
        let self = this ;
        callback({status:'Sending'}) ;
        tx.signAndSend(signer, self.txMonitor(callback)).then((s) => {
            self.unsubTransaction = s;
        }).catch((err) => {
            callback({status:'Error', err: err}) ;
        }) ;
    }

    sendTransactionWeb3 = (tx, account, callback) => {
        let source = account.source ;
        let address = account.address ;
        console.log('sendTransactionWeb3', source, address);
        let self = this ;
        web3FromSource(source).then((injector) => {
            callback({status:'Sending'}) ;
            tx.signAndSend(address, {signer: injector.signer}, self.txMonitor(callback)).then((s) => {
                self.unsubTransaction = s;
            }).catch((err) => {
                callback({status:'Error', err: err}) ;
            }) ;
        });
    }




    txLike = (account, url, referrer, numLikes, callback) => {
        let tx = this.api.tx.likes.like(url, referrer, numLikes) ;
        this.sendTransaction(tx, account, callback) ;
    }

    txOwnerRequest = (account, url, callback) => {
        let tx = this.api.tx.owners.requestUrlCheck(url) ;
        this.sendTransaction(tx, account, callback) ;
    }


}

export default WikaNetwork ;
