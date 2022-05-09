import React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';



import {copyToClipboard} from "../../utils/misc";


class Keccak extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            text:"",
            hash:""
        }
    }

    updateText = (event) => {
        this.setState({text:event.target.value}) ;
    }

    generateHash = () => {
        let text = this.state.text ;
        let hash = window.BACKGROUND.keccakAsHex(text) ;
        console.log('generateHash: ' + text + ' -> ' + hash) ;
        this.setState({
            hash:hash
        }) ;
    }

    copy = () => {
        copyToClipboard("keccak_hash_element") ;
    }

    renderInputAdornment = () => {
        return (
            <InputAdornment position="end">
                <Button onClick={this.generateHash} variant="contained" color="primary">Hash</Button>
            </InputAdornment>
        ) ;
    }

    render() {
        let inputProps = {endAdornment: this.renderInputAdornment()} ;
        return (
            <div>
                <TextField
                    id="input-text-to-kekkak"
                    label="Text"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.text}
                    onChange={this.updateText}
                    InputProps={inputProps} />
                <br/> <br/>
                <TextField
                    id="keccak_hash_element"
                    label="Hash"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.hash}
                    readOnly={true} />
                <br/>
                <br/>
                <Container align="right">
                        <Button variant="contained" color="primary"
                             onClick={this.copy}>
                            Copy to clipboard
                        </Button>
                </Container>
            </div>
        );
    }

}


export default Keccak ;

