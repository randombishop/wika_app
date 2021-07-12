import React from "react";


import AppContext from '../utils/context' ;


import Splash from "./Splash";
import AccountConnect from "./account/AccountConnect";
import Like from "./like/Like";


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
            default:
                return "";
        }
    }

}

export default MainContent ;
