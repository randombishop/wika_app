import React from "react";
import AppContext from "../../utils/context";
import styled from 'styled-components';
import {BodyCopy} from '../styles/textStyle';

class MainNav extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {

    let actionMap = {
      'like': (this.context.action == 'like') ? 'Selected' : '',
      'buy': (this.context.action == 'buy') ? 'Selected' : '',
      'send': (this.context.action == 'send') ? 'Selected' : '',
      'more': (this.context.action == 'more') ? 'Selected' : ''
    }

    return (
      <NavFooter>
        <NavContainer>
          <NavIcons>
            <Icon 
              src={'dist/images/likeicon' + actionMap['like'] + '.svg'}
              onClick={() => this.context.toggleAction('like')}
            />
            <Icon 
              src={'dist/images/BuyIcon' + actionMap['buy'] + '.svg'}
              onClick={() => this.context.toggleAction('buy')}
            />
            <Icon 
              src={'dist/images/SendIcon' + actionMap['send'] + '.svg'}
              onClick={() => this.context.toggleAction('send')}
            />
            <Icon 
              src={'dist/images/ClaimIcon' + actionMap['more'] + '.svg'}
              onClick={() => this.context.toggleAction('more')}
            />
          </NavIcons>
        </NavContainer>
      </NavFooter>
    )
  }
}

const NavFooter = styled.div`
  ${BodyCopy};
  background: #F9F9F9;
  display: flex;
  height: 60px;
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
  }
`

export default MainNav;