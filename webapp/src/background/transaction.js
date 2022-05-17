import {Keyring} from '@polkadot/api';
import {web3FromSource} from '@polkadot/extension-dapp';


// Parse error returned from polkadot API
function parseError(result) {
    console.log(JSON.stringify(result));
    if (result.dispatchError) {
        try {
            let data = result.dispatchError.asModule;
            let index = data.index;
            let error = data.error;
            return "Transaction error (" + index + "," + error + ")";
        } catch (err) {
            return "Transaction error";
        }
    } else {
        return null;
    }
}


function createTransaction(txType, params) {
    switch (txType) {
        case 'like': return window.BACKGROUND.network.txLike(params.url, params.referrer, params.numLikes) ;
        case 'owner_request': return window.BACKGROUND.network.txOwnerRequest(params.url) ;
        default: return null ;
    }
}

function sendTransaction(txType, params, account, callback) {
    if (window.BACKGROUND.env === 'ext') {
        sendTransactionInExtension(txType, params, account, callback) ;
    } else {
        if (account.mode === 'web3') {
            sendTransactionUsingWeb3(txType, params, account, callback) ;
        } else if (account.mode === 'wika') {
            sendTransactionUsingWika(txType, params, account, callback) ;
        }
    }
}

function sendTransactionInExtension(txType, params, account, callback) {
    let tx = createTransaction(txType, params) ;
    let t = new Transaction(tx, account, callback) ;
    t.sendInExtension() ;
}

function sendTransactionUsingWeb3(txType, params, account, callback) {
    let tx = createTransaction(txType, params) ;
    let t = new Transaction(tx, account, callback) ;
    t.sendUsingWeb3() ;
}

function sendTransactionUsingWika(txType, params, account, callback) {
    window.WIKA_BRIDGE.transaction(txType, params, account, callback);
}



// Transaction
class Transaction {

    constructor(tx, account, callback) {
        this.tx = tx ;
        this.account = account ;
        this.callback = callback ;
    }

    txMonitor = (result) => {
        let status = result.status ;
        if (status.isInBlock) {
            this.callback({status:'In block'}) ;
        } else if (status.isFinalized) {
            this.unsubTransaction();
            let result = {status:null} ;
            let err = parseError(result) ;
            if (err) {
                result.error = err ;
            }
            this.callback(result) ;
        }
    }

    sendInExtension = () => {
        let address = this.account.address ;
        let keyring = new Keyring({ type: 'sr25519' });
        let signer = keyring.addFromUri(this.account.phrase);
        console.log('sendTransactionLocal', address, signer);
        let self = this ;
        self.callback({status:'Sending'}) ;
        self.tx.signAndSend(signer, self.txMonitor).then((s) => {
            self.unsubTransaction = s;
        }).catch((err) => {
            self.callback({status:null, error:err}) ;
        }) ;
    }

    sendUsingWeb3 = () => {
        let source = this.account.source ;
        let address = this.account.address ;
        console.log('sendTransactionWeb3', source, address);
        let self = this ;
        web3FromSource(source).then((injector) => {
            self.callback({status:'Sending'}) ;
            self.tx.signAndSend(address, {signer: injector.signer}, self.txMonitor).then((s) => {
                self.unsubTransaction = s;
            }).catch((err) => {
                self.callback({status:null, error:err}) ;
            }) ;
        });
    }

}

export default sendTransaction ;
