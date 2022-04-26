import React from "react";
import Typography from '@mui/material/Typography' ;

import AppContext from '../utils/context' ;


import Splash from "./Splash";
import Like from "./like/Like";
import Recommend from "./recommend/Recommend";
import Wallet from "./wallet/Wallet";
import AccountConnect from "./account/AccountConnect";
import LikedPages from "./like/LikedPages";
import OwnedPages from "./authors/OwnedPages";
import ClaimPage from "./authors/ClaimPage";
import Keccak from "./debug/Keccak";
import Wip from "./debug/Wip";




class MainContent extends React.Component {

    static contextType = AppContext;

    pages = {
        splash: {title:"Welcome to Wika Network!", component:<Splash />} ,
        like: {title:"Like a web page", component:<Like />} ,
        recommend: {title:"Recommendations", component:<Recommend />} ,
        wallet: {title:"Wallet", component:<Wallet />} ,
        account: {title:"Account", component:<AccountConnect />} ,
        liked_pages: {title:"Liked pages", component:<LikedPages />} ,
        owned_pages: {title:"Owned pages", component:<OwnedPages />} ,
        claim_page: {title:"Claim page ownership", component:<ClaimPage />} ,
        keccak: {title:"Keccak", component:<Keccak />}
    }

    renderTitle = () => {
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
            <React.Fragment>
                <div className="main-title">
                    <Typography variant="h5" color="primary">{this.renderTitle()}</Typography>
                </div>
                <div className="main-content">
                    {this.renderPage()}
                </div>
            </React.Fragment>
        )
    }

}

export default MainContent ;
