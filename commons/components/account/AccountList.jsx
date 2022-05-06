import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Identicon from '@polkadot/react-identicon';
import Radio from '@mui/material/Radio';
import ListItemIcon from '@mui/material/ListItemIcon';
import RadioGroup from '@mui/material/RadioGroup';


import {shortenAddress} from '../../utils/misc' ;


class AccountList extends React.Component {

    handleAccountChange = (event) => {
        this.props.selectAccount(event.target.value) ;
    };

    renderAccountItem = (item, index) => {
        let name = "" ;
        if (item.meta) {
            name = item.meta.name;
        } else if (item.accountName) {
            name = item.accountName ;
        }
        return (
            <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Identicon value={item.address} size={40}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={name}
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

    render = () => {
      return (
        <RadioGroup
           name="radio-buttons-group"
           value={this.props.account}
           onChange={this.handleAccountChange}
        >
            <List width="100%">
              <Divider />
              {this.props.accounts.map(this.renderAccountItem)}
            </List>
        </RadioGroup>
      );
    }

}

export default AccountList;


