import React, { Suspense, lazy } from 'react'
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import { Spin } from 'antd'
import Menu from './components/menu'
import style from './style/layout.scss' 
import RootRouters from './rootRouters'

const AppComponent: React.FC<RouteComponentProps> = (props) => {
  return (
    <div>
     <Suspense fallback={<Spin />}>
      <Switch>
        <Route key='/login' path='/login' exact={true} component={lazy(() => import('./containers/login/index'))} />
      </Switch>
     </Suspense>
    </div>
    // <div className={style.soho_layout_wrap}>
    //   <div className={style.soho_layout_header}>管理系统</div>
    //   <div className={style.soho_layout_center}>
    //     <div className={style.soho_layout_menu}>
    //       <Menu />
    //     </div>
    //     <div className={style.soho_layout_content}>
    //       <Suspense fallback={<Spin />}>
    //         <Switch>
    //           {RootRouters.map(item => {
    //             return <Route key={item.path} path={item.path} exact={item.exact} component={item.componentPath} />
    //           })}
    //           <Redirect to='/' />
    //         </Switch>
    //       </Suspense>
    //     </div>
    //   </div>
    // </div>
  )
}

export default withRouter(AppComponent)