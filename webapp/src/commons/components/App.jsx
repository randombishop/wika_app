import React from "react";


import AppContext from '../utils/context' ;
import {convertToWika, wikaToUsd} from "../utils/misc";
import MainContent from './MainContent' ;
import Footer from './Footer' ;


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: "splash",
            network: {
                type: "Wika Testnet",
                url: "wss://testnode3.wika.network:443",
                status: 'connecting'
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
        this.connectNetwork() ;
    }

    connectNetwork = (callback) => {
        let self = this ;
        let networkState = self.state.network ;
        networkState.status = 'connecting' ;
        self.setState({network:networkState}, () => {
            let network = window.BACKGROUND.network ;
            network.connect(networkState.url, () => {
                networkState.status = 'connected' ;
                self.setState({network:networkState}, this.subscribeToBalance) ;
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
            if (self.state.account && self.state.network.status==='connected') {
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
        this.setState({account: account}, this.subscribeToBalance) ;
    }

    navigate = (tab) => {
        this.setState({tab: tab});
    }

    componentWillUnmount = () => {
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
                    apiEndpoint: this.state.api
                }}>
                    <MainContent />
                    <Footer/>
                </AppContext.Provider>
            </div>
        );
    }

}

export default App;