import React from "react";
import {keccakAsHex} from "@polkadot/util-crypto";


import {copyToClipboard} from "../../utils/misc";


class Keccak extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            text:"",
            hash:""
        }
    }

    updateText = (event) => {
        this.setState({text:event.target.value}) ;
    }

    generateHash = () => {
        let text = this.state.text ;
        let hash = keccakAsHex(text) ;
        this.setState({
            hash:hash
        }) ;
    }

    copy = () => {
        copyToClipboard("keccak_hash_element") ;
    }

    render() {
        return (
            <div>
                <label>Text</label>
                <textarea value={this.state.text} onChange={this.updateText}/>
                <button onClick={this.generateHash}>Hash</button>
                <input id="keccak_hash_element"
                       type="text"
                       value={this.state.hash}
                       readOnly={true}
                       style={{
                           fontSize: '10px',
                           textAlign: 'center'
                       }}
                />
                <button onClick={this.copy}>Copy to clipboard</button>
            </div>
        );
    }

}


export default Keccak ;

