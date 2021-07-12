import React from 'react';


import AppContext from "../utils/context";


import NetworkButton from "./NetworkButton";
import AccountButton from "./AccountButton";



class NavBar extends React.Component {

    static contextType = AppContext;

    styleMenu = {
        position: 'absolute',
        top: '80px',
        left: '400px',
        backgroundColor: 'aliceblue',
        padding: '10px',
        borderRadius: '10px',
        opacity: '90%'
    }

    constructor(props) {
        super(props);
        this.state = {menuOpened: false};
    }

    toggleMenu = () => {
        let toggle = !this.state.menuOpened ;
        this.setState({menuOpened:toggle}) ;
    }

    navigate = (tab) => {
        this.setState({menuOpened:false}) ;
        this.context.navigate(tab);
    }

    renderMenu = () => {
        if (this.state.menuOpened) {
            return (
                <aside style={this.styleMenu}>
                    <nav>
                        <ul>
                            <li><a href="/#" onClick={() => this.navigate('account')}>Account</a></li>
                            <li><a href="/#" onClick={() => this.navigate('history')}>History</a></li>
                            <li><a href="/#" onClick={() => this.navigate('claim_page')}>Claim page ownership</a></li>
                            <li><a href="/#" onClick={() => this.navigate('owned_pages')}>Owned pages</a></li>
                            <li><a href="/#" onClick={() => this.navigate('keccak')}>Keccak 256</a></li>
                            <li><a href="/#" onClick={() => this.navigate('blockchains')}>Blockchains</a></li>
                            <li><a href="/#" onClick={() => this.navigate('about')}>About</a></li>
                        </ul>
                    </nav>
                </aside>
            );
        } else {
            return "" ;
        }
    }

    buttonClass = (tab) => {
        if (this.context.tab === tab) {
            return "contrast" ;
        } else {
            return "secondary" ;
        }
    }

    renderAccountOnly() {
        if (this.context.account) {
            return (
                <React.Fragment>
                    <li><a href="/#" className={this.buttonClass('like')} onClick={() => this.navigate('like')}>Like</a></li>
                    <li><a href="/#" className={this.buttonClass('recommend')} onClick={() => this.navigate('recommend')}>Recommended</a></li>
                    <li><a href="/#" className={this.buttonClass('wallet')} onClick={() => this.navigate('wallet')}>Wallet</a></li>
                    <li><a href="/#" className={this.buttonClass('menu')} onClick={this.toggleMenu}><i className="fas fa-bars"></i></a></li>
                    {this.renderMenu()}
                </React.Fragment>
            ) ;
        } else {
            return "" ;
        }
    }

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <a href="/#" className={this.buttonClass('splash')} onClick={() => this.context.navigate('splash')}>
                            <img src="images/logo32.png" alt="" />
                            &nbsp;&nbsp;
                            Wika Network
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </a>
                    </li>
                    {this.renderAccountOnly()}
                </ul>
                <ul>
                    <li><NetworkButton /></li>
                    <li><AccountButton /></li>
                </ul>
            </nav>
        );
    }

}


export default NavBar ;



