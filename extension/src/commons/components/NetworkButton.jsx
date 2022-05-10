import React from 'react';
import Fab from '@mui/material/Fab';

import AppContext from '../utils/context' ;



class NetworkButton extends React.Component {

    static contextType = AppContext;

    buttonStyle = {
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#e0f5fd',
        },
        textTransform: 'none',
        fontSize: '11px',
        height: '18px'
    }

    renderStatus() {
        if (this.context.network.ready) {
            return <i style={{color:'green'}} className="fas fa-check"></i> ;
        } else {
            return <i style={{color:'orange'}} className="fas fa-spinner"></i> ;
        }
    }

    render() {
        return (
            <Fab size="small" variant="extended" sx={this.buttonStyle}>
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



