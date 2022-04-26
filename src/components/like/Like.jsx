import React from 'react';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


import AppContext from "../../utils/context";
import {convertToWika} from "../../utils/misc";
import Like1 from "./Like1";
import Like2 from "./Like2";


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
            urlLikes: null,
            likesSubmittedAt: null,
            likesSubmittedCount: null,
            likesSubmittedRemaining: null
        }
    }

    componentDidMount() {
        this.getLikePrice() ;
    }

    getLikePrice = () => {
        let self = this;
        self.context.wikaNetwork.getLikePrice((result) => {
            let price = convertToWika(result) ;
            self.setState({likePrice:price}) ;
        }).catch((err) => {
            alert(err) ;
        }) ;
    }

    handleUrlChange = (event) => {
        this.setState({url: event.target.value}) ;
    }

    lookupUrl = () => {
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
        let self = this;
        if (self.unsubUrl) {
            self.unsubUrl() ;
            self.unsubUrl = null ;
        }
        let url = this.state.url;
        self.context.wikaNetwork.getUrl(url, (result) => {
            let urlLikes = Number(result[0]) ;
            self.setState({urlLikes:urlLikes}) ;
        }).then((s) => {
            self.unsubUrl = s ;
        }).catch((err) => {
            alert(err) ;
        }) ;
    }

    subscribeToLike = () => {
        let self = this;
        if (self.unsubLike) {
            self.unsubLike() ;
            self.unsubLike = null ;
        }
        let address = this.context.account.address;
        let url = this.state.url;
        self.context.wikaNetwork.getLike(address, url, (result) => {
            self.setState({
                likesSubmittedAt:Number(result[0]),
                likesSubmittedCount:Number(result[1]),
                likesSubmittedRemaining:Number(result[2])
            }) ;
        }).then((s) => {
            self.unsubLike = s ;
        }).catch((err) => {
            alert(err) ;
        }) ;
    }

    componentWillUnmount = () => {
        this.unsubscribe() ;
    }

    unsubscribe = () => {
        if (this.unsubUrl) {
            this.unsubUrl() ;
        }
        if (this.unsubLike) {
            this.unsubLike() ;
        }
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
        let inputProps = {endAdornment: this.renderInputAdornment()} ;
        return (<TextField
                    id="lookup-url-input"
                    label="Lookup URL status"
                    variant="outlined"
                    fullWidth={true}
                    value={this.state.url}
                    onChange={this.handleUrlChange}
                    disabled={this.state.lookedUp}
                    InputProps={inputProps} />) ;
    }

    renderUrlNumLikes = () => {
        if (this.state.lookedUp && this.state.urlLikes!=null) {
            return (
                <Typography variant="body2" sx={{marginTop:"5px"}} >
                    This page received <strong>{this.state.urlLikes} likes</strong>.
                </Typography>) ;
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
            <div className="main-content">
                <Typography variant="h5">Webpage</Typography>
                <br/>
                {this.renderUrlInput()}
                {this.renderUrlNumLikes()}
                <br/>
                <br/>
                {this.renderPart2()}
            </div>
        ) ;
    }

}

export default Like ;



