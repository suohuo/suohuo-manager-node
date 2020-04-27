import React from 'react'
import { Button } from 'antd'
import style from './style/layout'

const AppComponent = () => {
  return (
    <div className={style.soho_layout_wrap}>
      <div className={style.soho_layout_header}>header</div>
      <div className={style.soho_layout_center}>
       <div className={style.soho_layout_menu}>menu</div>
       <div className={style.soho_layout_content}>content</div>
      </div>
    </div>
  )
}

export default AppComponent