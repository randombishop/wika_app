import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


import AppContext from "../../utils/context";
import AccountSelectMain from './AccountSelectMain' ;
import AccountCreate from './AccountCreate' ;
import AccountImport from './AccountImport' ;


class AccountSelect extends React.Component {

    static contextType = AppContext;

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

    list = () => {
        this.setState({view:'list'});
    }

    create = () => {
        this.setState({view:'create'});
    };

    import = () => {
        this.setState({view:'import'});
    };

    addAccount = (account) => {
        let accounts = this.state.accounts ;
        if (!accounts) {
            accounts = [] ;
        }
        accounts.push(account) ;
        this.setState({view:'list', accounts:accounts});
    }

    selectAccount = (account) => {
        this.setState({account:account});
    };

    done = () => {
        let accounts = this.state.accounts ;
        let account = accounts[this.state.account] ;
        console.log('done with account selection', account) ;
        this.context.selectAccount(account) ;
    }



    renderList = () => {
        return <AccountSelectMain accounts={this.state.accounts}
                                  account={this.state.account}
                                  selectAccount={this.selectAccount}
                                  create={this.create}
                                  import={this.import}
                                  next={this.done} /> ;
    }

    renderCreate = () => {
        return <AccountCreate next={this.addAccount}
                              back={this.list}  /> ;
    }

    renderImport = () => {
        return <AccountImport next={this.addAccount}
                              back={this.list}  /> ;
    }

    renderSwitch = () => {
        switch (this.state.view) {
            case 'list': return this.renderList() ;
            case 'create': return this.renderCreate() ;
            case 'import': return this.renderImport() ;
            default: return "?" ;
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


