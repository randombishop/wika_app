/* global chrome */


class StorageApp {

  get = (key, callback) => {
    var item = window.localStorage.getItem(key) ;
    if (item) {
        item = JSON.parse(item);
    }
    callback(item) ;
  }

  set = (key, value, callback) => {
    const item = JSON.stringify(value) ;
    window.localStorage.setItem(key, item) ;
    if (callback) {
        callback() ;
    }
  }

}

class StorageExt {

  get = (key, callback) => {
    chrome.storage.local.get([key], (result) => {
        callback(result[key]) ;
    }) ;
  }

  set = (key, value, callback) => {
    const data = {} ;
    data[key] = value ;
    chrome.storage.local.set(data, callback) ;
  }

}

export {StorageApp, StorageExt}