const wikaExtensionId = "ggmlfkkonbpgadcefifckbldnkfjajae";
const POPUP_PARAMS = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=630,left=400,top=100" ;


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
        /*const message = {
            message:'transaction',
            txType: txType,
            params: params,
            address: account['address']
        } ;
        callback({status:'Confirming'}) ;
        this.sendMessage(message, callback) ;*/

        function done(outcome) {
            if (outcome === 'confirmed') {
                callback({status:'ok'}) ;
            } else {
                callback({err:'Transaction was not confirmed'}) ;
            }
        }
        const url = 'chrome-extension://'+wikaExtensionId+'/index.html' ;
        const win = window.open("", "extension_popup", POPUP_PARAMS) ;
        /*var counter = 0 ;
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
        check() ;*/
    }

}

export default WebappPort ;