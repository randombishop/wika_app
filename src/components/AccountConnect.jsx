import React from "react";


import AccountConnectEnablingWeb3 from "./AccountConnectEnablingWeb3";
import AccountConnectSelect from "./AccountConnectSelect";


class AccountConnect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {page: 'enable'}
    }

    setPage = (page) => () => {
        this.setState({page: page}) ;
    }

    render = () => {
        switch (this.state.page) {
            case "enable":
                return <AccountConnectEnablingWeb3 next={this.setPage('select')}/> ;
            case "select":
                return <AccountConnectSelect next={this.setPage('account')}/> ;
            default:
                return "";
        }
    }

}

export default AccountConnect ;


