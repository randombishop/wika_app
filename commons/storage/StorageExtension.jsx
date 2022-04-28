

class StorageExtension {

  get = (key) => {
    return Promise.resolve(null) ;
  }


  set = (key, value) => {
    return Promise.resolve();
  }

}

export default StorageExtension;