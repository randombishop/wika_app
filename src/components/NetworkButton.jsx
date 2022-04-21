import React from 'react';

import AppContext from '../utils/context' ;



class NetworkButton extends React.Component {

    static contextType = AppContext;

    buttonStyle = {
        height: '60px',
        paddingTop: '4px',
        paddingBottom: '4px',
        lineHeight: 'normal'
    }

    renderStatus() {
        switch (this.context.network.status) {
            case 'connected': return <i style={{color:'green'}} className="fas fa-check"></i> ;
            case 'disconnected': return <i style={{color:'red'}} className="fas fa-times"></i> ;
            case 'connecting': return <i style={{color:'orange'}} className="fas fa-spinner"></i> ;
            default: return "" ;
        }
    }

    render() {
        return (
            <button className="outline secondary" style={this.buttonStyle}>
                <span style={{color: 'lightgray', fontSize:'18px'}}>
                    <i className="fas fa-network-wired"></i>
                    &nbsp;&nbsp;
                    {this.context.network.type}
                    &nbsp;&nbsp;
                    {this.renderStatus()}
                </span>
                <br/>
                <span style={{color: 'lightgray', fontSize:'10px'}}>
                    {this.context.network.url}
                </span>
            </button>
        );
    }

}


export default NetworkButton ;



