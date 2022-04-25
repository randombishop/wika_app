import React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


import AccountListSelection from './AccountListSelection' ;


class AccountConnectSelectLocal extends React.Component {

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
        let address = account.address ;
        let name = account.accountName ;
        let addressRaw = account.addressRaw ;
        let phrase = account.phrase ;
        let data = {
            mode: 'local',
            name: name,
            address: address,
            addressRaw: addressRaw,
            phrase: phrase
        };
        this.props.next(data) ;
    }


    renderAccountList = () => {
      return (
        <AccountListSelection accounts={this.props.accounts}
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
           <div className="main-content">
                <Typography variant="h5">Select your account</Typography>
                <br/><br/>
                {this.renderAccountList()}
                <br/><br/>
                {this.renderActions()}
            </div>
        );
    }

}

export default AccountConnectSelectLocal;


