

const POPUP_PARAMS = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=630,left=400,top=100" ;


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
        window.getBackground((BACKGROUND) => {
            BACKGROUND.storage.get('accounts', (list) => {
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
        }) ;
    }

    transaction = (source, request, sendResponse) => {
        function done(outcome) {
            if (outcome === 'confirmed') {
                sendResponse({status:null}) ;
            } else {
                sendResponse({status:null, err:'Transaction was not confirmed'}) ;
            }
        }
        const win = window.open("index.html", "extension_popup", POPUP_PARAMS) ;
        var counter = 0 ;
        function check() {
            counter++ ;
            if(win.wikaReactApp && win.wikaReactApp._mounted) {
                win.wikaReactApp.signTransaction(request.txType,
                                                 request.params,
                                                 request.address,
                                                 done);
            } else if (counter<250) {
                setTimeout(check, 10);
            } else {
                sendResponse({status:null, err:'Could not open the Wika extension'}) ;
            }
        }
        check() ;
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