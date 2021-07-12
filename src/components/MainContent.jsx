import React from "react";


import AppContext from '../utils/context' ;


import Splash from "./Splash";
import AccountConnect from "./account/AccountConnect";
import Like from "./like/Like";
import Keccak from "./debug/Keccak";


class MainContent extends React.Component {

    static contextType = AppContext;

    render = () => {
        switch (this.context.tab) {
            case "splash":
                return <Splash />;
            case "account":
                return <AccountConnect />;
            case "like":
                return <Like />;
            case "keccak":
                return <Keccak />;
            default:
                return "";
        }
    }

}

export default MainContent ;
