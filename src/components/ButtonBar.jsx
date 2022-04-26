import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import AppContext from "../utils/context";


class ButtonBar extends React.Component {

    static contextType = AppContext;

    styleMenu = {
        position: 'absolute',
        bottom: '85px',
        right: '5px'
    }

    constructor(props) {
        super(props);
        this.state = {
            menuOpened: false,
            activeButton: null
        };
    }

    buttonClicked = (value) => {
        this.setState({activeButton: value}) ;
        if (value==='toggleMenu') {
            this.toggleMenu() ;
        } else {
            this.navigate(value) ;
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

    renderIcon = (label, icon, target) => {
        let color = "default" ;
        if (target === this.state.activeButton) {
            color = "primary" ;
        }
        return (<Grid item xs={3} align="center">
                    <Fab size="small"
                         color={color}
                         aria-label="icon"
                         onClick={() => this.buttonClicked(target)}
                         sx={{fontSize: '18px', marginBottom:'5px'}}>
                        <i className={'far '+icon}></i>
                    </Fab>
                    <br/>
                    <Typography variant="subtitle2" color={color} onClick={() => this.buttonClicked(target)}>
                        {label}
                    </Typography>
                </Grid>);
    }

    render() {
        if (!this.context.account) {
            return "" ;
        }
        return (
            <div className="main-actions">
              <Paper elevation={3} sx={{padding:"5px 50px", paddingTop: '10px', backgroundColor: '#f5f5f5'}}>
                  <Grid container spacing={2}>
                        {this.renderIcon('Like', 'fa-thumbs-up', 'like')}
                        {this.renderIcon('Buy', 'fa-credit-card', 'buy')}
                        {this.renderIcon('Send', 'fa-paper-plane', 'wallet')}
                        {this.renderIcon('More', 'fa-plus-square', 'toggleMenu')}
                  </Grid>
              </Paper>
              {this.renderMenu()}
            </div>
      ) ;
    }

}


export default ButtonBar ;



