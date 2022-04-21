import React from "react";


import AppContext from "../../utils/context";


import AccountConnectModes from "./AccountConnectModes";
import AccountConnectSelect from "./AccountConnectSelect";
import Account from "./Account";



class AccountConnect extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedMode: null
        }
    }

    web3Enabled = () => {
        this.setState({web3Enabled: true}) ;
    }

    render = () => {
        if (this.context.account) {
            return <Account /> ;
        } else {
            if (this.state.selectedMode==null) {
                return <AccountConnectModes /> ;
            } else {
                return "" ;
            }
        }
    }

}

export default AccountConnect ;


