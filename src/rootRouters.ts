import { lazy } from 'react'

// 这个文件中的配置，只涉及到根级路由；二级开始的路由，全部交给组件自己接管
const rootRouters = [
  {
    path: '/',
    exact: true,
    componentPath: lazy(() => import('./containers/home/index'))
  },
  {
    path: '/userCenter',
    exact: true,
    componentPath: lazy(() => import('./containers/user/home/index'))
  }
]
export default rootRouters