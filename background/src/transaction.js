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
            let err = parseError(result) ;
            if (err) {
                this.callback({status:'Error', err: err}) ;
            } else {
                this.callback({status:'Done'}) ;
            }
        }
    }

    send = () => {
        let mode = this.account.mode ;
        if (mode==='web3') {
            this.sendTransactionWeb3() ;
        } else {
            this.sendTransactionLocal() ;
        }
    }

    sendTransactionLocal = () => {
        let address = this.account.address ;
        let keyring = new Keyring({ type: 'sr25519' });
        let signer = keyring.addFromUri(this.account.phrase);
        console.log('sendTransactionLocal', address, signer);
        let self = this ;
        self.callback({status:'Sending'}) ;
        self.tx.signAndSend(signer, self.txMonitor).then((s) => {
            self.unsubTransaction = s;
        }).catch((err) => {
            self.callback({status:'Error', err: err}) ;
        }) ;
    }

    sendTransactionWeb3 = () => {
        let source = this.account.source ;
        let address = this.account.address ;
        console.log('sendTransactionWeb3', source, address);
        let self = this ;
        web3FromSource(source).then((injector) => {
            self.callback({status:'Sending'}) ;
            self.tx.signAndSend(address, {signer: injector.signer}, self.txMonitor).then((s) => {
                self.unsubTransaction = s;
            }).catch((err) => {
                self.callback({status:'Error', err: err}) ;
            }) ;
        });
    }

}

export default Transaction ;
