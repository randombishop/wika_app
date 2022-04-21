import React from 'react';


import AppContext from "../utils/context";





class ButtonBar extends React.Component {

    static contextType = AppContext;

    styleBox = {
        textAlign: 'center',
        width: '80px'
    }

    styleButton = {
        borderRadius: '50px',
        padding: '5px 10px'
    }

    styleButtonText = {
        fontSize: '12px',
        color: '#1095c1'
    }

    styleMenu = {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
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
                            <li><a href="/#" onClick={() => this.navigate('liked_pages')}>Liked pages</a></li>
                            <li><a href="/#" onClick={() => this.navigate('owned_pages')}>Owned pages</a></li>
                            <li><a href="/#" onClick={() => this.navigate('claim_page')}>Claim page ownership</a></li>
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
            return "primary" ;
        }
    }

    renderButton = (text, icon, navigateTo) => {
        let action = () => {this.context.navigate(navigateTo)} ;
        if (navigateTo==='toggleMenu') {
            action = this.toggleMenu ;
        }
        return (
            <div style={this.styleBox}>
                <a href="/#" role="button"
                   style={this.styleButton}
                   className={this.buttonClass(navigateTo)}
                   onClick={action}>
                        <i className={'far '+icon}></i>
                </a>
                <br/>
                <span style={this.styleButtonText}>
                    {text}
                </span>
            </div>
        );
    }

    render() {
        if (this.context.account) {
            return (
                <div className="main-buttonbar">
                    {this.renderButton('Like', 'fa-thumbs-up', 'like')}
                    {this.renderButton('Buy', 'fa-credit-card', 'buy')}
                    {this.renderButton('Send', 'fa-paper-plane', 'wallet')}
                    {this.renderButton('Claim', 'fa-registered', 'claim_page')}
                    {this.renderButton('More', 'fa-caret-square-down', 'toggleMenu')}
                    {this.renderMenu()}
                </div>
            ) ;
        } else {
            return "" ;
        }
    }

}


export default ButtonBar ;



