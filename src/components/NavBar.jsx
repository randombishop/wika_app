import React from 'react';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';


import AppContext from "../utils/context";
import NetworkButton from "./NetworkButton";
import AccountButton from "./AccountButton";


class NavBar extends React.Component {

    static contextType = AppContext;

    navigate = (tab) => {
        this.context.navigate(tab);
    }

    render() {
        return (
            <div className="main-navbar">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Fab size="small"
                             color="default"
                             aria-label="home"
                             onClick={() => this.context.navigate('splash')}>
                            <img src="images/logo_alt1_black.png" alt="" width="24" height="24" />
                        </Fab>
                    </Grid>
                    <Grid item xs={6} align="center">
                        <NetworkButton />
                    </Grid>
                    <Grid item xs={3} align="right">
                        <AccountButton />
                    </Grid>
                </Grid>
            </div>
        );
    }

}


export default NavBar ;



