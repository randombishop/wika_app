import React from 'react';
import Fab from '@mui/material/Fab';


import AppContext from "../utils/context";


class MainLogo extends React.Component {

    static contextType = AppContext;

    buttonStyle = {
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#e0f5fd',
        },
        fontSize: '28px',
        color: '#1976d2'
    }

    render() {
        return (
            <Fab size="medium"
                 sx={this.buttonStyle}
                 aria-label="home"
                 onClick={() => this.context.navigate('splash')}>
                <i className="far fa-thumbs-up"></i>
            </Fab>
        );
    }

}


export default MainLogo ;



