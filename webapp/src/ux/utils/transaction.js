import {Keyring} from '@polkadot/api';
<<<<<<< HEAD:webapp/src/ux/utils/transaction.js
import {web3FromSource} from '@polkadot/extension-dapp';
import { getEnvironment } from './misc';


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


function createTransaction(txType, params, callback) {
    const message = {
        func: 'createTransaction',
        txType: txType,
        params: params
    }
    window.BACKGROUND_INTERFACE.call(message, (tx) => {
        callback(tx) ;
    }) ;
}

function sendTransaction(txType, params, account, callback) {
    const env = getEnvironment() ;
    if (env === 'ext') {
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
    createTransaction(txType, params, (tx) => {
        let t = new Transaction(tx, account, callback) ;
        t.sendInExtension() ;
    }) ;
}

function sendTransactionUsingWeb3(txType, params, account, callback) {
    createTransaction(txType, params, (tx) => {
        let t = new Transaction(tx, account, callback) ;
        t.sendUsingWeb3() ;
    }) ;
}

function sendTransactionUsingWika(txType, params, account, callback) {
    window.WIKA_BRIDGE.transaction(txType, params, account, callback);
}
=======
import {parsePolkadotError} from './utils.js' ;
>>>>>>> master:webapp/src/background/transaction.js



class Transaction {

    constructor(tx, account, callback) {
        this.tx = tx ;
        this.account = account ;
        this.callback = callback ;
    }

    txMonitor = (result) => {
        let status = result.status ;
        if (status.isInBlock) {
            console.log('txMonitor: isInBlock') ;
        } else if (status.isFinalized) {
            console.log('txMonitor: isFinalized') ;
            this.unsubTransaction();
            let result = {} ;
            let err = parsePolkadotError(result) ;
            if (err) {
                result.error = err ;
            } else {
                result.status = 'done' ;
            }
            this.callback(result) ;
        }
    }

    sendUsingPrivatePhrase = () => {
        let address = this.account.address ;
        let keyring = new Keyring({ type: 'sr25519' });
        let signer = keyring.addFromUri(this.account.phrase);
        console.log('sendTransactionLocal', address, signer);
        let self = this ;
        self.tx.signAndSend(signer, self.txMonitor).then((s) => {
            self.unsubTransaction = s;
        }).catch((err) => {
            self.callback({error:err}) ;
        }) ;
    }

    sendUsingWeb3 = () => {
        let source = this.account.source ;
        let address = this.account.address ;
        console.log('sendTransactionWeb3', source, address);
        let self = this ;
        window.web3FromSource(source).then((injector) => {
            self.tx.signAndSend(address, {signer: injector.signer}, self.txMonitor).then((s) => {
                self.unsubTransaction = s;
            }).catch((err) => {
                self.callback({error:err}) ;
            }) ;
        });
    }

}

export default Transaction ;
