import React from "react";


import AppContext from '../utils/context' ;
import Header from "./Header";
import Splash from "./Splash";
import Account from "./account/Account";
import Like from "./like/Like";
import Recommend from "./recommend/Recommend";
import Wallet from "./wallet/Wallet";
import LikedPages from "./like/LikedPages";
import OwnedPages from "./authors/OwnedPages";
import ClaimPage from "./authors/ClaimPage";
import Keccak from "./debug/Keccak";
import Wip from "./debug/Wip";


class MainContent extends React.Component {

    static contextType = AppContext;

    mainStyle = {
        padding: '30px 20px 15px 20px',
        height: '415px',
        background: "linear-gradient(171.17deg, #B5FFB4 -41.33%, #E1F6FF 12.71%, #FFF496 105.58%, #FED5FF 154.44%)",
        overflow: "scroll"
    }

    pages = {
        splash: {title:"Welcome to Wika!", component:<Splash />} ,
        like: {title:"Like a web page", component:<Like />} ,
        recommend: {title:"Recommendations", component:<Recommend />} ,
        wallet: {title:"Wallet", component:<Wallet />} ,
        account: {title:"Account", component:<Account />} ,
        liked_pages: {title:"Liked pages", component:<LikedPages />} ,
        owned_pages: {title:"Owned pages", component:<OwnedPages />} ,
        claim_page: {title:"Claim page ownership", component:<ClaimPage />} ,
        keccak: {title:"Keccak", component:<Keccak />}
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
            <React.Fragment>
                <Header title={this.getTitle()} />
                <div style={this.mainStyle}>
                    {this.renderPage()}
                </div>
            </React.Fragment>
        )
    }

}

export default MainContent ;
