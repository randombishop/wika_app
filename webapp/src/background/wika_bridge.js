const wikaExtensionId = "ggmlfkkonbpgadcefifckbldnkfjajae";

class WikaBridge {

    sendMessage = (message, callback) => {
        try {
            window.chrome.runtime.sendMessage(wikaExtensionId, message, (response, error) => {
                if (window.chrome.runtime.lastError) {
                    console.log('WikaBridge Error: '+JSON.stringify(window.chrome.runtime.lastError)) ;
                    callback(null) ;
                } else if (response) {
                    console.log('WikaBridge response', response) ;
                    callback(response) ;
                } else {
                    console.log('WikaBridge response empty') ;
                    callback(null) ;
                }
            });
        } catch (e) {
            callback(null) ;
        }
    }

    ping = (callback) => {
        this.sendMessage({message:'ping'}, callback) ;
    }

    accounts = (callback) => {
        this.sendMessage({message:'accounts'}, callback) ;
    }

    transaction = (txType, params, account, callback) => {
        const message = {
            message:'transaction',
            txType: txType,
            params: params,
            address: account['address']
        } ;
        callback({status:'Confirming'}) ;
        this.sendMessage(message, callback) ;
    }

}

export default WikaBridge ;