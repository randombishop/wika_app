import React from "react";
import Identicon from '@polkadot/react-identicon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


import AppContext from "../../utils/context";
import {copyToClipboard, formatWika, formatUsd} from "../../utils/misc";


class AccountInfo extends React.Component {

    static contextType = AppContext;

    copyElement = (element) => () => {
        copyToClipboard(element) ;
    }

    disconnect = () => {
        this.context.selectAccount(null) ;
    }


    renderAccountBox = () => {
        let name = this.context.account.name ;
        let address = this.context.account.address ;
        return (
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Identicon value={address} size={40}/>
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={formatWika(this.context.balance.wika) + ' / ' + formatUsd(this.context.balance.usd)}
                />
            </ListItem>
        ) ;
    }

    renderAddressBox = (id, label, value) => {
        return (
            <TextField
                id={id}
                label={label}
                variant="outlined"
                fullWidth={true}
                readOnly={true}
                value={value}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <a href="/#" onClick={this.copyElement(id)}>
                            <i className="far fa-copy"></i>
                        </a>
                    </InputAdornment>
                  ),
                }}
              />
        ) ;
    }

    renderDisconnectButton = () => {
        return (
            <Container sx={{textAlign:'center'}}>
                <Button variant="outlined" onClick={this.disconnect}>
                    Disconnect this account
                    &nbsp;&nbsp;&nbsp;
                    <i className="fas fa-sign-out-alt"></i>
                </Button>
            </Container>) ;
    }

    renderDebug = () => {
        return (<div>
                    {JSON.stringify(this.context.account)}
                </div>) ;
    }

    renderInfo = () => {
        return (
            <div>
                {this.renderAccountBox()}
                <br/><br/>
                {this.renderAddressBox("account_address_substrate_element",
                                       "Address in Substrate format",
                                       this.context.account.address)}
                <br/><br/>
                {this.renderAddressBox("account_address_raw_element",
                                       "Address in raw format",
                                       this.context.account.addressRaw)}
                <br/><br/>
                {this.renderDisconnectButton()}
            </div>);
    }

    render = () => {
        return this.renderInfo() ;
    }

}

export default AccountInfo;

