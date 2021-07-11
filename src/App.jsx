import React from "react";
import {cryptoWaitReady} from '@polkadot/util-crypto';

import WikaNetwork from './utils/network' ;
import AppContext from './utils/context' ;
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
            account: null
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
                self.setState({network:networkState}) ;
            }) ;
        }) ;
    }

    selectAccount = (account) => {
        this.setState({account: account}) ;
    }

    navigate = (tab) => {
        this.setState({tab: tab});
    }

    render() {
        return (
            <div style={{padding: '0px 40px'}}>
                <AppContext.Provider value={{
                    // Context data
                    tab: this.state.tab,
                    network: this.state.network,
                    account: this.state.account,
                    // Context functions
                    navigate: this.navigate,
                    selectAccount: this.selectAccount
                }}>
                    <NavBar/>
                    <MainContent />
                </AppContext.Provider>
            </div>
        );
    }

}

export default App;
