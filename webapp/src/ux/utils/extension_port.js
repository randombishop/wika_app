
class ExtensionPort {

    constructor() {
        this.port = window.chrome.runtime.connect({name: "background_interface"});
        this.callbacks = {} ;
        this.port.onMessage.addListener(this.receiveMessage);
    }

    receiveMessage = (msg) => {
        console.log('receivedMessage', msg) ;
        const func = msg.func ;
        const data = msg.data ;
        if (this.callbacks[func]) {
            this.callbacks[func](data) ;
        }
    }

    sendMessage = (message, callback) => {
        try {
            console.log('BackgroundInterface message', message) ;
            window.chrome.runtime.sendMessage(message, (response, error) => {
                if (window.chrome.runtime.lastError) {
                    console.log('BackgroundInterface error', window.chrome.runtime.lastError) ;
                    callback(null) ;
                } else if (response) {
                    console.log('BackgroundInterface response', response) ;
                    callback(response) ;
                } else {
                    console.log('BackgroundInterface response empty') ;
                    callback(null) ;
                }
            });
        } catch (e) {
            console.log('BackgroundInterface Error', e) ;
            callback(null) ;
        }
    }

    call = (message, callback) => {
        message.funcType = 'call' ;
        this.sendMessage(message, callback) ;
    }

    subscribe = (message, callback) => {
        message.funcType = 'subscribe' ;
        const func = message.func ;
        this.callbacks[func] = callback ;
        this.sendMessage(message, (res) => {
            if (res !== 'ack') {
                console.error('Subscription did not return ACK') ;
            }
        }) ;
    }

    transaction = (message, callback) => {
        message.funcType = 'transaction' ;
        this.sendMessage(message, callback) ;
    }

    unsub = (funcName, callback) => {
        const message = {
            funcType: 'unsub',
            func: funcName
        }
        this.sendMessage(message, callback) ;
    }

}


export default ExtensionPort ;