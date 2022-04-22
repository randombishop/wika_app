import React from 'react';
import Identicon from "@polkadot/react-identicon";
import Button from '@mui/material/Button';

import AppContext from '../utils/context' ;
import {formatWika} from "../utils/misc";



class AccountButton extends React.Component {

    static contextType = AppContext;



    renderDisconnected() {
        return (
            <Button color="primary" variant="contained"
                    onClick={() => this.context.navigate('account')}>
                <i className="far fa-user-circle"></i>
                &nbsp;&nbsp;
                Connect account
            </Button>
        );
    }

    renderConnected() {
        return (
            <Button color="primary" variant="contained"
                    onClick={() => this.context.navigate('account')}>
                <Identicon size={24} value={this.context.account.address}/>
                &nbsp;&nbsp;
                {formatWika(this.context.balance.wika)}
            </Button>
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



