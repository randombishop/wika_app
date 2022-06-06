import React from 'react';
import Fab from '@mui/material/Fab';
import styled from 'styled-components';

import AppContext from '../utils/context' ;
import {BodyCopy} from '../styles/textStyle'


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
            return (
                <svg width="11" height="11" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="7.44678" cy="7.45833" rx="7" ry="7.45833" fill="#50CC98"/>
                </svg>
            )
        } else {
            return (
                <svg width="11" height="11" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="7.44678" cy="7.45833" rx="7" ry="7.45833" fill="#50CC98"/>
                </svg>
            )
        }
    }

    render() {
        return (
            <NetworkContainer>
                {this.renderStatus()}
                &nbsp;&nbsp;
                {this.context.network.type}
                &nbsp;&nbsp;
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.62012 1.5L8.18995 8L14.2905 1.5" stroke="#C2C2C2" strokeWidth="2"/>
                </svg>
            </NetworkContainer>
        );
    }

}


const NetworkContainer = styled.div`
    ${BodyCopy};
    background: white;
    border-radius: 100px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    padding: 5px 10px 5px 10px;
    ${'' /* border: 2px solid red; */}
    height: 23px;
    &:hover {
        background-color: #DFE1E5
    }
`


export default NetworkButton ;



