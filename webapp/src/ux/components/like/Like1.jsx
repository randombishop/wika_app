import React from 'react';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

import AppContext from "../../utils/context";
import sendTransaction from '../../utils/send_transaction' ;
import { Heading1, Heading2 } from "../../styles/textStyle"

class Like1 extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            numLikes: 1
        };
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
       this._mounted = false;
    }

    handleNumLikeChange = (event) => {
        this.setState({numLikes: event.target.value}, this.update) ;
    }

    submitLike = () => {
        let params = {url: this.props.url,
                      referrer: this.state.referrer,
                      numLikes: this.state.numLikes} ;
        let account = this.context.account ;
        this.setState({txStatus: 'Sending...'}) ;
        sendTransaction('like', params, account, this.finishedTransaction) ;
    }

    finishedTransaction = (result) => {
        console.log('finishedTransaction', result);
        if (this._mounted) {
            this.setState({txStatus: null}) ;
        }
        if (result.error) {
            alert(result.error) ;
        }
    }

    renderButton = () => {
        if (this.state.txStatus==null) {
            return (
                <Fab color="primary" variant="extended" onClick={this.submitLike}>
                    Send {this.state.numLikes} &nbsp;<i className="fas fa-thumbs-up"></i>
                </Fab>
            );
        } else {
            return (
                <CircularProgress />
            ) ;
        }
    }

    render = () => {
        return (
            <FormStyled>
                <LikeInputContainer onChange={this.handleNumLikeChange}>
                    <LikeInput type='number' placeholder={1}/>
                </LikeInputContainer>
                <LikeButtonContainer>
                    <LikeButton onClick={this.submitLike}>
                        LIKE
                    </LikeButton>
                </LikeButtonContainer>
            </FormStyled>
        );
    }

}

const FormStyled = styled.form`
    flex: 3;
`
const LikeInputContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px;
`
const LikeInput = styled.input`
    ${Heading2}
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
    border-style: none;
    height: 30px;
    width: 60%;
    border-radius: 8px;
`
const LikeButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`
const LikeButton = styled.div`
    cursor: pointer;
    border-radius: 100px;
    background: radial-gradient(1629.2% 723.91% at -20.83% -235.87%, #2EABE1 0%, #5BE2FF 40.2%, #FDFF95 62.01%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    height: 60px;
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: linear-gradient(180deg, #3DB2E4 -110.22%, #005F88 171.17%);
    }
    ${Heading1};
    font-size: 25px;
    color: white;
`

export default Like1 ;
