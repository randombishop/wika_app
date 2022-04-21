import React from 'react';


import AppContext from "../../utils/context";


class OwnedPages extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {urls: null};
    }

    componentDidMount = () => {
        this.queryApi() ;
    }

    queryApi = () => {
        const self = this;
        const address = this.context.account.address;
        const url = this.context.apiEndpoint.url + '/user/' + address + '/owned_urls' ;
        console.log(url) ;
        fetch(url)
          .then(response => response.json())
          .then(data => {self.setState({urls: data});});
    }

    render() {
        return (
            <div className="main-content">
                <h2>Owned pages</h2>
                {JSON.stringify(this.context.apiEndpoint)}
                <br/>
                {JSON.stringify(this.state.urls)}
            </div>
        );
    }

}

export default OwnedPages ;


