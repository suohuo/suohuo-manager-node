import React from 'react';
// import { hot } from 'react-hot-loader/root'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import AppComponent from './app'

import './style/index.scss';
import 'antd/dist/antd.css'

const App: React.FC = () => {
  return (
    <HashRouter>
     <AppComponent />
    </HashRouter>
  )
}

// const HotApp = hot(module)(App)

ReactDOM.render(<App />, document.getElementById('root'));
