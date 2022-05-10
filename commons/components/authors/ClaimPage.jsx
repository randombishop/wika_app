import React from "react";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';


import AppContext from "../../utils/context";
import {bytesToString, convertToWika, copyToClipboard} from "../../utils/misc";


class ClaimPage extends React.Component {

    static contextType = AppContext;

    DEFAULT_ACCOUNT = "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM" ;

    NUM_BLOCKS_TO_WAIT = 10 ;

    styleTextArea = {
        fontFamily: 'monospace',
        fontSize: '9px'
    }

    styleButton = {
        padding: 0,
        marginBottom: '4px'
    }


    constructor(props) {
        super(props);
        this.state = {
            lookedUp:false,
            url: "",
            requestPrice: null,
            owner: null,
            requestBlock: null,
            requestAccount: null,
            currentBlock: null,
            txStatus: null,
            testResult: null
        } ;
    }


    // INITIALIZATION
    // --------------------------------

    componentDidMount = () => {
        this.getOwnersRequestPrice() ;
        this.subscribeToBlockNumber() ;
    }

    getOwnersRequestPrice = () => {
        let self = this;
        window.BACKGROUND.network.getOwnersRequestPrice((result) => {
            let price = convertToWika(result) ;
            self.setState({requestPrice:price}) ;
        }).catch((err) => {
            alert(err) ;
        }) ;
    }

    subscribeToBlockNumber = () => {
        let self = this;
        if (self.unsubBlockNumber) {
            self.unsubBlockNumber() ;
            self.unsubBlockNumber = null ;
        }
        window.BACKGROUND.network.getBlockNumber((result) => {
            self.setState({
                currentBlock:Number(result)
            }) ;
        }).then((s) => {
            self.unsubBlockNumber = s ;
        }).catch((err) => {
            alert(err) ;
        }) ;
    }




    // Lookup URL
    // --------------------------------

    handleUrlChange = (event) => {
        this.setState({url: event.target.value}) ;
    }

    lookupUrl = () => {
        this.setState({
            lookedUp: true
        }) ;
        this.subscribeToUrlOwner() ;
        this.subscribeToOwnerRequest() ;
        this.subscribeToOwnerResult() ;
    }

    subscribeToUrlOwner = () => {
        let self = this;
        if (self.unsubUrlOwner) {
            self.unsubUrlOwner() ;
            self.unsubUrlOwner = null ;
        }
        let url = self.state.url;
        this.setState({owner:null}, () => {
            window.BACKGROUND.network.getUrlOwner(url, (result) => {
                self.setState({
                    owner: "" + result
                });
            }).then((s) => {
                self.unsubUrlOwner = s;
            }).catch((err) => {
                alert(err);
            });
        }) ;
    }

    subscribeToOwnerRequest = () => {
        let self = this;
        if (self.unsubOwnerRequest) {
            self.unsubOwnerRequest() ;
            self.unsubOwnerRequest = null ;
        }
        let url = self.state.url;
        let clearState = {
            requestBlock: null,
            requestAccount: null
        } ;
        this.setState(clearState, () => {
            window.BACKGROUND.network.getOwnerRequest(url, (result) => {
                self.setState({
                    requestBlock: Number(result[0]),
                    requestAccount: ""+result[1]
                });
            }).then((s) => {
                self.unsubOwnerRequest = s;
            }).catch((err) => {
                alert(err);
            });
        }) ;
    }

    subscribeToOwnerResult = () => {
        let self = this;
        if (self.unsubOwnerResult) {
            self.unsubOwnerResult() ;
            self.unsubOwnerResult = null ;
        }
        let url = self.state.url;
        let clearState = {
            resultBlock: null,
            resultNumVotes: null,
            resultNumVotesYes: null,
            resultNumVotesMajority: null,
            resultIntro: null,
            resultMark: null,
            resultOutcome: null
        } ;
        this.setState(clearState, () => {
            window.BACKGROUND.network.getOwnerResult(url, (result) => {
                let data = {
                    resultBlock: Number(result[0]),
                    resultNumVotes: Number(result[1]),
                    resultNumVotesYes: Number(result[2]),
                    resultNumVotesMajority: Number(result[3]),
                    resultIntro: result[4],
                    resultMark: result[5],
                    resultOutcome: result[6]
                };
                console.log('ownerResult', data) ;
                self.setState(data);
            }).then((s) => {
                self.unsubOwnerResult = s;
            });
        }) ;
    }

    unsubscribeUrl = () => {
        if (this.unsubUrlOwner) {
            this.unsubUrlOwner() ;
        }
        if (this.unsubOwnerRequest) {
            this.unsubOwnerRequest() ;
        }
        if (this.unsubOwnerResult) {
            this.unsubOwnerResult() ;
        }
    }

    clearUrl = () => {
        this.unsubscribeUrl() ;
        this.setState({
            lookedUp:false,
            url:"",
            owner: null
        }) ;
    }



    // Submit and monitor the request
    // --------------------------------

    submitRequest = () => {
        let url = this.state.url ;
        let account = this.context.account ;
        window.BACKGROUND.sendTransaction('owner_request', {url:url}, account, this.monitorRequest) ;
    }

    monitorRequest = (result) => {
        console.log('monitorRequest', result);
        this.setState({txStatus: result.status}) ;
        if (result.error) {
            alert(result.error) ;
        }
    }


    // Test the webpage ownership off-chain
    // --------------------------------------

    testUrl = () => {
        /*let self = this;
        let url = self.context.url ;
        fetch(url, {
              method: "GET",
            })
            .then(response => console.log(response))
            .catch(err => console.log(err));*/
    };


    // Utils
    // --------------------------------------

    copyMark = () => {
        copyToClipboard("wika_mark_element") ;
    };


    // Clean-up when done
    // --------------------------------------

    componentWillUnmount = () => {
        if (this.unsubUrlOwner) {
            this.unsubUrlOwner() ;
        }
        if (this.unsubOwnerRequest) {
            this.unsubOwnerRequest() ;
        }
        if (this.unsubOwnerResult) {
            this.unsubOwnerResult() ;
        }
        if (this.unsubBlockNumber) {
            this.unsubBlockNumber() ;
        }
    }








    // FRONT-END Part 1
    // --------------------------------------

    renderInputAdornment = () => {
        return (
            <InputAdornment position="end">
                {this.state.lookedUp?
                <Button onClick={this.clearUrl} variant="contained" color="secondary"><i className="fas fa-backspace"></i></Button>
                :<Button onClick={this.lookupUrl} variant="contained" color="primary"><i className="fas fa-search"></i></Button>}
            </InputAdornment>
        ) ;
    }

    renderPart1 = () => {
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






    // FRONT-END Part 2
    // --------------------------------------

    renderPart2 = () => {
        if (this.state.lookedUp && this.state.owner!=null) {
            return (
                 <TextField
                    label="Current owner"
                    variant="outlined"
                    fullWidth={true}
                    defaultValue={this.formatOwner(this.state.owner)}
                    disabled={true} />) ;
        } else {
            return "";
        }
    }

    formatOwner = (owner) => {
        if (owner===this.DEFAULT_ACCOUNT) {
            return "-" ;
        } else if (owner===this.context.account.address) {
            return "You are the owner!" ;
        } else {
            return owner ;
        }
    }






    // FRONT-END Part 3
    // --------------------------------------

    renderPart3 = () => {
        if (this.state.lookedUp && this.state.owner!=null && this.state.owner!==this.context.account.address) {
           return (
                 <React.Fragment>
                    <Divider />
                    <br/>
                    <Typography variant="subtitle1" >
                        Preparation
                    </Typography>

                    <Typography variant="subtitle2" >
                        1. Copy this mark
                    </Typography>
                    <br/>
                    <TextField
                        label="Ownership mark"
                        variant="outlined"
                        fullWidth={true}
                        defaultValue={"wika.network/author/" + this.context.account.addressRaw}
                        disabled={true}
                        InputProps={{endAdornment:<InputAdornment position="end">
                                                    <Button onClick={this.copyMark}
                                                            variant="contained"
                                                            color="primary">Copy this</Button>
                                                   </InputAdornment>}}/>
                    <br/><br/>

                    <Typography variant="subtitle2" >
                        2. Insert it in your webpage as proof of ownership <br/>
                        <small>(Use an invisible img or link for example.)</small>
                    </Typography>

                    <br/>

                    <Typography variant="subtitle2" >
                        3. Submit your request <br/>
                        <small>Note that the request fee is {this.state.requestPrice} W</small>
                    </Typography>

                </React.Fragment>
            ) ;
        } else {
            return "";
        }
    }

    renderTestResult = () => {
        if (this.state.testResult==null) {
            return "" ;
        } else if (this.state.testResult===true) {
            return "YES" ;
        } else {
            return "NO" ;
        }
    }



    // FRONT-END Part 4
    // --------------------------------------

    renderPart4 = () => {
        if (this.state.lookedUp) {
            let currentRequester = this.state.requestAccount ;
            if (currentRequester==null || currentRequester===this.DEFAULT_ACCOUNT) {
                return this.renderSubmitRequest() ;
            } else if (currentRequester===this.context.account.address) {
                return this.renderMyRequest() ;
            } else {
                return this.renderOtherRequest() ;
            }
        } else {
            return "" ;
        }
    }

    renderSubmitRequest = () => {
        if (this.state.owner!==this.context.address) {
            return (
                <Container align="center">
                    {this.state.txStatus==null?
                     <Button color="primary" variant="contained"
                             onClick={this.submitRequest}>Submit your request</Button>:
                     <CircularProgress />
                    }
                </Container>
            ) ;
        } else {
            return "" ;
        }
    }

    renderMyRequestProgress = () => {
        let blocks_done = this.state.currentBlock - this.state.requestBlock ;
        let progress = 100 * blocks_done / this.NUM_BLOCKS_TO_WAIT ;
        return (
            <React.Fragment>
                <Divider />
                <br/>
                <Typography variant="subtitle2" >
                    Waiting for verification results ({blocks_done}/{this.NUM_BLOCKS_TO_WAIT})...
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
            </React.Fragment>
        )
    }

    renderMyRequestResult = () => {
        let icon = this.state.resultOutcome===true?"fas fa-vote-yea":"fas fa-times" ;
        let outcome = this.state.resultOutcome===true?"approved":"rejected" ;
        return (
            <React.Fragment>
                <hr/>
                <br/>
                <Typography variant="body1">
                    <i className={icon}></i>
                    &nbsp;&nbsp;
                    Your request was {outcome}.
                </Typography>
                <br/>
                <Typography variant="body2">
                    Verifications: <strong>{this.state.resultNumVotes}</strong>
                </Typography>
                <br/>
                <Typography variant="body2">
                    Approvals: <strong>{this.state.resultNumVotesYes}</strong>
                </Typography>
                <br/>
                <Typography variant="body2">
                    Evidence data:
                </Typography>
                <br/>
                <TextField
                    label="Page intro"
                    variant="outlined"
                    fullWidth={true}
                    defaultValue={bytesToString(this.state.resultIntro)}
                    disabled={true} />
                <br/>
                <TextField
                    label="Mark found"
                    variant="outlined"
                    fullWidth={true}
                    defaultValue={bytesToString(this.state.resultMark)}
                    disabled={true} />
            </React.Fragment>
        )
    }

    renderMyRequest = () => {
        if (this.state.resultBlock===0) {
            return this.renderMyRequestProgress() ;
        } else {
            return this.renderMyRequestResult() ;
        }
    }

    renderOtherRequest = () => {
        return (
            <Typography variant="body1" >
                <i className="fas fa-exclamation-triangle"></i> &nbsp;
                There is currently another user trying to claim ownership for this URL.
            </Typography>
        )
    }






    // And finally the render function!
    // --------------------------------------


    render() {
        return (
            <div>
                {this.renderPart1()}
                <br/><br/>
                {this.renderPart2()}
                <br/><br/>
                {this.renderPart3()}
                <br/><br/>
                {this.renderPart4()}
            </div>
        );
    }

}


export default ClaimPage ;


