import React from 'react'
import Menu from './components/menu'
import ReducerDemo from './containers/reducerDemo'
import style from './style/layout.scss' 

interface Props {
  title?: string
}

const AppComponent: React.FC<Props> = (props) => {
  return (
    <div className={style.soho_layout_wrap}>
      <div className={style.soho_layout_header}>{props.title}</div>
      <div className={style.soho_layout_center}>
        <div className={style.soho_layout_menu}>
          <Menu />
        </div>
        <div className={style.soho_layout_content}>
          <ReducerDemo />
        </div>
      </div>
    </div>
  )
}

export default AppComponent