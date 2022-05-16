





class ExtensionPort {

    constructor() {
        this.registerListener() ;
    }

    registerListener = () => {
        let self = this ;
        window.chrome.runtime.onMessageExternal.addListener(
          function(request, sender, sendResponse) {
            const source = sender.documentId ;
            const message = request.message ;
            switch (message) {
                case 'ping': return self.ping(source, request, sendResponse) ;
                case 'accounts': return self.accounts(source, request, sendResponse) ;
                default: return self.debug(source, request, sendResponse) ;
            }
          }
        );
    }

    ping = (source, request, sendResponse) => {
        sendResponse('pong') ;
    }

    accounts = (source, request, sendResponse) => {
        window.BACKGROUND.storage.get('accounts', (list) => {
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