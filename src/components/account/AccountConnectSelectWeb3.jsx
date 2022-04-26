import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {web3Accounts} from '@polkadot/extension-dapp';
import {decodeAddress} from '@polkadot/util-crypto';
import {u8aToHex} from '@polkadot/util';


import AccountListSelection from './AccountListSelection' ;


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

    selectAccount = (account) => {
        this.setState({account:account}) ;
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
            mode: 'web3',
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

    renderAccountList = () => {
      return (
        <AccountListSelection accounts={this.state.accounts}
                              account={this.state.account}
                              selectAccount={this.selectAccount} />
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
           <div>
                {this.renderSelectProvider()}
                {this.renderAccountList()}
                <br/><br/>
                {this.renderActions()}
            </div>
        );
    }

}

export default AccountConnectSelectWeb3;


