import React from 'react';
import Identicon from "@polkadot/react-identicon";
import Fab from '@mui/material/Fab';


import AppContext from '../utils/context' ;


class AccountButton extends React.Component {

    static contextType = AppContext;



    renderDisconnected() {
        return (
            <Fab size="small" color="default"
                 onClick={() => this.context.navigate('account')}
                 sx={{fontSize: '24px'}}>
                <i className="far fa-user-circle"></i>
            </Fab>
        );
    }

    renderConnected() {
        return (
            <Fab size="small" color="default"
                 onClick={() => this.context.navigate('account')}>
                <Identicon size={24} value={this.context.account.address}/>
            </Fab>
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



