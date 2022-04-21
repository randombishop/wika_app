import React from 'react';


import AppContext from "../utils/context";


import NetworkButton from "./NetworkButton";
import AccountButton from "./AccountButton";



class NavBar extends React.Component {

    static contextType = AppContext;

    navigate = (tab) => {
        this.context.navigate(tab);
    }

    render() {
        return (
            <div className="main-navbar">
                <div style={{marginTop:'5px'}}>
                    <a href="/#" onClick={() => this.context.navigate('splash')} >
                        <img src="images/logo_alt1.png" alt="" width="45" height="45"/>
                    </a>
                </div>
                <div><NetworkButton /></div>
                <div><AccountButton /></div>
            </div>
        );
    }

}


export default NavBar ;



