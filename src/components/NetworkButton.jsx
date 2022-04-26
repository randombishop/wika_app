import React from 'react';
import Fab from '@mui/material/Fab';

import AppContext from '../utils/context' ;



class NetworkButton extends React.Component {

    static contextType = AppContext;

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
            <Fab size="small" variant="extended" color="default" sx={{marginTop:'3px'}}>
                <i className="fas fa-network-wired"></i>
                &nbsp;&nbsp;
                {this.context.network.type}
                &nbsp;&nbsp;
                {this.renderStatus()}
            </Fab>
        );
    }

}


export default NetworkButton ;



