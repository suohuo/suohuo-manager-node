/**
 * 纯静态html路由
 */
const path = require('path')
const Router = require('koa-router')
const send = require('koa-send')

const router = new Router()

const root = path.join(process.cwd(), '/dist/')

router.get('/', async (ctx) => {
  await send(ctx, 'index.html', { root })
})
router.get(/index(\.html)?$/, (ctx, next) => {
  ctx.redirect('/')
})
router.get(/\.html$/, async (ctx) => {
  await send(ctx, ctx.path.replace('/', ''), { root })
})

module.exports = router
