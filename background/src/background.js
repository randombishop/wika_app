import {cryptoWaitReady} from '@polkadot/util-crypto';
import WikaNetwork from './network.js' ;


window.BACKGROUND = {
    network: new WikaNetwork(),
    cryptoReady: false
}

cryptoWaitReady().then(() => {
    window.BACKGROUND.cryptoReady = true;
}) ;

