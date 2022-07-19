import {simpleHash} from './utils' ;


class ExtensionPort {

    constructor(background) {
        this.background = background ;
        this.listenOnConnect() ;
        this.listenOnMessage() ;
        this.listenOnMessageExternal() ;
    }

    // ------------------------------------------
    // Internal Communication Extension-Extension
    // ------------------------------------------

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





    // ------------------------------------------
    // External Communication Webpage-Extension
    // ------------------------------------------

    listenOnMessageExternal = () => {
        let self = this ;
        chrome.runtime.onMessageExternal.addListener(
          function(request, sender, sendResponse) {
            const source = sender.documentId ;
            const message = request.message ;
            switch (message) {
                case 'ping': return self.ping(source, request, sendResponse) ;
                case 'accounts': return self.accounts(source, request, sendResponse) ;
                case 'transaction': return self.transaction(source, request, sendResponse) ;
                default: return self.debug(source, request, sendResponse) ;
            }
          }
        );
    }

    ping = (source, request, sendResponse) => {
        sendResponse('pong') ;
    }

    accounts = (source, request, sendResponse) => {
        this.background.getData('accounts', (list) => {
            var ans = [] ;
            if (list) {
                ans = list.map((a) => {
                    return {address: a.address,
                            addressRaw: a.addressRaw,
                            name: a.name} ;
                })
            }
            sendResponse(ans) ;
        }) ;
    }

    transaction = (source, request, sendResponse) => {
        const transaction_id = simpleHash(request.txType+'/'+JSON.stringify(request.params)) ;
        let url = "index.html?txId="+transaction_id ;
        url += '&txType='+request.txType ;
        url += '&txParams='+JSON.stringify(request.params) ;
        url += '&txAddress='+request.address ;
        const options = {
            url: url,
            type: "popup",
            width: 500,
            height: 630,
            left: 400,
            top: 100,
            focused: true
        } ;
        console.log('creating pop up', url) ;
        chrome.windows.create(options, (win) => {
            sendResponse({txId: transaction_id}) ;
        });
    }

    debug = (source, request, sendResponse) => {
        const data = {
            message: 'debug',
            source: source,
            request: request
        }
        sendResponse(data) ;
    }

}


export default ExtensionPort ;

