import React from "react";


import AppContext from '../utils/context' ;
import {convertToWika, wikaToUsd, findAccount} from "../utils/misc";
import MainContent from './MainContent' ;
import Footer from './Footer' ;
import sendTransaction from '../utils/transaction' ;
import styled from 'styled-components';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: null,
            action: null,
            menuOpened: false,
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
        this.getActionFromStorage() ;
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
                self._mounted = self._mountedTab && self._mountedAccount && self._mountedAction;
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
                self._mounted = self._mountedTab && self._mountedAccount && self._mountedAction;
            });
        }) ;
    }

    getActionFromStorage = () => {
        let self = this ;
        const message = {
            func: 'getData',
            field: 'action'
        };
        window.BACKGROUND_INTERFACE.call(message, (result) => {
            if (!result) {
                result = null;
            }
            self.setState({action:result}, () => {
                self._mountedAction = true ;
                self._mounted = self._mountedTab && self._mountedAccount && self._mountedAction;
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
        console.log('App.navigateTab', tab) ;
        const message = {
            func: 'saveData',
            field: 'tab',
            data: tab
        };
        window.BACKGROUND_INTERFACE.call(message, ()=>{}) ;
        this.setState({tab: tab});
    }

    navigateAction = (action) => {
        console.log('App.navigateAction', action) ;
        const message = {
            func: 'saveData',
            field: 'action',
            data: action
        };
        window.BACKGROUND_INTERFACE.call(message, ()=>{}) ;
        this.setState({action: action});
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
        window.BACKGROUND_INTERFACE.unsub('getBalance', () => {
            console.log('Unsubscribed getBalance') ;
        }) ;
    }

    closeMenu = () => {
        if ( this.state.menuOpened ) {
            this.setState({ 
                menuOpened: false
            });
        }
    }

    toggleMenu = () => {
        let toggle = !this.state.menuOpened ;
        this.setState({menuOpened:toggle}) ;
    }

    render() {
        return (
            <AppContainer onClick={() => this.closeMenu()}>
                <AppContext.Provider value={{
                    // Context data
                    tab: this.state.tab,
                    action: this.state.action,
                    menuOpened: this.state.menuOpened,
                    network: this.state.network,
                    account: this.state.account,
                    balance: this.state.balance,
                    // Context functions
                    navigate: this.navigate,
                    navigateAction: this.navigateAction,
                    selectAccount: this.selectAccount,
                    toggleMenu: this.toggleMenu,
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
            </AppContainer>
        );
    }

}


const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 100vw;
`

export default App;
