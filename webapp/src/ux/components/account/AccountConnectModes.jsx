import React from "react";
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {web3Enable} from '@polkadot/extension-dapp' ;


import AppContext from "../../utils/context";


class AccountConnectModes extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            mode: 'web3',
            web3Data: null,
            wikaData: null
        };
    }

    componentDidMount = () => {
        this.getWeb3Data();
        this.getWikaData() ;
    }

    getWeb3Data = () => {
        this.setState({web3Wallets: null}, () => {
            web3Enable("Wika Network").then((result) => {
                this.setState({web3Data: result});
            });
        });
    }

    getWikaData = () => {
        this.setState({wikaData: null}, () => {
            window.WIKA_BRIDGE.accounts((result) => {
                this.setState({wikaData: result});
                console.log(this.state.wikaData);
            }) ;
        });
    }

    handleModeChange = (event) => {
        this.setState({mode:event.target.value}) ;
    };

    continue = () => {
        const mode = this.state.mode ;
        const data = mode ==='web3' ? this.state.web3Data :  this.state.wikaData ;
        this.props.next(mode, data) ;
    }





    renderRadioChoice = () => {
        return (
            <FormControl>
              <FormLabel id="account-mode-radio-label">Wallet management mode</FormLabel>
              <RadioGroup
                aria-labelledby="account-mode-radio-label"
                name="radio-buttons-group"
                value={this.state.mode}
                onChange={this.handleModeChange}
              >
                <FormControlLabel value="web3" control={<Radio />} label="Web3 wallet (for example polkadot.js)" />
                <FormControlLabel value="wika" control={<Radio />} label="Wika Browser Extension" />
              </RadioGroup>
            </FormControl>
          );
    }

    renderMessage = () => {
        let message = "" ;
        if (this.state.mode==='wika') {
            if (this.state.wikaData && this.state.wikaData.length>0) {
                message = `Wika browser extension detected and accounts are configured.
                           Let's go!`
            } else {
                message = `No Wika Extension accounts detected.
                           Please install it and make sure you have an account already set up.`
            }
        } else if (this.state.mode==='web3') {
            if (this.state.web3Data && this.state.web3Data.length>0) {
                message = `Polkadot wallets detected and authorized with this app.
                           Let's go!`
            } else {
                message = `No Polkadot wallets detected.
                           Please install one and make sure you authorize this app to use it.`
            }
        }
        return (<Typography variant="body1">{message}</Typography>) ;
    }

    renderContinueButton = () => {
        let disabled = true ;
        if (this.state.mode==='web3' && this.state.web3Data && this.state.web3Data.length>0) {
            disabled = false ;
        }
        if (this.state.mode==='wika' && this.state.wikaData && this.state.wikaData.length>0) {
            disabled = false ;
        }
        return (
            <Container align="right">
                <Button variant="contained"
                        disabled={disabled}
                        onClick={this.continue}>
                    Continue
                </Button>
            </Container>
        ) ;
    }

    render = () => {
        return (
            <div>
                {this.renderRadioChoice()}
                <br/><br/>
                {this.renderMessage()}
                <br/><br/>
                {this.renderContinueButton()}
            </div>
         );
    }

}

export default AccountConnectModes;


