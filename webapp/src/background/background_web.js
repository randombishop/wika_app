import WikaBackground from './background.js' ;


const BACKGROUND = new WikaBackground() ;


window.getBackground = (callback) => {
    callback(BACKGROUND) ;
}