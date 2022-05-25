
class BackgroundInterface {

    call = (message, callback) => {
        message.funcType = 'call' ;
        window.chrome.runtime.sendMessage(message, callback) ;
    }

    subscribe = (message, callback) => {
        message.funcType = 'subscribe' ;
        window.chrome.runtime.sendMessage(message, callback) ;
    }

}


export default BackgroundInterface ;