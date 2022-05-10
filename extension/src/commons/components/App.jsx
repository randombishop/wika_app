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
        this.subscribeToBalance() ;
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
