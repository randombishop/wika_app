import React from "react";


import AppContext from "../../utils/context";


import AccountConnectEnablingWeb3 from "./AccountConnectEnablingWeb3";
import AccountConnectSelect from "./AccountConnectSelect";
import Account from "./Account";



class AccountConnect extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            web3Enabled: false
        }
    }

    web3Enabled = () => {
        this.setState({web3Enabled: true}) ;
    }

    render = () => {
        if (this.context.account) {
            return <Account /> ;
        } else {
            if (this.state.web3Enabled) {
                return <AccountConnectSelect /> ;
            } else {
                return <AccountConnectEnablingWeb3 next={this.web3Enabled}/> ;
            }
        }
    }

}

export default AccountConnect ;


