

class StorageWeb {

  constructor() {
    this.memory = {} ;
    let account1 = window.BACKGROUND.importAccount("script online mail crystal echo bind silver shrug panel prepare elite age") ;
    account1.accountName = 'PublicTest' ;
    let account2 = window.BACKGROUND.generateAccount() ;
    account2.accountName = 'RandomTest' ;
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