import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


import AccountSelectMain from './AccountSelectMain' ;
import AccountCreate from './AccountCreate' ;


class AccountSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 'list',
            accounts: null,
            account: 0
        };
    }

    componentDidMount = () => {
        window.BACKGROUND.storage.get('accounts', (accounts) => {
            if (accounts && accounts.length>0) {
                this.setState({accounts:accounts});
            } else {
                this.setState({accounts:[]});
            }
        });
    }

    create = () => {
        this.setState({view:'create'});
    };

    import = () => {
        this.setState({view:'import'});
    };

    selectAccount = (account) => {
        this.setState({account:account});
    };



    renderSwitch = () => {
        if (this.state.view === 'list') {
            return <AccountSelectMain accounts={this.state.accounts}
                                  account={this.state.account}
                                  selectAccount={this.selectAccount}
                                  create={this.create}
                                  import={this.import}/> ;
        } else if (this.state.view === 'create') {
            return <AccountCreate /> ;
        } else {
            return "?";
        }
    }

    render = () => {
        if (this.state.accounts) {
            return this.renderSwitch();
        } else {
            return <CircularProgress /> ;
        }
    }

}

export default AccountSelect;


