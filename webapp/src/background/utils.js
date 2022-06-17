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

export {
    getEnvironment,
    parsePolkadotError,
    findAccount
} ;