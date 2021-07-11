import React from "react";
import {web3Accounts} from '@polkadot/extension-dapp';
import Identicon from '@polkadot/react-identicon';
import {decodeAddress} from '@polkadot/util-crypto';
import {u8aToHex} from '@polkadot/util';


class AccountConnectSelect extends React.Component {

    styleItem = {
        padding: 0,
        margin: "15px"
    }

    styleBox1 = {
        flex: "40px",
        padding: "15px",
    }

    styleBox2 = {
        flex: "100%",
        padding: "15px"
    }

    styleBox3 = {
        flex: '100px',
        display: "flex",
        padding: "15px",
        textAlign: "center",
        alignItems: "center",
        fontSize: "32px"
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

    selectAccount = (account) => () => {
        let address = account.address ;
        let name = account.meta.name ;
        let addressU8 = decodeAddress(address) ;
        let addressRaw = u8aToHex(addressU8) ;
        let data = {
            name: name,
            address: address,
            addressRaw: addressRaw
        }
        alert(JSON.stringify(data)) ;
    }

    renderListAccounts = () => {
        let ans = [] ;
        for (let i in this.state.accounts) {
            let account = this.state.accounts[i] ;
            ans.push(
                <article style={this.styleItem}>
                    <div style={{display:'flex'}}>
                        <div style={this.styleBox1}>
                            <Identicon value={account.address}/>
                        </div>
                        <div style={this.styleBox2}>
                            <strong>{account.meta.name}</strong>
                            <br/>
                            <span style={{fontSize:'12px'}}>{account.address}</span>
                        </div>
                        <div style={this.styleBox3}>
                            <a href="/#" onClick={this.selectAccount(account)}>
                                <i className="fas fa-arrow-alt-circle-right"></i>
                            </a>
                        </div>
                    </div>
                </article>
            ) ;
        }
        return ans ;
    }

    render = () => {
        return (
            <div className="main-content">
                <h5>Select the account to work with</h5>
                {this.renderListAccounts()}
            </div>
        );
    }

}

export default AccountConnectSelect;


