import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import {copyToClipboard} from "../../utils/misc";


class AccountCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            address: null,
            addressRaw: null,
            phrase: "",
            checkSecretSaved: false
        } ;
    }

    componentDidMount = () => {
        let account = window.BACKGROUND.generateAccount() ;
        console.log('newAccount', account) ;
        this.setState(account) ;
    }

    handleAccountNameChange = (event) => {
        this.setState({accountName: event.target.value}) ;
    }

    handleCheckboxChange = () => {
        this.setState({checkSecretSaved: !this.state.checkSecretSaved}) ;
    }

    copySecret = () => {
        copyToClipboard("account_secret_element") ;
    }

    next = () => {
        const account = {
            name: this.state.accountName,
            address: this.state.address,
            addressRaw: this.state.addressRaw,
            phrase: this.state.phrase
        }
        this.props.next(account) ;
    }





    renderNext = () => {
        let enabled = this.state.address && this.state.addressRaw && this.state.phrase && this.state.checkSecretSaved ;
        return (<Container align="right">
                    <Button color="secondary"
                        variant="contained"
                        onClick={this.props.back}>
                        Back
                    </Button>
                    &nbsp;&nbsp;
                    <Button color="primary"
                            variant="contained"
                            onClick={this.next}
                            disabled={!enabled}>
                        Continue
                    </Button>
                </Container>);
    }

    renderCopyButtonAdornment = () => {
        return (
            <InputAdornment position="end">
                <Button onClick={this.copySecret} variant="contained" color="secondary"><i className="fas fa-copy"></i></Button>
            </InputAdornment>
        ) ;
    }

    render() {
        let copyButtonAdorn = {endAdornment: this.renderCopyButtonAdornment()} ;
        return (
            <div>

                <Typography variant='h6'>
                    Create a new Wika address
                </Typography>

                <Divider/><br/><br/>

                <TextField
                    label="Account name"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.accountName}
                    onChange={this.handleAccountNameChange}
                />

                <br/><br/>

                <TextField
                    id="account_secret_element"
                    label="Your 12-words phrase"
                    variant="outlined"
                    readOnly={true}
                    fullWidth={true}
                    value={this.state.phrase}
                    InputProps={copyButtonAdorn} />

                <br/><br/>

                <Typography variant='body2'>
                    <strong><i className="fas fa-exclamation-circle"></i> Never share this phrase with anyone!</strong>
                    <br/>
                    The 12-words phrase can be used to restore your wallet. Write it down and keep it in a safe place.
                    <br/>
                    <strong>Loose your secret = loose your wallet!</strong>
                </Typography>

                <br/><br/>

                <FormGroup>
                  <FormControlLabel control={<Checkbox  value={this.state.checkSecretSaved}
                                                        onChange={this.handleCheckboxChange}/>}
                                    label="I have safely saved my secret phrase." />
                </FormGroup>

                <br/><br/>

                {this.renderNext()}

            </div>
        );
    }

}

export default AccountCreate;


