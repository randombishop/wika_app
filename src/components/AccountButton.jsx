import React from 'react';
import Identicon from "@polkadot/react-identicon";


import AppContext from '../utils/context' ;
import {formatWika} from "../utils/misc";



class AccountButton extends React.Component {

    static contextType = AppContext;

    buttonStyle = {
        height: '45px',
        padding: '2px 10px',
        backgroundColor: 'rgb(80 80 80)'
    }

    renderDisconnected() {
        return (
            <button style={this.buttonStyle} onClick={() => this.context.navigate('account')}>
                <span style={{color: 'lightgray', fontSize:'18px'}}>
                    <i className="far fa-user-circle"></i>
                    &nbsp;&nbsp;
                    Connect account
                </span>
            </button>
        );
    }

    renderConnected() {
        return (
            <button className="outline secondary" style={this.buttonStyle} onClick={() => this.context.navigate('account')}>
                <div style={{display:'flex'}}>
                    <div style={{marginRight:'15px'}}>
                        <Identicon size={40} value={this.context.account.address}/>
                    </div>
                    <div style={{color: 'lightgray', fontSize:'14px'}}>
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



