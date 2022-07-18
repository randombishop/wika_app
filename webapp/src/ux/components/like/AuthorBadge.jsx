import React from 'react';
import styled from 'styled-components';
import Identicon from "@polkadot/react-identicon";

import AppContext from "../../utils/context";
import GreenCheck from "../../images/greenChecks.svg"
import { BodyCopy } from "../../styles/textStyle"

class AuthorBadge extends React.Component {

    static contextType = AppContext;

    render = () => {
        var url = this.props.url
        var urlList = url.split('//')
        if (urlList.length >= 2){
            url = urlList[1].split('.')[0]
        }
        return (
            <AuthorContainer>
                <img src={GreenCheck} alt='green checks'/>
                <div>{url}</div>
                <LikeBadge>{this.props.nLikes} likes</LikeBadge>
                <Identicon size={30} value={'5GWEiv2fSRoeaXwhTCP1qvnJRT8BVnXnTL8CVsnP8M3G7z2i'}/>
            </AuthorContainer>
        )
    }
}

const AuthorContainer = styled.div`
    ${BodyCopy};
    display: flex;
    margin: 20px;
    height: 30px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid lightGrey;
    border-radius: 15px;
    align-items: center;
    justify-content: space-around;
    width: 220px;
`
const LikeBadge = styled.div`
    margin: 5px;
    padding: 2px 8px 2px 8px;
    background-color: #36B5E6;
    color: white;
    border-radius: 5px;
`

export default AuthorBadge ;