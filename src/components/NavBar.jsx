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
            <nav className="main-navbar">
                <ul>
                    <li>
                        <a href="/#" onClick={() => this.context.navigate('splash')}>
                            <img src="images/logo_alt1.png" alt="" width="40" height="40"/>
                        </a>
                    </li>
                    <li><AccountButton /></li>
                </ul>
                <ul>
                    <li><NetworkButton /></li>
                </ul>
            </nav>
        );
    }

}


export default NavBar ;



