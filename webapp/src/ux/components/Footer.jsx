import React from 'react';

import AppContext from "../utils/context";
import styled from 'styled-components';
import {BodyCopy} from '../styles/textStyle';
import LikeIcon from '../images/footerIcons/LikeIcon.svg';
import LikeIconSelected from '../images/footerIcons/LikeIconSelected.svg';
import BuyIcon from '../images/footerIcons/BuyIcon.svg';
import BuyIconSelected from '../images/footerIcons/BuyIconSelected.svg';
import ChatIcon from '../images/footerIcons/ChatIcon.svg';
import ChatIconSelected from '../images/footerIcons/ChatIconSelected.svg';
import ClaimIcon from '../images/footerIcons/ClaimIcon.svg';
import ClaimIconSelected from '../images/footerIcons/ClaimIconSelected.svg';


class Footer extends React.Component {

    static contextType = AppContext;

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
        if (this.context.tab !== 'landing'){
            this.context.navigate('landing')
        }
        this.context.navigateAction(action);
    }

    renderMainActions() {
        let actionMap = {
            'like': (this.context.action === 'like') ? LikeIconSelected : LikeIcon,
            'buy': (this.context.action === 'buy') ? BuyIconSelected : BuyIcon,
            'chat': (this.context.action === 'chat') ? ChatIconSelected : ChatIcon,
            'more': (this.context.action === 'more') ? ClaimIconSelected : ClaimIcon
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
                            src={actionMap['chat']}
                            onClick={() => this.buttonClicked('chat')}
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

    renderSwitch() {
        if (this.context.tab === 'landing') {
            return this.renderMainActions() ;
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

