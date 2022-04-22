import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {web3Accounts} from '@polkadot/extension-dapp';
import Identicon from '@polkadot/react-identicon';
import {decodeAddress} from '@polkadot/util-crypto';
import {u8aToHex} from '@polkadot/util';
import Radio from '@mui/material/Radio';
import ListItemIcon from '@mui/material/ListItemIcon';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


import {shortenAddress} from '../../utils/misc' ;


class AccountConnectSelectWeb3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            provider: 0,
            accounts: [],
            account: 0
        };
    }

    componentDidMount = () => {
        this.getAccounts();
    }

    getAccounts = () => {
        this.setState({accounts: []}, () => {
            web3Accounts().then((result) => {
                this.setState({accounts: result});
            });
        });
    }

    handleProviderChange = (event) => {
        this.setState({provider:event.target.value}) ;
    };

    handleAccountChange = (event) => {
        this.setState({account:event.target.value}) ;
    };

    back = () => {
        this.props.back() ;
    }

    continue = () => {
        let account = this.state.accounts[this.state.account] ;
        let address = account.address ;
        let name = account.meta.name ;
        let source = account.meta.source ;
        let addressU8 = decodeAddress(address) ;
        let addressRaw = u8aToHex(addressU8) ;
        let data = {
            name: name,
            address: address,
            addressRaw: addressRaw,
            source: source
        };
        this.props.next(data) ;
    }


    renderProviderItem = (item, index) => {
        return <MenuItem key={index} value={index}>{item.name + ' ('  + item.version + ')'}</MenuItem>
    }

    renderSelectProvider = () => {
        return (
            <Box width="100%">
              <FormControl fullWidth>
                <InputLabel id="select-web3-provider-label">Web3 Provider</InputLabel>
                <Select
                  labelId="select-web3-provider-label"
                  label="Web3 Provider"
                  value={this.state.provider}
                  onChange={this.handleProviderChange}
                >
                  {this.props.providers.map(this.renderProviderItem)}
                </Select>
              </FormControl>
            </Box>
        );
    }

    renderAccountItem = (item, index) => {
        return (
            <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Identicon value={item.address} size={40}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.meta.name}
                      secondary={shortenAddress(item.address)}
                    />
                    <ListItemIcon>
                        <Radio value={index} />
                    </ListItemIcon>
                </ListItem>
                <Divider />
            </React.Fragment>
        ) ;
    }

    renderAccountList = () => {
      return (
        <RadioGroup
           name="radio-buttons-group"
           value={this.state.account}
           onChange={this.handleAccountChange}
        >
            <List width="100%">
              <Divider />
              {this.state.accounts.map(this.renderAccountItem)}
            </List>
        </RadioGroup>
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
                {this.renderSelectProvider()}
                {this.renderAccountList()}
                <br/><br/>
                {this.renderActions()}
            </div>
        );
    }

}

export default AccountConnectSelectWeb3;


