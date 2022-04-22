import React from "react";


import AppContext from "../../utils/context";


import AccountConnectModes from "./AccountConnectModes";
import AccountConnectSelectWeb3 from "./AccountConnectSelectWeb3";
import Account from "./Account";



class AccountConnect extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedMode: null
        }
    }

    cancelMode = () => {
        this.setState({selectedMode: null}) ;
    }

    selectMode = (mode, wallets) => {
        this.setState({
            selectedMode: mode,
            wallets: wallets
        }) ;
    }

    selectWeb3Account = (account) => {
        this.context.selectAccount(account) ;
    }

    render = () => {
        if (this.context.account) {
            return <Account /> ;
        } else {
            if (!this.state.selectedMode) {
                return <AccountConnectModes next={this.selectMode} /> ;
            } else {
                if (this.state.selectedMode==='web3') {
                    return <AccountConnectSelectWeb3 providers={this.state.wallets}
                                back={this.cancelMode}
                                next={this.selectWeb3Account}
                           /> ;
                } else {
                    return "" ;
                }
            }
        }
    }

}

export default AccountConnect ;


