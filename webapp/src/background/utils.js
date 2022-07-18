function getEnvironment() {
    try {
        const url = window.location.href
        const env = (url.split(':')[0] === 'chrome-extension') ? 'ext' : 'app'
        return env ;
    } catch (e) {
        return 'ext' ;
    }
}

function parsePolkadotError(result) {
    if (result.dispatchError) {
        try {
            let data = result.dispatchError.asModule;
            let index = data.index;
            let error = data.error;
            return "Transaction error (" + index + "," + error + ")";
        } catch (err) {
            return "Transaction error";
        }
    } else {
        return null;
    }
}

function findAccount(accounts, address) {
    if (accounts) {
        return accounts.find(x => (x.address===address)) ;
    } else {
        return null ;
    }
}

function simpleHash(text) {
    var hash = 0, i, chr;
    if (text.length === 0) return hash;
    for (i = 0; i < text.length; i++) {
        chr   = text.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    if (hash<0) {
        hash = -hash ;
    }
    return hash;
}


export {
    getEnvironment,
    parsePolkadotError,
    findAccount,
    simpleHash
} ;