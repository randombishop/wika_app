import React from "react";


import AppContext from '../utils/context' ;
import Header from "./Header";
import Splash from "./Splash";
import Account from "./account/Account";
import LandingContent from "./LandingContent";
import Recommend from "./recommend/Recommend";
import Wallet from "./wallet/Wallet";
import LikedPages from "./like/LikedPages";
import OwnedPages from "./authors/OwnedPages";
import ClaimPage from "./authors/ClaimPage";
import Keccak from "./debug/Keccak";
import Wip from "./debug/Wip";
import SignTransaction from "./transaction/SignTransaction";

import styled from 'styled-components';

class MainContent extends React.Component {

    static contextType = AppContext;

    pages = {
        splash: {title:"Welcome to Wika!", component:<Splash />} ,
        landing: {title:"Landing page", component:<LandingContent />} ,
        recommend: {title:"Recommendations", component:<Recommend />} ,
        wallet: {title:"Wallet", component:<Wallet />} ,
        account: {title:"Account", component:<Account />} ,
        liked_pages: {title:"Liked pages", component:<LikedPages />} ,
        owned_pages: {title:"Owned pages", component:<OwnedPages />} ,
        claim_page: {title:"Claim page ownership", component:<ClaimPage />} ,
        keccak: {title:"Keccak", component:<Keccak />},
        sign_transaction: {title:"Sign a Transaction", component:<SignTransaction />}
    }

    getTitle = () => {
        let page = this.pages[this.context.tab] ;
        if (page) {
            return page.title ;
        } else {
            return "WIP" ;
        }
    }

    renderPage = () => {
        let page = this.pages[this.context.tab] ;
        if (page) {
            return page.component ;
        } else {
            return <Wip /> ;
        }
    }

    render = () => {
        return (
            <MainContentContainer>
                <Header title={this.getTitle()} />
                <BodyContainer>
                    {this.renderPage()}
                </BodyContainer>
            </MainContentContainer>
        )
    }
}

const MainContentContainer = styled.div`
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const BodyContainer = styled.div`
    flex-grow: 1;
    background: radial-gradient(131.3% 59.75% at 136.45% 56.03%, #FFF500 0%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(134.01% 92.08% at -18.97% 24.77%, #F4F83B 0%, rgba(255, 255, 255, 0) 84.54%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(76.42% 76.42% at 82.52% 114.9%, #00FFF0 16.06%, rgba(255, 255, 255, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(184.15% 83.8% at 129.67% -9.96%, #1EF1FF 0%, rgba(255, 255, 255, 0.37) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(139.92% 66.18% at -6.91% 81.99%, #05FFFF 0%, rgba(56, 183, 232, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    display: flex;
    flex-direction: column;
    align-items: center;
`


export default MainContent ;
