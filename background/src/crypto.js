import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { Keyring } from '@polkadot/api';
import { mnemonicGenerate } from '@polkadot/util-crypto';


function bytesToHex(byteArray) {
  var s = '0x';
  byteArray.forEach(function (byte) {
      s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
  });
  return s;
}

function encryptWithAES(text, passphrase)  {
  return AES.encrypt(text, passphrase).toString();
};

function decryptWithAES(ciphertext, passphrase) {
  const bytes = AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(Utf8);
  return originalText;
};

function importAccount(phrase) {
  let keyring = new Keyring({ type: 'sr25519' });
  let newPair = keyring.addFromUri(phrase) ;
  let account = {
      address: newPair.address,
      addressRaw: bytesToHex(newPair.addressRaw),
      phrase: phrase,
      accountName: '<Account Name>'
  } ;
  return account ;
}

function generateAccount() {
  let phrase = mnemonicGenerate(12);
  return importAccount(phrase) ;
}



window.CRYPTO = {
    encryptWithAES: encryptWithAES,
    decryptWithAES: decryptWithAES,
    importAccount: importAccount,
    generateAccount: generateAccount
}
