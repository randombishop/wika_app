import React from 'react';
import Typography from '@mui/material/Typography';


import AppContext from "../../utils/context";


class SignTransaction extends React.Component {

    static contextType = AppContext;

    render() {
        return (
            <div>
                <Typography variant='h6'>
                    Transaction type: {this.context.transactionType}
                </Typography>
                {JSON.stringify(this.context.transactionParams)}
            </div>
        );
    }

}

export default SignTransaction ;


