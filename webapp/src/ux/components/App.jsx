import React from "react";


import AppContext from '../utils/context' ;
import {convertToWika, wikaToUsd, findAccount} from "../utils/misc";
import MainContent from './MainContent' ;
import Footer from './Footer' ;
import sendTransaction from '../utils/send_transaction' ;


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
        window.BACKGROUND_INTERFACE.call({func: 'getNetworkInfo'}, (info) => {
            const state = {network: info} ;
            self.setState(state) ;
        }) ;
    }

    getAccountFromStorage = () => {
        let self = this ;
        const message = {
            func: 'getData',
            field: 'account'
        };
        window.BACKGROUND_INTERFACE.call(message, (result) => {
            self.setState({account:result}, () => {
                self.subscribeToBalance() ;
                self._mountedAccount = true ;
                self._mounted = self._mountedTab && self._mountedAccount ;
            });
        }) ;
    }

    getTabFromStorage = () => {
        let self = this ;
        const message = {
            func: 'getData',
            field: 'tab'
        };
        window.BACKGROUND_INTERFACE.call(message, (result) => {
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
        console.log('signTransaction -> data', txType, params, address, this._mounted) ;
        const self = this ;
        const message = {
            func: 'getData',
            field: 'accounts'
        };
        window.BACKGROUND_INTERFACE.call(message, (accounts) => {
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
            const message = {
                func: 'connect',
                networkType: networkState.type,
                networkUrl: networkState.url
            };
            window.BACKGROUND_INTERFACE.call(message, () => {
                networkState.ready = true ;
                self.setState({network:networkState}, ) ;
            }) ;
        }) ;
    }

    subscribeToBalance = () => {
        let self = this;
        window.BACKGROUND_INTERFACE.unsub('getBalance', () => {
            let clearBalance = {
                wika:null,
                usd:null
            } ;
            self.setState({balance:clearBalance}, () => {
                if (self.state.account && self.state.network.ready) {
                    const address = self.state.account.address;
                    const message = {
                        func: 'getBalance',
                        address: address
                    };
                    window.BACKGROUND_INTERFACE.subscribe(message, (result) => {
                        let balanceWika = convertToWika(result.data.free) ;
                        let balanceUsd = wikaToUsd(balanceWika) ;
                        self.setState({
                            balance:{
                                wika:balanceWika,
                                usd:balanceUsd
                            }
                        });
                    });
                }
            }) ;
        }) ;
    }

    selectAccount = (account) => {
        console.log('App.selectAccount', account) ;
        const message = {
            func: 'saveData',
            field: 'account',
            data: account
        };
        window.BACKGROUND_INTERFACE.call(message, ()=>{}) ;
        this.setState({account: account}, this.subscribeToBalance) ;
    }

    navigate = (tab) => {
        console.log('App.navigate', tab) ;
        const message = {
            func: 'saveData',
            field: 'tab',
            data: tab
        };
        window.BACKGROUND_INTERFACE.call(message, ()=>{}) ;
        this.setState({tab: tab});
    }

    rejectTransaction = () => {
        this.signTransactionCallback('rejected') ;
        window.close() ;
    }

    confirmTransaction = () => {
        const self = this ;
        const txType = this.state.transactionType ;
        const txParams = this.state.transactionParams ;
        const account = this.state.account ;
        self.setState({transactionSent: true}) ;
        sendTransaction(txType, txParams, account, (result) => {
            if (result.error) {
                self.signTransactionCallback('error') ;
                window.close() ;
            } else {
                self.signTransactionCallback('confirmed') ;
                window.close() ;
            }
        }) ;
    }

    componentWillUnmount = () => {
        this._mounted = false;
        window.BACKGROUND_INTERFACE.unsub('getBalance', () => {
            console.log('Unsubscribed getBalance') ;
        }) ;
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
