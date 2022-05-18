import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import AppContext from "../utils/context";


class Footer extends React.Component {

    static contextType = AppContext;

    styleFooter = {
        backgroundColor: '#F9F9F9',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        padding: '10px 50px',
        borderTop: '1px dashed lightgray'
    }

    styleMenu = {
        position: 'absolute',
        bottom: '85px',
        right: '5px'
    }

    constructor(props) {
        super(props);
        this.state = {
            menuOpened: false,
        };
    }

    buttonClicked = (value) => {
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
        if (target === this.context.tab) {
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

    renderAccountButton() {
        return (
            <Container align="center" sx={{paddingTop:'7px'}}>
                <Fab variant="extended" color="primary"
                     onClick={() => this.context.navigate('account')}>
                    Connect your account
                </Fab>
            </Container>
        ) ;
    }

    renderMainActions() {
        return (
            <React.Fragment>
              <Grid container spacing={2}>
                {this.renderIcon('Like', 'fa-thumbs-up', 'like')}
                {this.renderIcon('Buy', 'fa-credit-card', 'buy')}
                {this.renderIcon('Send', 'fa-paper-plane', 'wallet')}
                {this.renderIcon('More', 'fa-plus-square', 'toggleMenu')}
              </Grid>
              {this.renderMenu()}
            </React.Fragment>
        ) ;
    }

    renderTransactionButtons() {
        if (this.context.transactionSent) {
            return (
                <Container sx={{paddingTop:'7px'}} align="center">
                    <CircularProgress />
                </Container>
            ) ;
        } else {
            return (
                <Container align="center" sx={{paddingTop:'7px'}}>
                    <Fab variant="extended" color="secondary"
                         onClick={this.context.rejectTransaction}>
                        Reject
                    </Fab>
                    &nbsp;&nbsp;
                    <Fab variant="extended" color="primary"
                         onClick={this.context.confirmTransaction}>
                        Confirm
                    </Fab>
                </Container>
            ) ;
        }
    }

    renderSwitch() {
        if (this.context.account) {
            if (this.context.tab !== 'sign_transaction') {
                return this.renderMainActions() ;
            } else {
                return this.renderTransactionButtons() ;
            }
        } else {
            if (this.context.tab !== 'account') {
                return this.renderAccountButton() ;
            } else {
                return "" ;
            }
        }
    }

    render() {
        return (<div style={this.styleFooter}>
                    {this.renderSwitch()}
                </div>) ;
    }

}


export default Footer ;



