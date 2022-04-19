import React from "react";
import {cryptoWaitReady} from '@polkadot/util-crypto';


import WikaNetwork from './utils/network' ;
import AppContext from './utils/context' ;
import {convertToWika, wikaToUsd} from "./utils/misc";


import NavBar from './components/NavBar' ;
import MainContent from './components/MainContent' ;


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: "splash",
            crypto: {
                status: 'loading'
            },
            network: {
                type: "Test Net",
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
        this.loadCrypto() ;
    }

    loadCrypto = () => {
        let self = this ;
        let cryptoState = self.state.crypto ;
        cryptoState.status = 'loading' ;
        self.setState({crypto:cryptoState}, () => {
            cryptoWaitReady().then(() => {
                cryptoState.status = 'ready' ;
                self.setState({crypto: cryptoState}, self.connectNetwork) ;
            }) ;
        }) ;
    }

    connectNetwork = (callback) => {
        let self = this ;
        let networkState = self.state.network ;
        networkState.status = 'connecting' ;
        self.setState({network:networkState}, () => {
            let network = new WikaNetwork(self.state.network.url) ;
            network.connect(() => {
                self.wikaNetwork = network ;
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
            self.wikaNetwork.getBalance(address, (result) => {
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
            <div style={{padding: '0px 40px'}}>
                <AppContext.Provider value={{
                    // Context data
                    tab: this.state.tab,
                    network: this.state.network,
                    account: this.state.account,
                    balance: this.state.balance,
                    // Context functions
                    navigate: this.navigate,
                    selectAccount: this.selectAccount,
                    // Endpoints configuration
                    wikaNetwork: this.wikaNetwork,
                    apiEndpoint: this.state.api
                }}>
                    <NavBar/>
                    <MainContent />
                </AppContext.Provider>
            </div>
        );
    }

}

export default App;
