

class ExtensionInternalPort {

    constructor(background) {
        this.background = background ;
        this.registerListener() ;
    }

    registerListener = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.funcType === 'call') {
                this.background.call(message, sendResponse) ;
            } else if (message.funcType === 'subscribe') {
                this.background.subscribe(message, sendResponse) ;
            } else {
                sendResponse({err: 'Unrecognized funcType', originalMessage: message}) ;
            }
        });
    }

}


export default ExtensionInternalPort ;