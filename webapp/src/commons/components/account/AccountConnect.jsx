import React from "react";


import AppContext from "../../utils/context";
import AccountConnectModes from "./AccountConnectModes";
import AccountConnectWeb3 from "./AccountConnectWeb3";
import AccountConnectWika from "./AccountConnectWika";
import Account from "./Account";



class AccountConnect extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedMode: null,
            data: null,
        }
    }

    cancelMode = () => {
        this.setState({selectedMode: null}) ;
    }

    selectMode = (mode, data) => {
        this.setState({
            selectedMode: mode,
            data: data
        }) ;
    }

    selectAccount = (account) => {
        //alert(JSON.stringify(account)) ;
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
                    return <AccountConnectWeb3 providers={this.state.data}
                                back={this.cancelMode}
                                next={this.selectAccount}
                           /> ;
                } else {
                    return <AccountConnectWika accounts={this.state.data}
                                back={this.cancelMode}
                                next={this.selectAccount}
                           /> ;
                }
            }
        }
    }

}

export default AccountConnect ;


