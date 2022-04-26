import React from 'react';
import Identicon from "@polkadot/react-identicon";
import Fab from '@mui/material/Fab';


import AppContext from '../utils/context' ;
import {formatWika} from "../utils/misc";


class AccountButton extends React.Component {

    static contextType = AppContext;



    renderDisconnected() {
        return (
            <span>
                <i className="far fa-user-circle"></i>
                &nbsp;
                Connect
            </span>
        );
    }

    renderConnected() {
        return (
            <div style={{display:'flex', alignItems: 'center'}}>
                <Identicon size={30} value={this.context.account.address}/>
                <div style={{marginLeft:'10px'}}>{formatWika(this.context.balance.wika)}</div>
            </div>
        );
    }

    renderButtonContent() {
        if (this.context.account) {
            return this.renderConnected() ;
        } else {
            return this.renderDisconnected() ;
        }
    }

    render() {
        return (
            <Fab size="small" variant="extended" color="default"
                 sx={{marginTop:'3px'}}
                 onClick={() => this.context.navigate('account')}>
                {this.renderButtonContent()}
            </Fab>
        );
    }

}


export default AccountButton ;



