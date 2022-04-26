import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {web3FromSource} from '@polkadot/extension-dapp';


import AppContext from "../../utils/context";
import {parseError} from "../../utils/misc";


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
                <Button variant="contained" onClick={this.submitLike}>
                    Send {this.state.numLikes} &nbsp;<i className="fas fa-thumbs-up"></i>
                </Button>
            );
        } else {
            return (
                <Button disabled>
                    <i className="fas fa-spinner"></i> {this.state.txStatus}
                </Button>
            ) ;
        }
    }

    render = () => {
        return (
            <React.Fragment>

               <Container align="center">
                   <Card sx={{width: '75%'}}>
                        <CardHeader title="Like transaction"
                                    subheader={this.props.url}
                        />
                        <CardContent>
                            <Stack direction="row" sx={{width:'75%'}}>
                                <Slider aria-label="Number of likes" value={this.state.numLikes} onChange={this.handleNumLikeChange} />
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Container>{this.renderButton()}</Container>
                        </CardActions>
                   </Card>
               </Container>

            </React.Fragment>
        );
    }

}


export default Like1 ;
