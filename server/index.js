const Koa = require('koa')
const e2k = require('express-to-koa')
const c2k = require('koa-connect')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const devConfig = require('../build/webpack.dev.js')

const router = require('./router.js')

const app = new Koa()

const compiler = webpack(devConfig)

// webpackDevMiddleware默认不支持koa，需要用express-to-koa和koa-connect解决
app.use(
  c2k((req, res, next) => {
    res.statusCode = 200
    next()
  })
)


app.use(
  e2k(
    webpackDevMiddleware(compiler, {
      publicPath: devConfig.output.publicPath,
      stats: 'errors-only',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  )
)
app.use(e2k(webpackHotMiddleware(compiler)))

app.use(router.routes())

app.listen(7000, () => {
  console.log('server is running')
})