import React from "react";


import AppContext from '../utils/context' ;
import {convertToWika, wikaToUsd, findAccount} from "../utils/misc";
import MainContent from './MainContent' ;
import Footer from './Footer' ;
import sendTransaction from '../utils/transaction' ;


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: null,
            transactionType: null,
            transactionParams: null,
            transactionSent: false,
            network: {
                type: null,
                url: null,
                ready: false
            },
            api: {
                type: "Test API",
                url: "https://api-test.wika.network"
            },
            account: null,
            balance: {
                wika:null,
                usd:null
            }
        };
    }

    componentDidMount = () => {
        this.getNetworkState() ;
        this.getAccountFromStorage() ;
        this.getTabFromStorage() ;
    }

    getNetworkState = () => {
        let self = this ;
        window.BACKGROUND_INTERFACE.getNetworkInfo((info) => {
            const state = {network: info} ;
            self.setState(state) ;
        }) ;
    }

    getAccountFromStorage = () => {
        let self = this ;
        window.BACKGROUND_INTERFACE.getAccount((result) => {
            self.setState({account:result}, () => {
                self.subscribeToBalance() ;
                self._mountedAccount = true ;
                self._mounted = self._mountedTab && self._mountedAccount ;
            });
        }) ;
    }

    getTabFromStorage = () => {
        let self = this ;
        window.BACKGROUND_INTERFACE.getTab((result) => {
            if (!result) {
                result = 'splash';
            }
            self.setState({tab:result}, () => {
                self._mountedTab = true ;
                self._mounted = self._mountedTab && self._mountedAccount ;
            });
        }) ;
    }

    ping = () => {
        console.log('pong') ;
    }

    signTransaction = (txType, params, address, callback) => {
        const self = this ;
        console.log('signTransaction -> data', txType, params, address, this._mounted) ;
        window.BACKGROUND_INTERFACE.getAccounts((accounts) => {
            const account = findAccount(accounts, address) ;
            console.log('signTransaction -> account', account) ;
            if (account) {
                self.signTransactionCallback = callback ;
                self.selectAccount(account) ;
                self.setState({
                    tab: 'sign_transaction',
                    transactionType: txType,
                    transactionParams: params,
                    transactionSent: false
                }) ;
            }
        }) ;
    }

    connectNetwork = (callback) => {
        let self = this ;
        let networkState = self.state.network ;
        networkState.ready = false ;
        self.setState({network:networkState}, () => {
            window.BACKGROUND_INTERFACE.connect(networkState.type, networkState.url, () => {
                networkState.ready = true ;
                self.setState({network:networkState}, ) ;
            }) ;
        }) ;
    }

    subscribeToBalance = () => {
        let self = this;
        if (self.unsubGetBalance) {
            self.unsubGetBalance() ;
            self.unsubGetBalance = null ;
        }
        let clearBalance = {
            wika:null,
            usd:null
        } ;
        self.setState({balance:clearBalance}, () => {
            if (self.state.account && self.state.network.ready) {
                let address = self.state.account.address;
                window.BACKGROUND_INTERFACE.getBalance(address, (result) => {
                    let balanceWika = convertToWika(result.data.free) ;
                    let balanceUsd = wikaToUsd(balanceWika) ;
                    self.setState({
                        balance:{
                            wika:balanceWika,
                            usd:balanceUsd
                        }
                    });
                });
                // We have a problem here, one message one response between popup and service worker is not enough
                // we need some port connection here...
                //).then((s) => {
                //    self.unsubGetBalance = s ;
                //});
            }
        }) ;
    }

    selectAccount = (account) => {
        console.log('App.selectAccount', account) ;
        window.BACKGROUND_INTERFACE.setAccount(account, ()=>{}) ;
        this.setState({account: account}, this.subscribeToBalance) ;
    }

    navigate = (tab) => {
        console.log('App.navigate', tab) ;
        window.BACKGROUND_INTERFACE.setTab(tab, ()=>{}) ;
        this.setState({tab: tab});
    }

    rejectTransaction = () => {
        this.signTransactionCallback('rejected') ;
        window.close() ;
    }

    confirmTransaction = () => {
        const txType = this.state.transactionType ;
        const txParams = this.state.transactionParams ;
        const account = this.state.account ;
        this.setState({transactionSent: true}) ;
        sendTransaction(txType, txParams, account, (result) => {
            if (result.status==='In block') {
                this.signTransactionCallback('confirmed') ;
                window.close() ;
            }
        }) ;
    }

    componentWillUnmount = () => {
        this._mounted = false;
        if (this.unsubGetBalance) {
            this.unsubGetBalance() ;
        }
    }





    render() {
        return (
            <div className="wika-app">
                <AppContext.Provider value={{
                    // Context data
                    tab: this.state.tab,
                    network: this.state.network,
                    account: this.state.account,
                    balance: this.state.balance,
                    // Context functions
                    navigate: this.navigate,
                    selectAccount: this.selectAccount,
                    // API Endpoint
                    apiEndpoint: this.state.api,
                    // Transaction signing
                    transactionSent: this.state.transactionSent,
                    transactionType: this.state.transactionType,
                    transactionParams: this.state.transactionParams,
                    rejectTransaction: this.rejectTransaction,
                    confirmTransaction: this.confirmTransaction
                }}>
                    <MainContent />
                    <Footer />
                </AppContext.Provider>
            </div>
        );
    }

}

export default App;
