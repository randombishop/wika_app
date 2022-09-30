import {simpleHash} from './utils' ;


// -----------------------------------------------
// Extension side port for communication between
// authorized webpages and Extension Background
// Allows to call a subset of Background features
// -----------------------------------------------

class ExternalPort {

    constructor(background) {
        this.background = background ;
        this.listenOnConnectExternal() ;
        this.listenOnMessageExternal() ;
    }

    listenOnConnectExternal = () => {
        const self = this ;
        chrome.runtime.onConnectExternal.addListener(function(port) {
          if (port.name === "background_interface") {
            self.port = port ;
          }
        });
    }

    listenOnMessageExternal = () => {
        let self = this ;
        chrome.runtime.onMessageExternal.addListener(
          function(request, sender, sendResponse) {
            const source = sender.documentId ;
            const message = request.message ;
            switch (message) {
                case 'ping': return self.ping(source, request, sendResponse) ;
                case 'account': return self.account(source, request, sendResponse) ;
                case 'accounts': return self.accounts(source, request, sendResponse) ;
                case 'subscribeToUrl': return self.subscribeToUrl(source, request, sendResponse) ;
                case 'subscribeToLike': return self.subscribeToLike(source, request, sendResponse) ;
                case 'unsub': return self.unsub(source, request, sendResponse) ;
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

    account = (source, request, sendResponse) => {
        this.background.getData('account', (a) => {
            var ans = {address: a.address,
                       addressRaw: a.addressRaw,
                       name: a.name} ;
            sendResponse(ans) ;
        }) ;
    }

    subscribeToUrl = (source, request, sendResponse) => {
        this.background.subscribe({func:'getUrl', url:request.url}, (data) => {
            const newMessage = {
                func: 'getUrl',
                data: data
            }
            this.port.postMessage(newMessage);
        }) ;
        sendResponse('ack') ;
    }

    subscribeToLike = (source, request, sendResponse) => {
        this.background.subscribe({func:'getLike', address: request.address, url:request.url}, (data) => {
            const newMessage = {
                func: 'getLike',
                data: data
            }
            this.port.postMessage(newMessage);
        }) ;
        sendResponse('ack') ;
    }

    unsub = (source, request, sendResponse) => {
        this.background.unsub(request.func, sendResponse) ;
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


export default ExternalPort ;

