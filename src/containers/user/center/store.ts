import { createContext } from 'react'
import { action, observable } from 'mobx'
import Common from '../../../lib/common/fetch'

class Store {
  @observable params = { pageSize: 20, currentPage: 1 }

  @observable list: any[] = []

  // @observable totalCount?: number = 0

  @observable permissions = []

  @observable recordList: any[] = []

  @action
  setRecordList = (data: any) => {
    this.recordList = data
  }

  @action
  fetchList = (params = this.params) => {
    Common.newFetch({
      url: '/v1/book/latest',
      params
    }).then((res) => {
      if (res['code'] === '0') {
        const { totalCount, list } = res['data']
        this.updateList(list, totalCount)
      }
    })
  }

  @action
  handleSearch = (val: any) => {
    this.params = Object.assign({}, this.params, val)
    this.fetchList(this.params)
  }
  @action
  changePage = (val: any) => {
    this.params = Object.assign({}, this.params, val)
    this.fetchList()
  }
  @action
  updateList = (data: any, totalCount: any) => {
    this.list = data
    // this.totalCount = totalCount
  }

}

export default createContext(new Store())
