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
import styled from 'styled-components';

import AppContext from "../utils/context";
import {BodyCopy} from '../styles/textStyle'
// import plus from '../images/plus.svg'
import LikeIcon from '../images/LikeIcon.svg'
import BuyIcon from '../images/BuyIcon.svg'
import SendIcon from '../images/SendIcon.svg'
import ClaimIcon from '../images/ClaimIcon.svg'
import LikeIconSelected from '../images/LikeIconSelected.svg'
import BuyIconSelected from '../images/BuyIconSelected.svg'
import SendIconSelected from '../images/SendIconSelected.svg'
import ClaimIconSelected from '../images/ClaimIconSelected.svg'

class Footer extends React.Component {

    static contextType = AppContext;

    // styleFooter = {
    //     backgroundColor: '#F9F9F9',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     height: '60px',
    //     padding: '10px 50px',
    //     borderTop: '1px dashed lightgray'
    // }

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
            this.navigateAction(value) ;
        }
    }

    toggleMenu = () => {
        let toggle = !this.state.menuOpened ;
        this.setState({menuOpened:toggle}) ;
    }

    navigateAction = (action) => {
        this.setState({menuOpened:false}) ;
        if (this.context.tab != 'landing'){
            this.context.navigate('landing')
        }
        this.context.navigateAction(action);
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
        let actionMap = {
            'like': (this.context.action == 'like') ? LikeIconSelected : LikeIcon,
            'buy': (this.context.action == 'buy') ? BuyIconSelected : BuyIcon,
            'send': (this.context.action == 'send') ? SendIconSelected : SendIcon,
            'more': (this.context.action == 'more') ? ClaimIconSelected : ClaimIcon
        }

        return (
            <NavFooter>
                <NavContainer>
                    <NavIcons>
                        <Icon 
                            src={actionMap['like']}
                            onClick={() => this.buttonClicked('like')}
                        />
                        <Icon 
                            src={actionMap['buy']}
                            onClick={() => this.buttonClicked('buy')}
                        />
                        <Icon 
                            src={actionMap['send']}
                            onClick={() => this.buttonClicked('send')}
                        />
                        <Icon 
                            src={actionMap['more']}
                            onClick={() => this.buttonClicked('more')}
                        />
                    </NavIcons>
                </NavContainer>
            </NavFooter>
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
                if (this.context.tab === 'landing') {

                    return this.renderMainActions() ;
                }
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
        return (
            <div >
                {this.renderSwitch()}
            </div>) ;
    }

}

const NavFooter = styled.div`
  ${BodyCopy};
  background: #F9F9F9;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  position: relative;
`
const NavContainer = styled.div`
  position: absolute;
  background: #F9F9F9;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
const NavIcons = styled.div`
  display:flex;
  max-width: 400px;
  width: 60%;
  justify-content: space-between;
`
const Icon = styled.img`
  &:hover {
    filter: brightness(60%);
  };
  cursor: pointer;
`

export default Footer ;



