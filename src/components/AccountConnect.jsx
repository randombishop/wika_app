import React from "react";


import AccountConnectEnablingWeb3 from "./AccountConnectEnablingWeb3";


class AccountConnect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {page: 'enable'}
    }

    render = () => {
        switch (this.state.page) {
            case "enable":
                return <AccountConnectEnablingWeb3 />;
            default:
                return "";
        }
    }

}

export default AccountConnect ;


