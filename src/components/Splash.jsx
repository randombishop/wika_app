import React from "react";


import AppContext from "../utils/context";


class Splash extends React.Component {

    static contextType = AppContext;

    layoutStyle = {display: "grid", gridAutoColumns: "1fr", gridAutoFlow: "column"};

    columnStyle = {padding: "20px", fontSize: "15px", textAlign: "center"};

    imageStyle = {width: "125px", height: "80px"}

    render() {
        return (
            <div className="main-content" style={{textAlign: "center"}}>
                <h5>Welcome to the Wika Network!</h5>
                <div style={this.layoutStyle}>
                    <div style={this.columnStyle}>
                        <h6>If you're a generous internet consumer</h6>
                        <img src="images/splash1.png" alt="" style={this.imageStyle} /> <br/><br/>
                        Like your favorite pages and reward the authors and previous likers.
                    </div>
                    <div style={this.columnStyle}>
                        <h6>If you authored a cool web page</h6>
                        <img src="images/splash2.png" alt="" style={this.imageStyle} /> <br/><br/>
                        Register it in one public decentralized database, and whether your content
                        lives in youtube, facebook, medium or any other internet place,
                        Wika users will be able to reward you directly.
                    </div>
                    <div style={this.columnStyle}>
                        <h6>If you want a better internet</h6>
                        <img src="images/splash3.png" alt="" style={this.imageStyle} /> <br/><br/>
                        Join and use the Wika Network to build a clean, public and non-intrusive database.
                        The Wika Blockchain will empower new search engines and recommendation systems
                        that respect your privacy and are 100% transparent.
                    </div>
                </div>
                <br/>
                <h6>Together, let's make the internet a better place and spread quality content.</h6>
                <button className="primary" onClick={() => this.context.navigate('account_connect')}>
                    Connect your Polkadot wallet and get started now!
                </button>
            </div>
        );
    }

}


export default Splash ;


