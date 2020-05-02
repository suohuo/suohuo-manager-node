import React, { useMemo, useContext,useState } from 'react'
import { Table, Popover, Icon} from 'antd'
import { observer } from 'mobx-react-lite'
import store from '../store'
// import * as utils from 'src/lib/utils'



const List = () => {
  const userStore = useContext(store)
  // const { params: { pageSize, currentPage }, totalCount, permissions } = preStore


  const columns = useMemo(() => {
    return [{
      title: '用户ID',
      dataIndex: 'userId',
      render(text: any) {
        return (
          <>{text}</>
        )
      }
    }, {
      title: '年龄',
      dataIndex: 'userAge'
    }, {
      title: '性别',
      dataIndex: 'userSex'
    }, {
      title: '操作',
      width: '11%'
    }]
  }, [])

  // const pagination = useMemo(() => {
  //   return {
  //     current: currentPage,
  //     total: totalCount,
  //     pageSize,
  //     pageSizeOptions: ['20', '50', '100'],
  //     showSizeChanger: true,
  //     showTotal: (total, range) => `当前显示${range[1]}/${total}条`
  //   }
  // }, [currentPage, pageSize, totalCount])

  function sortChange(page) {
    const { current, pageSize: pageLength } = page
    // preStore.changePage({currentPage: current, pageLength})
  }
  return (
    <>
     <Table rowKey='id' columns={columns} onChange={sortChange} dataSource={userStore.list || []} pagination={false} />
    </>
  )
}



export default observer(List)