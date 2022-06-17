import { getEnvironment } from './misc';


function sendTransaction(txType, params, account, callback) {
    const env = getEnvironment() ;
    if (env === 'ext') {
        sendTransactionToBackground(txType, params, account, callback) ;
    } else {
        if (account.mode === 'web3') {
            sendTransactionToBackground(txType, params, account, callback) ;
        } else if (account.mode === 'wika') {
            sendTransactionToWikaExtension(txType, params, account, callback) ;
        }
    }
}

function sendTransactionToBackground(txType, params, account, callback) {
    const accountData = {
        mode: account.mode,
        source: account.source,
        address: account.address
    }
    const message = {
        func: 'transaction',
        txType: txType,
        params: params,
        account: accountData
    }
    window.BACKGROUND_INTERFACE.transaction(message, callback) ;
}

function sendTransactionToWikaExtension(txType, params, account, callback) {
    window.WIKA_BRIDGE.transaction(txType, params, account, callback);
}


export default sendTransaction ;