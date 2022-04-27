import React from 'react';
import Typography from '@mui/material/Typography' ;


import AppContext from "../utils/context";
import MainLogo from "./MainLogo";
import NetworkButton from "./NetworkButton";
import AccountButton from "./AccountButton";


class Header extends React.Component {

    static contextType = AppContext;

    headerStyle = {
        display: 'flex',
        alignItems: 'center',
        background: '#F9F9F9',
        padding: '5px 15px',
        textAlign: 'center'
    }

    titleStyle = {
        marginLeft:'10px'
    }

    networkStyle = {
        position: 'absolute',
        top: '4px',
        right: '15px',
    }

    accountStyle = {
        position: 'absolute',
        top: '35px',
        right: '15px'
    }

    render() {
        return (
            <div style={this.headerStyle}>
                <MainLogo />
                <Typography variant="h5" color="primary" style={this.titleStyle}>
                    {this.props.title}
                </Typography>
                <div style={this.networkStyle}>
                    <NetworkButton />
                </div>
                <div style={this.accountStyle}>
                    <AccountButton />
                </div>
            </div>
        );
    }

}


export default Header ;



