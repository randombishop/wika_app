const wikaExtensionId = "ggmlfkkonbpgadcefifckbldnkfjajae";

class WebappPort {

    constructor() {
        this.port = window.chrome.runtime.connect(wikaExtensionId, {name: "background_interface"});
        this.callbacks = {} ;
        this.port.onMessage.addListener(this.receiveMessage);
    }

    receiveMessage = (msg) => {
        console.log('WebappPort.receivedMessage', msg) ;
        const func = msg.func ;
        const data = msg.data ;
        if (this.callbacks[func]) {
            this.callbacks[func](data) ;
        }
    }

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

    account = (callback) => {
        this.sendMessage({message:'account'}, callback) ;
    }

    accounts = (callback) => {
        this.sendMessage({message:'accounts'}, callback) ;
    }

    subscribeToUrl = (url, callback) => {
        this.callbacks['getUrl'] = callback ;
        this.sendMessage({message:'subscribeToUrl', url:url}, (ack) => {
            console.log('subscribeToUrl: '+ack) ;
        }) ;
    }

    subscribeToLike = (address, url, callback) => {
        this.callbacks['getLike'] = callback ;
        this.sendMessage({message:'subscribeToLike', address:address, url:url}, (ack) => {
            console.log('subscribeToLike: '+ack) ;
        }) ;
    }

    unsub = (func, callback) => {
        this.sendMessage({message:'unsub', func:func}, callback) ;
    }

    transaction = (txType, params, account, callback) => {
        const message = {
            message:'transaction',
            txType: txType,
            params: params,
            address: account['address']
        } ;
        this.sendMessage(message, (result) => {
            if (result.txId) {
                console.log('submitted transaction #', result.txId) ;
            } else {
                alert('Could not open Wika Extension') ;
            }
        }) ;
    }

}

export default WebappPort ;