import React from 'react';

import AppContext from '../utils/context' ;



class AccountButton extends React.Component {

    static contextType = AppContext;

    buttonStyle = {
        height: '60px',
        paddingTop: '4px',
        paddingBottom: '4px',
        lineHeight: 'normal'
    }

    render() {
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

}


export default AccountButton ;



