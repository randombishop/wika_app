import React from "react";
import {web3Accounts, web3Enable} from '@polkadot/extension-dapp';


class AccountConnectSelect extends React.Component {

    itemStyle = {
        padding: "10px",
        margin: "15px"
    }

    constructor(props) {
        super(props);
        this.state = {accounts: []};
    }

    componentDidMount = () => {
        this.getAccounts();
    }

    getAccounts = () => {
        this.setState({accounts: []}, () => {
            web3Accounts().then((result) => {
                this.setState({accounts: result});
            });
        });
    }

    render = () => {
        return (
            <div className="main-content">
                <h5>Select the account to work with</h5>
                <article style={this.itemStyle}>bla bla bla 1</article>
                <article style={this.itemStyle}>bla bla bla 2</article>
                {JSON.stringify(this.state.accounts)}
            </div>
        );
    }

}

export default AccountConnectSelect;


