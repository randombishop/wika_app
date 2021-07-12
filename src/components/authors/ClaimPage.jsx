import React from "react";
import {web3FromSource} from "@polkadot/extension-dapp";


import AppContext from "../../utils/context";
import {bytesToString, convertToWika, copyToClipboard, parseError} from "../../utils/misc";


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
            url: "",
            requestPrice: null,
            owner: null,
            txStatus: null,
            requestBlock: null,
            requestAccount: null,
            currentBlock: null,
            testResult: null
        } ;
    }

    componentDidMount = () => {
        this.getOwnersRequestPrice() ;
        this.subscribeToUrlOwner() ;
        this.subscribeToOwnerRequest() ;
        this.subscribeToOwnerResult() ;
        this.subscribeToBlockNumber() ;
    }

    getOwnersRequestPrice = () => {
        let self = this;
        self.context.wikaNetwork.getOwnersRequestPrice((result) => {
            let price = convertToWika(result) ;
            self.setState({requestPrice:price}) ;
        }).catch((err) => {
            alert(err) ;
        }) ;
    }

    subscribeToUrlOwner = () => {
        let self = this;
        let url = self.state.url;
        self.context.wikaNetwork.getUrlOwner(url, (result) => {
            self.setState({
                owner: result
            }) ;
        }).then((s) => {
            self.unsubUrlOwner = s ;
        }).catch((err) => {
            alert(err) ;
        }) ;;
    }

    subscribeToOwnerRequest = () => {
        let self = this;
        let url = self.state.url;
        self.context.wikaNetwork.getOwnerRequest(url, (result) => {
            self.setState({
                requestBlock:Number(result[0]),
                requestAccount: result[1]
            }) ;
        }).then((s) => {
            self.unsubOwnerRequest = s ;
        }).catch((err) => {
            alert(err) ;
        }) ;;
    }

    subscribeToOwnerResult = () => {
        let self = this;
        let url = self.state.url;
        self.context.wikaNetwork.getOwnerResult(url, (result) => {
            let data = {
                resultBlock: Number(result[0]),
                resultNumVotes: Number(result[1]),
                resultNumVotesYes: Number(result[2]),
                resultNumVotesMajority: Number(result[3]),
                resultIntro: result[4],
                resultMark: result[5],
                resultOutcome: result[6]==true
            } ;
            self.setState(data) ;
        }).then((s) => {
            self.unsubOwnerResult = s ;
        });
    }

    subscribeToBlockNumber = () => {
        let self = this;
        self.context.wikaNetwork.getBlockNumber((result) => {
            self.setState({
                currentBlock:Number(result)
            }) ;
        }).then((s) => {
            self.unsubBlockNumber = s ;
        }).catch((err) => {
            alert(err) ;
        }) ;
    }

    submitRequest = () => {
        let self = this;
        let url = self.state.url ;
        let source = self.context.account.source ;
        let address = self.context.account.address ;
        web3FromSource(source).then((injector) => {
            self.setState({txStatus: 'Sending...'}, () => {
                self.context.wikaNetwork.txOwnerRequest(url, self.monitorRequest).then((s) => {
                    self.unsubTransaction = s;
                });
            })
        }).catch((err) => {
            alert(err) ;
        }) ;
    }

    monitorRequest = (result) => {
        let status = result.status ;
        if (status.isInBlock) {
            this.setState({txStatus: 'In block...'}) ;
        } else if (status.isFinalized) {
            this.setState({txStatus: null}) ;
            this.unsubTransaction();
            let err = parseError(result) ;
            if (err) {
                alert(err) ;
            }
        }
    }

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




    copyMark = () => {
        copyToClipboard("wika_mark_element") ;
    };

    testUrl = () => {
        /*let self = this;
        let url = self.context.url ;
        fetch(url, {
              method: "GET",
            })
            .then(response => console.log(response))
            .catch(err => console.log(err));*/
    };


    renderPreparation = () => {
        if (this.state.owner!=this.context.address) {
            return (
                <React.Fragment>
                    <label>Preparation</label>
                    <div style={{display: 'flex'}}>
                        <div style={{flex: '33%', paddingRight: '10px', textAlign: 'center'}}>
                            <button style={this.styleButton}
                                    className="outline"
                                    onClick={this.copyMark}>
                                1. Copy this
                            </button>
                            <input id="wika_mark_element"
                                   type="text"
                                   readOnly
                                   defaultValue={"wika.network/author/" + this.context.addressRaw}/>
                        </div>
                        <div style={{flex: '33%', textAlign: 'center'}}>
                            <button disabled={true}
                                    style={this.styleButton}
                                    className="outline">2. Insert it</button>
                            <small>(Use an invisible img or link for example.)</small>
                        </div>
                        <div style={{flex: '33%', paddingLeft: '10px', textAlign: 'center'}}>
                            <button disabled={true}
                                    style={this.styleButton}
                                    className="outline"
                                    onClick={this.testUrl}>
                                3. Test it
                            </button>
                            <small>{this.renderTestResult()}</small>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return "" ;
        }
    }

    renderTestResult = () => {
        if (this.state.testResult==null) {
            return "" ;
        } else if (this.state.testResult==true) {
            return "YES" ;
        } else {
            return "NO" ;
        }
    }

    renderButton = () => {
        if (this.state.txStatus==null) {
            return <button onClick={this.submitRequest} style={{marginBottom:'2px'}}>Submit your request</button>
        } else {
            return <button disabled={true} style={{marginBottom:'2px'}}><i className="fas fa-spinner"></i>&nbsp;&nbsp;{this.state.txStatus}</button>
        }
    }

    renderSubmitRequest = () => {
        if (this.state.owner!=this.context.address) {
            return (
                <React.Fragment>
                    {this.renderButton()}
                    <small>Note that the request fee is {this.state.requestPrice} W</small>
                </React.Fragment>
            ) ;
        } else {
            return "" ;
        }
    }

    renderMyRequestProgress = () => {
        let blocks_done = this.state.currentBlock - this.state.requestBlock ;
        let blocks_remaining = this.NUM_BLOCKS_TO_WAIT - blocks_done ;
        return (
            <React.Fragment>
                <hr/>
                <br/>
                <label>Waiting for verification results ({blocks_done}/{this.NUM_BLOCKS_TO_WAIT})...</label>
                <progress value={blocks_done} max={this.NUM_BLOCKS_TO_WAIT}></progress>
            </React.Fragment>
        )
    }

    renderMyRequestResult = () => {
        let icon = this.state.resultOutcome?"fas fa-vote-yea":"fas fa-times" ;
        return (
            <React.Fragment>
                <hr/>
                <br/>
                <div style={{fontSize:'18px', marginBottom:'15px'}}>
                    <i className={icon}></i>
                    &nbsp;&nbsp;
                    Your request was {this.state.resultOutcome?"approved":"rejected"}.
                </div>
                <br/>
                <label>Verifications: {this.state.resultNumVotes}</label>
                <br/>
                <label>Approvals: {this.state.resultNumVotesYes}</label>
                <br/>
                <label>Page intro</label>
                <textarea style={this.styleTextArea}
                          defaultValue={bytesToString(this.state.resultIntro)}
                          readOnly={true} />
                <label>Mark found</label>
                <textarea style={this.styleTextArea}
                          defaultValue={bytesToString(this.state.resultMark)}
                          readOnly={true} />
            </React.Fragment>
        )
    }

    renderMyRequest = () => {
        if (this.state.resultBlock==0) {
            return this.renderMyRequestProgress() ;
        } else {
            return this.renderMyRequestResult() ;
        }
    }

    renderOtherRequest = () => {
        return (
            <p>
                <i className="fas fa-exclamation-triangle"></i> &nbsp;
                There is currently another user trying to claim ownership for this URL.
            </p>
        )
    }


    renderFooter = () => {
        let currentRequester = this.state.requestAccount ;
        if (currentRequester==this.DEFAULT_ACCOUNT) {
            return this.renderSubmitRequest() ;
        } else if (currentRequester==this.context.address) {
            return this.renderMyRequest() ;
        } else {
            return this.renderOtherRequest() ;
        }
    }

    formatOwner = (owner) => {
        if (owner==this.DEFAULT_ACCOUNT) {
            return "-" ;
        } else if (owner==this.context.address) {
            return "You are the owner!" ;
        } else {
            return owner ;
        }
    }

    render() {
        return (
            <div className="main-content">
                <h5>Claim Page Ownership</h5>

                <label>Webpage</label>
                <input type="text" readOnly defaultValue={this.context.url}/>

                <label>Current Owner</label>
                <input type="text" readOnly defaultValue={this.formatOwner(this.state.owner)}/>

                {this.renderPreparation()}

                {this.renderFooter()}

            </div>
        );
    }

}


export default ClaimPage ;


