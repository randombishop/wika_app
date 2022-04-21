import React from "react";


import AppContext from "../utils/context";


class Splash extends React.Component {

    static contextType = AppContext;


    layoutStyle = {display: "grid", gridAutoColumns: "1fr", gridAutoFlow: "column"};
    columnStyle = {padding: "15px"};
    titleStyle = {fontSize: "16px", fontWeight: "bold"}
    imageStyle = {width: "100%", height: "80px"}
    textStyle = {fontSize: "12px"}

    renderColumn = (title, image, text) => {
        return (
            <div style={this.columnStyle}>
                <span style={this.titleStyle}>{title}</span>
                <br/><br/>
                <img src={image} alt="" style={this.imageStyle} />
                <span style={this.textStyle}>
                    {text}
                </span>
            </div>
        ) ;
    }

    render = () => {
        return (
            <div className="main-content" style={{textAlign: 'center'}}>
                <h5>Welcome to the Wika Network!</h5>
                <div style={this.layoutStyle}>
                    {this.renderColumn(
                        "Consumers",
                        "images/splash1.png",
                        "Like your favorite pages and reward the authors and previous likers.")}

                    {this.renderColumn(
                        "Authors",
                        "images/splash2.png",
                        "Register any web page and Wika users will be able to reward you directly.")}

                    {this.renderColumn(
                        "Everyone",
                        "images/splash3.png",
                        "Let's build a clean, public and non-intrusive database that respects your privacy.")}
                </div>
                <br/>
                {this.context.account==null?
                    <button className="primary" onClick={() => this.context.navigate('account')}>
                        Connect your account and get started now!
                    </button>
                 :""}
            </div>
        );
    }

}


export default Splash ;


