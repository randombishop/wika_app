import React from 'react';
import {web3FromSource} from '@polkadot/extension-dapp';


import AppContext from "../../utils/context";
import {formatWika, parseError} from "../../utils/misc";


class Like1 extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            numLikes: 1
        };
    }

    handleNumLikeChange = (event) => {
        this.setState({numLikes: event.target.value}, this.update) ;
    }

    submitLike = () => {
        let self = this;
        let url = self.props.url ;
        let referrer = self.state.referrer ;
        let numLikes = self.state.numLikes ;
        let source = self.context.account.source ;
        let address = self.context.account.address ;
        web3FromSource(source).then((injector) => {
            self.setState({txStatus: 'Sending...'}, () => {
                self.context.wikaNetwork.txLike(address, injector, url, referrer, numLikes, self.monitorLike).then((s) => {
                    self.unsubTransaction = s;
                }).catch((err) => {
                    self.setState({txStatus: null}) ;
                    alert(err) ;
                }) ;
            });
        }) ;
    }

    monitorLike = (result) => {
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

    renderButton = () => {
        if (this.state.txStatus==null) {
            return (
                <button onClick={this.submitLike}>
                    Send {this.state.numLikes} <i className="fas fa-thumbs-up"></i>
                </button>
            );
        } else {
            return (
                <button disabled>
                    <i className="fas fa-spinner"></i> {this.state.txStatus}
                </button>
            ) ;
        }
    }

    render = () => {
        return (
            <React.Fragment>

                <p>
                    This page received <strong>{this.props.urlLikes} likes</strong>.
                </p>

                <hr/>

                <h5>Send likes to this page:</h5>

                <strong>Which URL referred you to the page?</strong>
                <input type="text" />

                <strong>How much do you like it?</strong>
                <div style={{display:'flex'}}>
                    <div style={{marginTop:'15px'}}>
                        <input style={{width:'250px'}}
                               type="range" min="1" max="100"
                               value={this.state.numLikes}
                               onChange={this.handleNumLikeChange} />
                    </div>
                    <div style={{marginTop:'10px', marginLeft:'15px'}}>
                        <strong>{this.state.numLikes} <i className="fas fa-thumbs-up"></i></strong>
                    </div>
                </div>

                <strong>Cost of this transaction</strong>
                <input style={{textAlign:"right"}}
                       type="text"
                       readOnly
                       value={formatWika(this.props.likePrice*this.state.numLikes)}
                />

                {this.renderButton()}

            </React.Fragment>
        );
    }

}


export default Like1 ;
