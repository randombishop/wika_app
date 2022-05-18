

const BALANCE_UNIT = 1000000000000;
const WIKA_TO_USD = 0.02 ;







// Copy to clipboard

function copyToClipboard(inputId) {
    var copyText = document.getElementById(inputId);
    copyText.select();
    document.execCommand("copy");
}



// Formatting stuff

function convertToWika(value) {
    return value / BALANCE_UNIT;
}

function formatWika(value) {
    if (value != null) {
        return value.toFixed(2) + ' W';
    } else {
        return '-';
    }
}

function wikaToUsd(value) {
    if (value!=null) {
        return value * WIKA_TO_USD ;
    } else {
        return null;
    }
}

function formatUsd(value) {
    if (value != null) {
        return value.toFixed(2) + ' US$';
    } else {
        return '-';
    }
}

function shortenText(text) {
    const maxLength = 50;
    if (text == null) {
        return "";
    } else if (text.length > maxLength) {
        return text.substr(0, maxLength) + '...';
    } else {
        return text;
    }
}

function shortenAddress(address) {
    if (address == null) {
        return "";
    } else {
        return address.substr(0,5) + '...' + address.substr(44) ;
    }
}




// Convert Hex/Bytes/String...

function hexToBytes(hex) {
    if (hex == null) {
        return null;
    }
    if (hex.substr(0, 2) === '0x') {
        hex = hex.substr(2);
    }
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
}

function bytesToString(array) {
    if (array==null) return null ;
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
            default:
                break;
        }
    }
    return out;
}

function bytesToHex(byteArray) {
  var s = '0x';
  byteArray.forEach(function (byte) {
      s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
  });
  return s;
}





// Find an account by address
function findAccount(accounts, address) {
    if (accounts) {
        return accounts.find(x => (x.address===address)) ;
    } else {
        return null ;
    }
}





export {
    copyToClipboard,
    convertToWika, formatWika, wikaToUsd, formatUsd, shortenText, shortenAddress,
    hexToBytes, bytesToString, bytesToHex,
    findAccount
} ;
