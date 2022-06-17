const wikaExtensionId = "ggmlfkkonbpgadcefifckbldnkfjajae";

class WebappPort {

    sendMessage = (message, callback) => {
        try {
            console.log('WebappPort.sendMessage', message) ;
            window.chrome.runtime.sendMessage(wikaExtensionId, message, (response, error) => {
                if (window.chrome.runtime.lastError) {
                    console.log('WebappPort Error', window.chrome.runtime.lastError) ;
                    callback(null) ;
                } else if (response) {
                    console.log('WebappPort response', response) ;
                    callback(response) ;
                } else {
                    console.log('WebappPort response empty') ;
                    callback(null) ;
                }
            });
        } catch (e) {
            console.log('WebappPort Error', e) ;
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

export default WebappPort ;