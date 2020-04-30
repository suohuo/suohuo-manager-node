import React from 'react'
import Search from './search'
import List from './list'


const User = () =>  {
  return (
    <>
      <div className="search_box">
       <Search />
      </div>
      <div className="table_box">
       <List />
      </div>
    </>
  )
}

export default User