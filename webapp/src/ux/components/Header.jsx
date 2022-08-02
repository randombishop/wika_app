import React from 'react';
import styled from 'styled-components';

import {Heading1} from '../styles/textStyle'
import NetworkButton from './NetworkButton'
import AccountButton from './AccountButton'
import AppContext from '../utils/context' ;
import thumb from '../images/white.svg'


class Header extends React.Component {

    static contextType = AppContext;

    navigateHome() {
        if (this.context.account) {
            this.context.navigate('landing')
            this.context.navigateAction('like')
        } else {
            this.context.navigate('splash')
        }
    }

    render() {
        return (
            <MainHeader>
                <WikaLogoFlex>
                    <WikaLogo
                        onClick={() => this.navigateHome()}
                        src={thumb} alt="logo"
                    />
                </WikaLogoFlex>
                <NetworkContainer>
                    <NetworkButton/>
                </NetworkContainer>
                <AccountContainer>
                    <AccountButton />
                </AccountContainer>
            </MainHeader>
        )
    }

}


const MainHeader = styled.div`
  ${Heading1};
  background: #F9F9F9;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  ${'' /* border: 2px solid red; */}
`
const WikaLogoFlex = styled.div`
  ${'' /* border: 2px solid red; */}
  flex:1;
`
const WikaLogo = styled.img`
  cursor: pointer;
  filter: drop-shadow(1px 2px 1.5px rgba(0, 0, 0, 0.15));
  height: 35px;
  padding: 0 0 0 20px
`
const NetworkContainer = styled.div`
  ${'' /* border: 2px solid red; */}
  flex:1;
  display: flex;
  justify-content: center;
`
const AccountContainer = styled.div`
  ${'' /* border: 2px solid red; */}
  flex:1;
  display: flex;
  justify-content: flex-end;
`


export default Header ;



