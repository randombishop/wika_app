import React from 'react';

import AppContext from '../utils/context' ;
import { Heading1, BodyCopy } from "../styles/textStyle"
import styled from 'styled-components';
import carouselArrowLeft from '../images/carouselArrowLeft.svg';
import carouselArrowRight from '../images/carouselArrowRight.svg';
import sendNew from '../images/sendNew.svg'
import plus from '../images/plus.svg'

class AccountCarousel extends React.Component {

    static contextType = AppContext;

    componentDidMount = () => {
        this.saveAccounts();
    }

    getAccounts = () => {
        const p = new Promise(
            (resolve) => {
                window.BACKGROUND.web3Accounts().then((result) => {
                    resolve(result)
                });
            }
        ) 
        return p
    }


    saveAccounts = async () => {
        let accounts = await this.getAccounts()
        this.setState({accounts: accounts})
    }
  
    constructor(props) {
        super(props);
        this.state = {
            // accountSelected: 0,
            accounts: {}
        }
    }

    selectRight() {
        let accountArray = Object.values(this.state.accounts)
        let accountSelectedIndex = accountArray.findIndex(x => x.address === this.context.account.address);
        if (accountSelectedIndex < accountArray.length - 1) {
            let account = accountArray[accountSelectedIndex + 1]
            let address = account.address
            let addressU8 = window.BACKGROUND.decodeAddress(address) ;
            let addressRaw = window.BACKGROUND.u8aToHex(addressU8) ;
            let data = {
                mode: 'web3',
                name: account.meta.name,
                address: address,
                addressRaw: addressRaw,
                source: account.meta.source
            };
            this.context.selectAccount(data)
        }
    }

    selectLeft() {
        let accountArray = Object.values(this.state.accounts)
        let accountSelectedIndex = accountArray.findIndex(x => x.address === this.context.account.address);
        if (accountSelectedIndex > 0) {
            let account = accountArray[accountSelectedIndex - 1]
            let address = account.address
            let addressU8 = window.BACKGROUND.decodeAddress(address) ;
            let addressRaw = window.BACKGROUND.u8aToHex(addressU8) ;
            let data = {
                mode: 'web3',
                name: account.meta.name,
                address: address,
                addressRaw: addressRaw,
                source: account.meta.source
            };
            this.context.selectAccount(data)
        }
    }

    render() {
        let accountArray = Object.values(this.state.accounts)
        let accountSelectedIndex = accountArray.findIndex(x => x.address === this.context.account.address);
        var move = -150;
        const accountInfo = accountArray.map((account, i) => {
            return (
                <AccountContainter key={account.accountName}>
                    <Account translate={(i * 150) + move*(accountSelectedIndex)}  opacity={(accountSelectedIndex == (i)) ? 1: 0}>
                        <AccountCarouselTop>
                        <AccountName>
                            {account.meta.name}
                        </AccountName>
                        <AccountIcons>
                            <Send src={sendNew}/>
                            <Plus src={plus}/>
                        </AccountIcons>
                        </AccountCarouselTop>
                        <AccountCarouselBottom>
                        <Balance>
                            {Math.round(this.context.balance.wika * 100)/100}
                        </Balance>
                        <Currency>
                            WIKA
                        </Currency>
                        <Dollars>
                            {Math.round(this.context.balance.usd * 100)/100} usd 
                        </Dollars>
                        </AccountCarouselBottom>
                    </Account>
                </AccountContainter>
            )
            }
        )
        return(
            <CarouselContainer  translate={this.props.translate}>
                {accountInfo}
                <Buttons>
                    <CarouselButtons onClick={() => {this.selectLeft()}}>
                    <img src={carouselArrowLeft} alt='left arrow'/>
                    </CarouselButtons>
                    <CarouselButtons onClick={() => {this.selectRight()}}>
                    <img src={carouselArrowRight} alt='right arrow'/>
                    </CarouselButtons>
                </Buttons>
            </CarouselContainer>
        )
    }
}

const CarouselContainer = styled.div`
    position: relative;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(${props => props.translate}%);
    transition: all 0.3s;
    z-index: 1;
`
const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 390px;
`
const CarouselButtons = styled.div`
    cursor: pointer;
    margin: 20px;
    margin-top: 30px;
`
const AccountContainter = styled.div`
    position: absolute;
    min-width: 250px;
    ${'' /* border: 2px solid red; */}
`
const Account = styled.div`
    justify-content: space-between;
    transform: translateX(${props => props.translate}%);
    opacity: ${props => props.opacity};
    transition: all 0.2s;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    ${'' /* border: 2px solid red; */}
`
const AccountCarouselTop = styled.div`
    background: white;
    height: 40px;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const AccountCarouselBottom = styled.div`
    background: white;
    height: 40px;
    border-radius: 0 0 10px 10px;
    border: 1px;
    border-color: #DFDBDB;
    border-style: solid none none none;
    display: flex;
    align-items: center;
`
const AccountName = styled.div`
    ${Heading1};
    font-weight: 700;
    color: #888888;
    margin-left: 10px;
`
const AccountIcons = styled.div`
    display: flex;
    align-items: center;
`
const Send = styled.img`
    margin-right: 5px;
`
const Plus = styled.img`
    padding-top: 3px;
    margin-right: 10px;
`
const Balance = styled.div`
    ${Heading1};
    margin-left: 10px;
    margin-right: 3px;
`
const Currency = styled.div`
    ${BodyCopy}
    margin-top: 4px;
`
const Dollars = styled.div`
    ${Heading1};
    margin-left: 10px;
    color: #888888;
`
export default AccountCarousel;