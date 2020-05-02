import React, { useEffect, useContext } from 'react'
import Search from './search'
import List from './list'
import { observer } from 'mobx-react-lite'
import store from './store'


const User = () =>  {
  const userStore = useContext(store)
  useEffect(() => {
    userStore.fetchList()
  }, [])
  return (
    <>
      <div className="search_box">
       <Search />
      </div>
      <div className="table_box">
       <List />
      </div>
    </>
  )
}

export default observer(User)