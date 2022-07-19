import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';

import AppContext from "../../utils/context";
import AuthorBadge from "./AuthorBadge"
import { getEnvironment } from '../../utils/misc';
import {convertToWika} from "../../utils/misc";
import Like1 from "./Like1";
import Like2 from "./Like2";
import { Heading1 } from "../../styles/textStyle"


class Like extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            lookedUp:false,
            url: "",
            referrer: null,
            likePrice: null,
            rewardPrct: '33%',
            rewardTarget: 1.33,
            rewardWaitFactor: 4,
            urlLikes: 0,
            likesSubmittedAt: null,
            likesSubmittedCount: null,
            likesSubmittedRemaining: null,
            env: getEnvironment()
        }
    }

    componentDidMount() {
        this.getLikePrice() ;
    }

    getLikePrice = () => {
        const self = this;
        window.BACKGROUND_INTERFACE.call({func: 'getLikePrice'}, (result) => {
            const price = convertToWika(result) ;
            self.setState({likePrice:price}) ;
        }) ;
    }

    handleUrlChange = (event) => {
        if (this.state.lookedUp) return ;
        this.setState({url: event.target.value}) ;
    }

    lookupUrl = () => {
        console.log('why blank?', this.state.url) ;
        this.subscribeToUrl() ;
        this.subscribeToLike() ;
        this.setState({lookedUp:true}) ;
    }

    clearUrl = () => {
        this.unsubscribe() ;
        this.setState({
            lookedUp:false,
            url:"",
            likesSubmittedCount:null,
        }) ;
    }

    subscribeToUrl = () => {
        const self = this;
        const url = this.state.url;
        window.BACKGROUND_INTERFACE.unsub('getUrl', () => {
            window.BACKGROUND_INTERFACE.subscribe({func: 'getUrl', url: url}, (result) => {
                let urlLikes = Number(result[0]) ;
                self.setState({urlLikes:urlLikes}) ;
            }) ;
        }) ;
    }

    subscribeToLike = () => {
        const self = this;
        const address = this.context.account.address;
        const url = this.state.url;
        const message = {
            func: 'getLike',
            address: address,
            url: url
        } ;
        window.BACKGROUND_INTERFACE.unsub('getLike', () => {
            window.BACKGROUND_INTERFACE.subscribe(message, (result) => {
                self.setState({
                    likesSubmittedAt:Number(result[0]),
                    likesSubmittedCount:Number(result[1]),
                    likesSubmittedRemaining:Number(result[2])
                }) ;
            }) ;
        }) ;
    }


    componentWillUnmount = () => {
        this.unsubscribe() ;
    }

    unsubscribe = () => {
        window.BACKGROUND_INTERFACE.unsub('getUrl', () => {}) ;
        window.BACKGROUND_INTERFACE.unsub('getLike', () => {}) ;
    }

    renderInputAdornment = () => {
        return (
            <InputAdornment position="end">
                {this.state.lookedUp?
                <Button onClick={this.clearUrl} variant="contained" color="secondary"><i className="fas fa-backspace"></i></Button>
                :<Button onClick={this.lookupUrl} variant="contained" color="primary"><i className="fas fa-search"></i></Button>}
            </InputAdornment>
        ) ;
    }

    renderUrlInput = () => {
        if (this.state.env === 'app'){
            let inputProps = {endAdornment: this.renderInputAdornment()} ;
            return (<TextField
                        id="lookup-url-input"
                        label="Lookup URL status"
                        variant="outlined"
                        fullWidth={true}
                        value={this.state.url}
                        onChange={this.handleUrlChange}
                        InputProps={inputProps} />) ;
        } else {
            var self = this
            window.chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0].url;
                if (self.state.lookedUp === false) {
                    self.setState({url: activeTab}, () => {self.lookupUrl()});
                }
            });
            // if (this.state.lookedUp === false) {
            //     this.clearUrl();
            // }
            return 
        }
    }

    renderUrlNumLikes = () => {
        if (this.state.lookedUp && this.state.urlLikes!=null) {
            return (
                <AuthorBadge url={this.state.url} nLikes={this.state.urlLikes} />
            )
        } else {
            return "" ;
        }
    }

    renderDivider = () => {
        if (this.state.lookedUp) {
            return (<Divider />) ;
        } else {
            return "" ;
        }
    }

    renderPart2 = () => {
        if (this.state.lookedUp && this.state.likesSubmittedCount!=null) {
            if (this.state.likesSubmittedCount>0) {
                return <Like2
                    urlLikes={this.state.urlLikes}
                    likesSubmittedCount={this.state.likesSubmittedCount}
                    likesSubmittedAt={this.state.likesSubmittedAt}
                    rewardWaitFactor={this.state.rewardWaitFactor}
                />
            } else {
                return <Like1
                    url={this.state.url}
                    urlLikes={this.state.urlLikes}
                    likePrice={this.state.likePrice}
                />
            }
        }
    }

    render = () => {
        return (
            <LikeContainer>
                <Title>
                    Like Current Page
                </Title>
                <UrlInput>
                    {this.renderUrlInput()}
                </UrlInput>
                {this.renderPart2()}
                {this.renderUrlNumLikes()}
            </LikeContainer>
        ) ;
    }

}

const LikeContainer = styled.div`
    width: 90%;
    max-wdith: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
`

const Title = styled.div`
    ${Heading1};
    font-weight: 700;
    color: #888888;
    padding: 15px 20px 5px 20px;
    border: 1px;
    border-color: #DFDBDB;
    border-style: none none solid none;
`
const UrlInput = styled.div`
    padding: 20px 0 0 0;
    flex: 1;
`

export default Like ;

