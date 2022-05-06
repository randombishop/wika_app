import React from "react";


import AppContext from "../../utils/context";
import AccountInfo from "./Account";
import AccountConnect from "./AccountConnect";
import AccountSelect from "./AccountSelect";


class Account extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    render = () => {
        if (this.context.account) {
            return <AccountInfo /> ;
        } else {
            const env = window.BACKGROUND.env;
            if (env==='app') {
                return <AccountConnect />;
            } else {
                return <AccountSelect />;
            }
        }
    }

}

export default Account ;


