import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


import {copyToClipboard} from "../../utils/misc";


class AccountImport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imported: false,
            address: null,
            addressRaw: null,
            phrase: ""
        } ;
    }

    handleInputChange = (event) => {
        this.setState({phrase: event.target.value}) ;
    }

    import = () => {
        try {
            let account = window.BACKGROUND.importAccount(this.state.phrase) ;
            account.imported = true ;
            this.setState(account) ;
        } catch (e) {
            alert(e)
        }
    }

    back = () => {
        this.setState({
            imported: false,
            address: null,
            addressRaw: null,
            phrase: ""
        }) ;
    }

    next = () => {
        this.props.next(this.state.address, this.state.addressRaw, this.state.phrase) ;
    }

    render2() {
        if (this.state.imported) {
            return (
                <React.Fragment>
                    <br/>
                    <label>Public Address</label>
                    <input type="text"
                           value={this.state.address}
                           readOnly={true}

                    />
                    <div style={{display:'flex'}}>
                        <div style={{flex: '50%', paddingRight:'10px'}}>
                            <button className="secondary" onClick={this.back}>Clear</button>
                        </div>
                        <div style={{flex: '50%', paddingLeft:'10px'}}>
                            <button className="primary" onClick={this.next}>Continue</button>
                        </div>
                    </div>
                </React.Fragment>
            ) ;
        } else {
            return (
                <button onClick={this.import} className="secondary">Import</button>
            );
        }
    }

    render() {
        return (
            <main>
                <h4>Import your address</h4>
                <label>Your 12-words phrase</label>
                <textarea id="account_secret_element"
                          value={this.state.phrase}
                          onChange={this.handleInputChange}
                          readOnly={this.state.imported}
                />
                {this.render2()}
            </main>
        );
    }

}

export default AccountImport;


