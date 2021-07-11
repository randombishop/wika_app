import React from "react";


import AppContext from '../utils/context' ;

import AccountConnect from "./AccountConnect";
import Splash from "./Splash";


class MainContent extends React.Component {

    static contextType = AppContext;

    render = () => {
        switch (this.context.tab) {
            case "splash":
                return <Splash />;
            case "account_connect":
                return <AccountConnect />;
            default:
                return "";
        }
    }

}

export default MainContent ;
