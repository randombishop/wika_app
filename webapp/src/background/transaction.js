import {Keyring} from '@polkadot/api';
import {web3FromSource} from '@polkadot/extension-dapp';
import {parsePolkadotError} from './utils.js' ;


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

    send = () => {
        if (this.account.mode === 'web3') {
            this.sendUsingWeb3() ;
        } else {
            this.sendInExtension() ;
        }
    }

    sendInExtension = () => {
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
        web3FromSource(source).then((injector) => {
            self.tx.signAndSend(address, {signer: injector.signer}, self.txMonitor).then((s) => {
                self.unsubTransaction = s;
            }).catch((err) => {
                self.callback({error:err}) ;
            }) ;
        });
    }

}

export default Transaction ;
