import React from 'react';


import AppContext from "../../utils/context";
import {parseError} from "../../utils/misc";


class Like1 extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            numLikes: 1,
            totalPrice:null,
            rewardsAfter:null,
            rewardCeiling: null
        };
    }

    handleNumLikeChange = (event) => {
        this.setState({numLikes: event.target.value}, this.update) ;
    }

    componentDidMount() {

    }



    submitLike = () => {
        let self = this;
        let url = this.props.url ;
        let referrer = this.state.referrer ;
        let numLikes = this.state.numLikes ;
        /*self.setState({txStatus:'Sending...'}, () => {
            self.context.wikaNetwork.txLike(url, referrer, numLikes, self.monitorLike).then((s) => {
                self.unsubTransaction = s ;
            });
        })*/
    }

    monitorLike = (result) => {
        let status = result.status ;
        if (status.isInBlock) {
            this.setState({txStatus: 'In block...'}) ;
        } else if (status.isFinalized) {
            this.setState({txStatus: null}) ;
            this.unsubTransaction();
            let error = parseError(result) ;
            if (error) {
                alert(error) ;
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
                <input style={{textAlign:"right"}} type="text" readOnly defaultValue={this.state.totalPrice}/>

                {this.renderButton()}

            </React.Fragment>
        );
    }

}


export default Like1 ;
