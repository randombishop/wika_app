import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

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
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => this.context.navigate('splash')}
                  >
                    <img src="images/logo_alt1.png" alt="" width="32" height="32" />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <NetworkButton />
                  </Typography>
                  <AccountButton />
                </Toolbar>
              </AppBar>
            </Box>
        );
    }

}


export default NavBar ;



