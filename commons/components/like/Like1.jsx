import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';


import AppContext from "../../utils/context";


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
        let account = self.context.account ;
        let tx = window.BACKGROUND.network.txLike(url, referrer, numLikes) ;
        window.sendTransaction(tx, account, this.monitorLike) ;
    }

    monitorLike = (result) => {
        console.log('monitorLike', result)
        let status = result.status ;
        if (status === 'Sending') {
            this.setState({txStatus: 'Sending transaction...'}) ;
        } else if (status === 'In block') {
            this.setState({txStatus: 'In block...'}) ;
        } else if (status === 'Done') {
            this.setState({txStatus: null}) ;
        } else if (status === 'Error') {
            this.setState({txStatus: null}) ;
            alert("Transaction failed: "+result.err) ;
        } else {
            console.log('Warning, unrecognized monitorLike status', result) ;
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
            <React.Fragment>

               <Container align="center">
                   <Card sx={{width: '75%', paddingBottom: '10px', borderRadius: '25px'}}>
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
