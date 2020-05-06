import { createContext } from 'react'
import { action, observable } from 'mobx'
import Common from './lib/common/fetch'

class Store {
 
  @action
  login = (params = {}) => {
    Common.newFetch({
      url: '/v1/token',
      method: 'post',
      data: Object.assign({}, params, {type: 101})
    }).then((res) => {
      console.log(res)
    })

  }


}

export default createContext(new Store())
