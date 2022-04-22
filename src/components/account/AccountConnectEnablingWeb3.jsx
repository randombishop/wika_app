import React from "react";
import {web3Enable} from '@polkadot/extension-dapp';


class AccountConnectEnablingWeb3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wallets: null,
            mode: 'web3'
        };
    }

    componentDidMount = () => {
        this.enableWeb3();
    }

    enableWeb3 = () => {
        this.setState({wallets: null}, () => {
            web3Enable("Wika Network").then((result) => {
                this.setState({wallets: result});
            });
        });
    }

    renderSwitch = () => {
        if (this.state.wallets === null) {
            return this.renderWait();
        } else if (this.state.wallets.length === 0) {
            return this.renderNone();
        } else {
            return this.renderOk();
        }
    }

    renderWait = () => {
        return (
            <p>
                <i className="fas fa-spinner"></i>
                Waiting for wallet's authorization...
            </p>
        );
    }



    renderNone = () => {
        return (
            <React.Fragment>
                <p>
                    <strong>No Polkadot wallets detected.</strong>
                    <br/>
                    Please install one and make sure you authorize this app to use it.
                </p>
                <div style={{textAlign: 'right'}}>
                    <a href="/#" role="button" className="secondary" >Install Pokadot-JS Extension</a>
                    &nbsp;&nbsp;
                    <a href="/#" role="button" className="primary" onClick={this.enableWeb3}>Retry</a>
                </div>
            </React.Fragment>
        );
    }

    renderOk = () => {
        return (
            <React.Fragment>
                <strong>Polkadot wallets detected:</strong>
                {this.renderWalletsTable()}
                <button onClick={this.props.next}>Continue</button>
            </React.Fragment>
        );
    }

    renderWalletsTable = () => {
        return (
           <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                {this.renderWalletsRows()}
              </tbody>
            </table>
        ) ;
    }

    renderWalletsRows = () => {
        let ans = [] ;
        for (let i in this.state.wallets) {
            let wallet = this.state.wallets[i] ;
            ans.push(
                <tr key={i}>
                  <td>{wallet.name}</td>
                  <td>{wallet.version}</td>
                </tr>
            ) ;
        }
        return ans ;
    }

    render = () => {
        return (
            <div className="main-content">
                <h5>Enabling Polkadot Wallets</h5>
                {this.renderSwitch()}
            </div>
        );
    }

}

export default AccountConnectEnablingWeb3;


