import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import AccountList from './AccountList' ;


class AccountSelectMain extends React.Component {

    renderFirstTime = () => {
        return (
            <div>
                <Typography variant='h6'>
                    Set-up your Wika address
                </Typography>
                <Divider sx={{marginBottom:'15px'}} />
                <Typography variant='body1'>
                    Wika Network is built in the Polkadot eco-system.
                    You can <a onClick={this.props.import} href="/#">IMPORT</a> an existing Polkadot address if you already have one,
                    or <a onClick={this.props.create} href="/#">CREATE</a> a new one from scratch.
                </Typography>
            </div>
        );
    }

    renderAccountList = () => {
      return (
        <AccountList accounts={this.props.accounts}
                     account={this.props.account}
                     selectAccount={this.props.selectAccount} />
      );
    }

    renderActions = () => {
        const enableContinue = this.props.accounts.length>0 ;
        return (
            <Container align="right">
                <Button color="secondary"
                        variant="contained"
                        onClick={this.props.import}>
                    Import
                </Button>
                &nbsp;&nbsp;
                <Button color="secondary"
                        variant="contained"
                        onClick={this.props.create}>
                    Create
                </Button>
                &nbsp;&nbsp;
                <Button color="primary"
                        variant="contained"
                        disabled={!enableContinue}
                        onClick={this.props.next}>
                    Continue
                </Button>
            </Container>
        ) ;
    }

    renderSwitch = () => {
        if (this.props.accounts.length>0) {
            return this.renderAccountList();
        } else {
            return this.renderFirstTime();
        }
    }

    render = () => {
        return (
           <div>
                {this.renderSwitch()}
                <br/><br/>
                {this.renderActions()}
            </div>
        );
    }

}

export default AccountSelectMain;


