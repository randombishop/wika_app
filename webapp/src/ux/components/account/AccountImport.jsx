import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';


class AccountImport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountName: "",
            imported: false,
            address: null,
            addressRaw: null,
            phrase: ""
        } ;
    }

    handlePhraseInputChange = (event) => {
        if (!this.state.imported) {
            this.setState({phrase: event.target.value}) ;
        }
    }

    handleAccountNameChange = (event) => {
        this.setState({accountName: event.target.value}) ;
    }

    import = () => {
        let self = this ;
        window.getBackground((BACKGROUND) => {
            try {
                let account = BACKGROUND.importAccount(this.state.phrase) ;
                account.imported = true ;
                self.setState(account) ;
            } catch (e) {
                alert(e)
            }
        }) ;
    }

    clear = () => {
        this.setState({
            imported: false,
            address: null,
            addressRaw: null,
            phrase: ""
        }) ;
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

    render2() {
        if (this.state.imported) {
            return (
                <React.Fragment>
                    <TextField
                        label="Account name"
                        variant="outlined"
                        fullWidth={true}
                        value={this.state.accountName}
                        onChange={this.handleAccountNameChange}
                    />

                    <br/><br/>

                    <TextField
                        label="Public Address"
                        variant="outlined"
                        fullWidth={true}
                        value={this.state.address}
                        readOnly={true}
                    />

                    <br/><br/>

                    <Container align="right">
                        <Button color="secondary"
                            variant="contained"
                            onClick={this.props.back}>
                            Back
                        </Button>
                        &nbsp;&nbsp;
                        <Button color="secondary"
                            variant="contained"
                            onClick={this.clear}>
                            Clear
                        </Button>
                        &nbsp;&nbsp;
                        <Button color="primary"
                                variant="contained"
                                onClick={this.next}>
                            Continue
                        </Button>
                    </Container>

                </React.Fragment>
            ) ;
        } else {
            return (
                <Container align="right">
                    <Button color="secondary"
                            variant="contained"
                            onClick={this.props.back}>
                            Back
                    </Button>
                    &nbsp;&nbsp;
                    <Button color="primary"
                            variant="contained"
                            onClick={this.import}>
                       Import
                    </Button>
                </Container>
            );
        }
    }

    render() {
        return (
            <div>

                <Typography variant='h6'>
                    Import your existing address
                </Typography>

                <Divider/><br/><br/>

                <TextField
                    id="account_secret_element"
                    label="Your 12-words phras"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.phrase}
                    onChange={this.handlePhraseInputChange}
                    readOnly={this.state.imported}
                />

                <br/><br/>

                {this.render2()}

            </div>
        );
    }

}

export default AccountImport;


