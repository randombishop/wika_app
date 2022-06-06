import React from "react";


import AppContext from '../utils/context' ;
import {convertToWika, wikaToUsd, findAccount} from "../utils/misc";
import MainContent from './MainContent' ;
import Footer from './Footer' ;
import styled from 'styled-components';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: null,
            action: null,
            transactionType: null,
            transactionParams: null,
            transactionSent: false,
            network: {
                type: window.BACKGROUND.network.type,
                url: window.BACKGROUND.network.endpoint,
                ready: window.BACKGROUND.network.getReady()
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
        this.getAccountFromStorage() ;
        this.getTabFromStorage() ;
        this.getActionFromStorage() ;
    }

    getAccountFromStorage = () => {
        let self = this ;
        window.BACKGROUND.storage.get('account', (result) => {
            self.setState({account:result}, () => {
                self.subscribeToBalance() ;
                self._mountedAccount = true ;
                self._mounted = self._mountedAction && self._mountedTab && self._mountedAccount ;
            });
        })
    }

    getTabFromStorage = () => {
        let self = this ;
        window.BACKGROUND.storage.get('tab', (result) => {
            if (!result) {
                result = 'splash';
            }
            self.setState({tab:result}, () => {
                self._mountedTab = true ;
                self._mounted = self._mountedAction && self._mountedTab && self._mountedAccount ;
            });
        })
    }

    getActionFromStorage = () => {
        let self = this ;
        window.BACKGROUND.storage.get('action', (result) => {
            if (!result) {
                result = 'splash';
            }
            self.setState({action:result}, () => {
                self._mountedAction = true ;
                self._mounted = self._mountedAction && self._mountedTab && self._mountedAccount ;
            });
        })
    }

    ping = () => {
        console.log('pong') ;
    }

    signTransaction = (txType, params, address, callback) => {
        const self = this ;
        console.log('signTransaction -> data', txType, params, address, this._mounted) ;
        window.BACKGROUND.storage.get('accounts', (accounts) => {
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
            let network = window.BACKGROUND.network ;
            network.connect(networkState.type, networkState.url, () => {
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
            window.BACKGROUND.network.getBalance(address, (result) => {
                let balanceWika = convertToWika(result.data.free) ;
                let balanceUsd = wikaToUsd(balanceWika) ;
                self.setState({
                    balance:{
                        wika:balanceWika,
                        usd:balanceUsd
                    }
                });
            }).then((s) => {
                self.unsubGetBalance = s ;
            });
        }
        }) ;
    }

    selectAccount = (account) => {
        console.log('App.selectAccount', account) ;
        window.BACKGROUND.storage.set('account', account) ;
        this.setState({account: account}, this.subscribeToBalance) ;
    }

    navigate = (tab) => {
        window.BACKGROUND.storage.set('tab', tab) ;
        this.setState({tab: tab});
    }

    navigateAction = (action) => {
        window.BACKGROUND.storage.set('action', action) ;
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
        window.BACKGROUND.sendTransaction(txType, txParams, account, (result) => {
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
            <AppContainer>
                <AppContext.Provider value={{
                    // Context data
                    tab: this.state.tab,
                    action: this.state.action,
                    network: this.state.network,
                    account: this.state.account,
                    balance: this.state.balance,
                    // Context functions
                    navigate: this.navigate,
                    navigateAction: this.navigateAction,
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
