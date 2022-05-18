import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


import AccountList from './AccountList' ;


class AccountConnectWika extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: 0
        };
    }

    selectAccount = (account) => {
        this.setState({account:account}) ;
    };

    back = () => {
        this.props.back() ;
    }

    continue = () => {
        let account = this.props.accounts[this.state.account] ;
        let data = {
            mode: 'wika',
            name: account.name ,
            address: account.address,
            addressRaw: account.addressRaw
        };
        this.props.next(data) ;
    }




    renderAccountList = () => {
      return (
        <AccountList accounts={this.props.accounts}
                     account={this.state.account}
                     selectAccount={this.selectAccount} />
      );
    }

    renderActions = () => {
        return (
            <Container align="right">
                <Button color="secondary"
                        variant="contained"
                        onClick={this.back}>
                    Back
                </Button>
                &nbsp;&nbsp;
                <Button color="primary"
                        variant="contained"
                        onClick={this.continue}>
                    Continue
                </Button>
            </Container>
        ) ;
    }

    render = () => {
        return (
           <div>
                {this.renderAccountList()}
                <br/><br/>
                {this.renderActions()}
            </div>
        );
    }

}

export default AccountConnectWika;


