import React, { memo, Suspense, lazy } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Spin } from 'antd'


const index = memo(({ match: { path } }: RouteComponentProps) => {
  return (
    <Suspense fallback={<Spin />} >
      <Switch>
        <Route path={`${path}`} component={lazy(() => import('../center/index'))} />
      </Switch>
    </Suspense>
  )
})

export default index