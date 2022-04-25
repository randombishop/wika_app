//import StorageExtension from './StorageExtension'
import StorageWeb from './StorageWeb'


const StorageClasses = {
  'extension': StorageWeb,
  'web': StorageWeb
}

function getStorageInterface() {
    const url = window.location.href
    const env = (url.split(':')[0] === 'chrome-extension') ? 'extension' : 'web'
    const storage = new StorageClasses[env]()
    return storage ;
}


export default getStorageInterface;