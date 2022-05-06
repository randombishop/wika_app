import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


import {copyToClipboard} from "../../utils/misc";


class AccountCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: null,
            addressRaw: null,
            phrase: "",
            checkSecretSaved: false
        } ;
    }

    componentDidMount = () => {
        let account = window.BACKGROUND.generateAccount() ;
        this.setState(account) ;
    }

    next = () => {
        this.props.next(this.state.address, this.state.addressRaw, this.state.phrase) ;
    }

    renderNext = () => {
        let enabled = this.state.address && this.state.addressRaw && this.state.phrase && this.state.checkSecretSaved ;
        return (
            <button onClick={this.next} disabled={!enabled}>
                Continue
            </button>
        );
    }

    handleCheckboxChange = () => {
        this.setState({checkSecretSaved: !this.state.checkSecretSaved}) ;
    }

    copySecret = () => {
        copyToClipboard("account_secret_element") ;
    }

    render() {
        return (
            <main>
                <h4>New Wika Network address</h4>
                <label>Your 12-words phrase</label>
                <textarea id="account_secret_element"
                          readOnly={true}
                          value={this.state.phrase} />
                <button onClick={this.copySecret} className="secondary">Copy to clipboard</button>
                <p>
                    Please write down your wallet's mnemonic seed and keep it in a safe place.<br/>
                    The mnemonic can be used to restore your wallet. <br/>
                    Keep it carefully to not lose your assets. <br/>
                    <strong>Never share this phrase with anyone!</strong>
                </p>
                <fieldset>
                    <label>
                        <input type="checkbox"
                               value={this.state.checkSecretSaved}
                               onChange={this.handleCheckboxChange}
                        />
                        I have safely saved my secret phrase.
                    </label>
                </fieldset>
                {this.renderNext()}
            </main>
        );
    }

}

export default AccountCreate;


