import React from "react";
import Identicon from '@polkadot/react-identicon';


import AppContext from "../../utils/context";
import {copyToClipboard, formatWika, formatUsd} from "../../utils/misc";


class Account extends React.Component {

    static contextType = AppContext;

    styleInputBox = {
        fontSize: '16px',
        textAlign: 'center'
    } ;

    copyElement = (element) => () => {
        copyToClipboard(element) ;
    }

    disconnect = () => {
        this.context.selectAccount(null) ;
    }

    render = () => {
        return (
            <div className="main-content">
                <h5>Account</h5>

                <div style={{textAlign:'center', marginBottom:'35px'}}>
                    <Identicon value={this.context.account.address}/>
                    <br/>
                    <strong>{this.context.account.name}</strong>
                </div>

                <strong>Balance</strong>
                <div style={{display: 'flex'}}>
                    <div style={{flex: '50%', marginRight: '10px'}}>
                        <input type="text"
                               value={formatWika(this.context.balance.wika)}
                               readOnly={true}
                               style={{textAlign: 'right'}}
                        />
                    </div>
                    <div style={{flex: '50%', marginLeft: '10px'}}>
                        <input type="text"
                               value={formatUsd(this.context.balance.usd)}
                               readOnly={true}
                               style={{textAlign: 'right'}}
                        />
                    </div>
                </div>

                <strong>
                    Public Address (Substrate format)
                    &nbsp;&nbsp;
                    <a href="/#" onClick={this.copyElement("account_address_element")}>
                        <i className="far fa-copy"></i>
                    </a>
                </strong>
                <input id="account_address_element"
                       type="text"
                       value={this.context.account.address}
                       readOnly={true}
                       style={this.styleInputBox}
                />

                <strong>
                    Public Address (Raw hex format)
                    &nbsp;&nbsp;
                    <a href="/#" onClick={this.copyElement("account_address_raw_element")}>
                        <i className="far fa-copy"></i>
                    </a>
                </strong>
                <input id="account_address_raw_element"
                       type="text"
                       value={this.context.account.addressRaw}
                       readOnly={true}
                       style={this.styleInputBox}
                />

                <button onClick={this.disconnect} className="contrast">
                    Disconnect this account
                    &nbsp;&nbsp;&nbsp;
                    <i className="fas fa-sign-out-alt"></i>
                </button>

            </div>
        );
    }

}

export default Account;


