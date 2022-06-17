

class ExtensionInternalPort {

    constructor(background) {
        this.background = background ;
        this.listenOnConnect() ;
        this.listenOnMessage() ;
    }

    listenOnConnect = () => {
        const self = this ;
        chrome.runtime.onConnect.addListener(function(port) {
          if (port.name === "background_interface") {
            self.port = port ;
          }
        });
    }

    listenOnMessage = () => {
        const self = this ;
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            const funcType = message.funcType ;
            const func = message.func ;
            if (funcType === 'call') {
                self.background.call(message, sendResponse) ;
                return true ;
            } else if (funcType === 'subscribe') {
                self.background.subscribe(message, (data) => {
                    const newMessage = {
                        func: func,
                        data: data
                    }
                    self.port.postMessage(newMessage);
                }) ;
                sendResponse('ack') ;
            } else if (funcType === 'transaction') {
                self.background.transaction(message, sendResponse) ;
                return true ;
            } else if (funcType === 'unsub') {
                self.background.unsub(func, sendResponse) ;
                return true ;
            } else {
                sendResponse({err: 'Unrecognized funcType', originalMessage: message}) ;
            }
        });
    }

}


export default ExtensionInternalPort ;