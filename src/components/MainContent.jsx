import React from "react";


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

    render = () => {
        switch (this.context.tab) {
            case "splash":
                return <Splash />;
            case "like":
                return <Like />;
            case "recommend":
                return <Recommend />;
            case "wallet":
                return <Wallet />;
            case "account":
                return <AccountConnect />;
            case "liked_pages":
                return <LikedPages />;
            case "owned_pages":
                return <OwnedPages />;
            case "claim_page":
                return <ClaimPage />;
            case "keccak":
                return <Keccak />;
            case "blockchains":
                return <Wip />;
            default:
                return <Wip />;
        }
    }

}

export default MainContent ;
