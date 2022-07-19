import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

class Like2 extends React.Component {


    render = () => {
        return (
            <Container align="center">
                   <Card sx={{width: '75%', paddingBottom: '20px', borderRadius: '25px'}}>
                        <CardHeader title="Thank you!"
                                    subheader={this.props.url}
                        />
                        <CardContent>
                            <Typography>
                                You sent <strong>{this.props.likesSubmittedCount} likes</strong>.
                            </Typography>
                            <br/>
                            <Typography>
                                You are ranked <strong>#{this.props.likesSubmittedAt+1}</strong> on the queue of people who liked this page,
                                therefore, you will start receiving rewards when it hits {(this.props.likesSubmittedAt*this.props.rewardWaitFactor)+2} likes.
                            </Typography>
                        </CardContent>
                   </Card>
            </Container>
        );
    }

}

const Container = styled.form`
    flex: 3;
    display: flex;
    justify-content: center;
`
export default Like2 ;


