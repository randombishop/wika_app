import React from "react";


import AppContext from "../../utils/context";
import AccountInfo from "./AccountInfo";
import AccountConnect from "./AccountConnect";
import AccountSelect from "./AccountSelect";

import BodyContainer from "../../styles/BodyStyle"

class Account extends React.Component {

    static contextType = AppContext;

    renderAccount = () => {
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

    render = () => {
        return (
            <BodyContainer>
                {this.renderAccount()}
            </BodyContainer>
        )
    }

}

export default Account ;


