import {generateAccount} from '../utils/misc' ;


class StorageWeb {

  constructor() {
    this.memory = {} ;
    let account1 = generateAccount() ;
    account1.accountName = 'Test1' ;
    let account2 = generateAccount() ;
    account2.accountName = 'Test2' ;
    this.memory['accounts'] = [
        account1, account2
    ]
  }

  get = (key) => {
    return Promise.resolve(this.memory[key]) ;
  }

  set = (key, value) => {
    this.memory[key] = value ;
    return Promise.resolve() ;
  }

}

export default StorageWeb;