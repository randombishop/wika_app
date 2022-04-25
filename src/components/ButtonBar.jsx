import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import AppContext from "../utils/context";


class ButtonBar extends React.Component {

    static contextType = AppContext;

    styleMenu = {
        position: 'absolute',
        bottom: '5px',
        right: '5px'
    }

    constructor(props) {
        super(props);
        this.state = {
            menuOpened: false,
            activeButton: null
        };
    }

    buttonClicked = (event, newValue) => {
        this.setState({activeButton: newValue}) ;
        if (newValue==='toggleMenu') {
            this.toggleMenu() ;
        } else {
            this.navigate(newValue) ;
        }
    }

    toggleMenu = () => {
        let toggle = !this.state.menuOpened ;
        this.setState({menuOpened:toggle}) ;
    }

    navigate = (tab) => {
        this.setState({menuOpened:false}) ;
        this.context.navigate(tab);
    }




    renderMenuItem = (icon, text, target) => {
        return (
            <MenuItem onClick={() => this.navigate(target)}>
              <ListItemIcon>
                <i className={'far '+icon}></i>
              </ListItemIcon>
              <ListItemText>
                {text}
              </ListItemText>
            </MenuItem>
        ) ;
    }

    renderMenu = () => {
        if (this.state.menuOpened) {
            return (
                <Paper style={this.styleMenu}>
                    <MenuList>
                        {this.renderMenuItem('fa-user', 'Account', 'account')}
                        {this.renderMenuItem('fa-heart', 'Liked pages', 'liked_pages')}
                        {this.renderMenuItem('fa-bookmark', 'Owned pages', 'owned_pages')}
                        {this.renderMenuItem('fa-registered', 'Claim page ownership', 'claim_page')}
                        {this.renderMenuItem('fa-file-code', 'Keccak 256', 'keccak')}
                        {this.renderMenuItem('fa-handshake', 'Blockchains', 'blockchains')}
                        {this.renderMenuItem('fa-save', 'Settings', 'settings')}
                        {this.renderMenuItem('fa-gem', 'About', 'about')}
                    </MenuList>
                </Paper>
            );
        } else {
            return "" ;
        }
    }

    renderIcon = (icon) => {
        return (<i style={{marginBottom:'5px'}} className={'far '+icon}></i>);
    }

    render() {
        if (!this.context.account) {
            return "" ;
        }
        return (
            <div className="main-actions">
              <Paper elevation={3} >
                  <BottomNavigation showLabels={true}
                                    value={this.state.activeButton}
                                    onChange={this.buttonClicked}>
                    <BottomNavigationAction label="Like" value="like" icon={this.renderIcon('fa-thumbs-up')} />
                    <BottomNavigationAction label="Buy"  value="buy" icon={this.renderIcon('fa-credit-card')} />
                    <BottomNavigationAction label="Send" value="wallet" icon={this.renderIcon('fa-paper-plane')} />
                    <BottomNavigationAction label="More" value="toggleMenu" icon={this.renderIcon('fa-plus-square')} />
                  </BottomNavigation>
              </Paper>
              {this.renderMenu()}
            </div>
      ) ;
    }

}


export default ButtonBar ;



