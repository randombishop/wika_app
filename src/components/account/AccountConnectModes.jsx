import React from "react";
import {web3Enable} from '@polkadot/extension-dapp';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


class AccountConnectModes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wallets: null,
            mode: 'web3'
        };
    }

    componentDidMount = () => {
        this.enableWeb3();
    }

    enableWeb3 = () => {
        this.setState({wallets: null}, () => {
            web3Enable("Wika Network").then((result) => {
                this.setState({wallets: result});
            });
        });
    }

    handleModeChange = (event) => {
        this.setState({mode:event.target.value}) ;
    };

    continue = () => {
        this.props.next(this.state.mode, this.state.wallets) ;
    }

    renderSwitch = () => {
        if (!this.state.wallets) {
            return this.renderWait();
        } else {
            return (
                <React.Fragment>
                    {this.renderRadioChoice()}
                    <br/><br/>
                    {this.renderMessage()}
                    <br/><br/>
                    {this.renderContinueButton()}
                </React.Fragment>
             );
        }
    }

    renderWait = () => {
        return (
            <Typography variant="body1">
                <i className="fas fa-spinner"></i>
                &nbsp;&nbsp;
                Checking availability of Web3 wallets...
            </Typography>
        );
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
                <FormControlLabel value="local" control={<Radio />} label="Local storage of this browser" />
              </RadioGroup>
            </FormControl>
          );
    }

    renderMessage = () => {
        let message = "" ;
        if (this.state.mode==='local') {
            message = `This will store the private keys in the local storage of the browser, protected by a password.
                       Your password can't be retrieved if lost. Make sure to save it to safety.`
        } else {
            if (this.state.wallets.length === 0) {
                message = `No Polkadot wallets detected.
                           Please install one and make sure you authorize this app to use it.`
            } else {
                message = `Polkadot wallets detected and authorized with this app.
                           Let's go!`
            }
        }
        return (<Typography variant="body1">{message}</Typography>) ;
    }

    renderContinueButton = () => {
        let disabled = false ;
        if (this.state.mode==='web3' && this.state.wallets.length === 0) {
            disabled = true ;
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
            <div className="main-content">
                <Typography variant="h5">Connect your account</Typography>
                <br/>
                {this.renderSwitch()}
            </div>
        );
    }

}

export default AccountConnectModes;


