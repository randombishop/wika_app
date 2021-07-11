import React from 'react';

import AppContext from '../utils/context' ;
import {formatWika} from "../utils/misc";
import Identicon from "@polkadot/react-identicon";



class AccountButton extends React.Component {

    static contextType = AppContext;

    buttonStyle = {
        height: '60px',
        paddingTop: '4px',
        paddingBottom: '4px',
        lineHeight: 'normal'
    }

    renderDisconnected() {
        return (
            <button className="outline secondary" style={this.buttonStyle} onClick={() => this.context.navigate('account_connect')}>
                <span style={{fontSize:'18px'}}>
                    <i className="far fa-user-circle"></i>
                    &nbsp;&nbsp;
                    Connect account
                </span>
                <br/>
                <span style={{fontSize:'10px'}}>
                    (Requires a Polkadot wallet)
                </span>
            </button>
        );
    }

    renderConnected() {
        return (
            <button className="outline secondary" style={this.buttonStyle} onClick={() => this.context.navigate('account_connect')}>
                <div style={{display:'flex'}}>
                    <div style={{marginRight:'15px'}}>
                        <Identicon size={40} value={this.context.account.address}/>
                    </div>
                    <div style={{fontSize:'14px'}}>
                        <div style={{marginBottom:'5px'}}>{this.context.account.name}</div>
                        <div>{formatWika(this.context.balance.wika)}</div>
                    </div>
                </div>
            </button>
        );
    }

    render() {
        if (this.context.account) {
            return this.renderConnected() ;
        } else {
            return this.renderDisconnected() ;
        }
    }

}


export default AccountButton ;



