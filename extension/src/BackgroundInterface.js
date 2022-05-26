
class BackgroundInterface {

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
        this.sendMessage(message, callback) ;
    }

}


export default BackgroundInterface ;