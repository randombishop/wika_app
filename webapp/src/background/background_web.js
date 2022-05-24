import WikaBackground from './background.js' ;


class DirectBackgroundInterface {

    constructor() {
        this.bg = new WikaBackground() ;
    }

    connect = (networkType, networkUrl, callback) => {
        this.bg.connect(networkType, networkUrl, callback) ;
    }

    getNetworkInfo = (callback) => {
        this.bg.getNetworkInfo(callback) ;
    }

    getAccount = (callback) => {
        this.bg.getAccount(callback) ;
    }

    getTab = (callback) => {
        this.bg.getTab(callback) ;
    }

    setAccount = (account, callback) => {
        this.bg.setAccount(account, callback) ;
    }

    setTab = (tab, callback) => {
        this.bg.setTab(tab, callback) ;
    }

    getAccounts = (callback) => {
        this.bg.getAccounts(callback) ;
    }

    getBalance = (address, callback) => {
        this.bg.getBalance(address, callback) ;
    }


}


window.BACKGROUND_INTERFACE = new DirectBackgroundInterface() ;

