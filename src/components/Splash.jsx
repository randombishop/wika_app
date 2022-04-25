import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


import AppContext from "../utils/context";


class Splash extends React.Component {

    static contextType = AppContext;

    renderColumn = (title, image, text) => {
        return (
             <Card>
              <CardMedia
                component="img"
                image={image}
                alt=""
                sx={{width:'80%', marginLeft:'10%', marginTop:'10px'}}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </CardContent>
            </Card>
        ) ;
    }

    render = () => {
        return (
            <div className="main-content">
                <Typography variant="h5">Welcome to the Wika Network!</Typography>
                <br/>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {this.renderColumn(
                        "Consumers",
                        "images/splash1.png",
                        "Like your favorite pages and reward the authors and previous likers.")}
                  </Grid>
                  <Grid item xs={4}>
                    {this.renderColumn(
                        "Authors",
                        "images/splash2.png",
                        "Register any web page and Wika users will be able to reward you directly.")}
                  </Grid>
                  <Grid item xs={4}>
                    {this.renderColumn(
                        "Everyone",
                        "images/splash3.png",
                        "Protect your privacy and promote quality content.")}
                  </Grid>
                </Grid>
                <br/>
                {this.context.account==null?
                    <Container>
                        <Button variant="outlined" onClick={() => this.context.navigate('account')}>
                            Connect your account and get started now!
                        </Button>
                    </Container>
                 :""}
            </div>
        );
    }

}


export default Splash ;


