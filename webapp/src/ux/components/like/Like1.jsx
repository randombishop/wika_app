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
import sendTransaction from '../../utils/send_transaction' ;


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
