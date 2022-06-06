import React from 'react';
import Identicon from "@polkadot/react-identicon";
import styled from 'styled-components';

import AppContext from '../utils/context' ;
import {BodyCopy, Heading2} from '../styles/textStyle'


class AccountButton extends React.Component {

    static contextType = AppContext;

    buttonStyle = {
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#e0f5fd',
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            menuOpened: false
        }
    }

    navigate = (action) => {
        this.setState({menuOpened:false}) ;
        this.context.navigate(action);
    }

    toggleMenu = () => {
        let toggle = !this.state.menuOpened ;
        this.setState({menuOpened:toggle}) ;
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
            );
        } else {
            return "" ;
        }
    }

    renderDisconnected() {
        return (
            <Disconnected>
                <i className="far fa-user-circle"></i>
                <Copy>
                    Connect
                </Copy>
            </Disconnected>
        );
    }

    renderConnected() {
        return (
            <Connected style={{display:'flex', alignItems: 'center'}}>
                <Identicon size={30} value={this.context.account.address}/>
            </Connected>
        );
    }

    renderButtonContent() {
        if (this.context.account) {
            return this.renderConnected() ;
        } else {
            return this.renderDisconnected() ;
        }
    }

    render() {
        return (
            <AccountButtonContainer onClick={() => this.toggleMenu()}>
                {this.renderButtonContent()}
                {this.renderMenu()}
            </AccountButtonContainer>
        );
    }

}

const MenuList = styled.div`
    ${Heading2};
    position: absolute;
    top: 50px;
    right: 20px;
    width: 240px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    ${'' /* border: 2px solid red; */}
`
const MenuItem = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    background: white;
    height: 50px;
    &:hover {
        background-color: #DFE1E5
    }
`
const ListItemIcon = styled.div`
    flex: 1;
    padding: 20px;
`
const ListItemText = styled.div`
    flex: 6;
`


const AccountButtonContainer = styled.div`
    position: relative;
`
const Disconnected = styled.div`
    ${BodyCopy};
    cursor: pointer;
    margin: 6px 20px 6px 6px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    padding: 3px;
    border: 2px solid;
    border-color: #FF9A64;
    border-radius: 6px;
    background-color: #FFFFFF;
    &:hover {
        background-color: #DFE1E5
    }
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
`
const Connected = styled.div`
    ${BodyCopy};
    cursor: pointer;
    margin: 6px 20px 6px 6px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    padding: 3px;
    border: 2px solid;
    border-color: #39FFA0;
    border-radius: 6px;
    background-color: #FFFFFF;
    &:hover {
        background-color: #DFE1E5
    }
`
const Copy = styled.div`
    ${BodyCopy};
    padding: 0 0 0 5px;
`


export default AccountButton ;



