import React from "react";


import AppContext from "../../utils/context";
import AccountInfo from "./AccountInfo";
import AccountConnect from "./AccountConnect";
import AccountSelect from "./AccountSelect";
import { getEnvironment } from '../../utils/misc';

class Account extends React.Component {

    static contextType = AppContext;

    render = () => {
        if (this.context.account) {
            return <AccountInfo /> ;
        } else {
            const env = getEnvironment() ;
            if (env==='app') {
                return <AccountConnect /> ;
            } else {
                return <AccountSelect /> ;
            }
        }
    }

}

export default Account ;


