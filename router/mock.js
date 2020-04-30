const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const router = new Router()



router.all('*', ctx => {

  const FILEDIRECTORY = ctx.request.path.split('/')
  const FILE = FILEDIRECTORY[FILEDIRECTORY.length - 1]
  FILEDIRECTORY.pop() 
  //获取mock文件的路径
  const JSONFILEPATH = path.join(__dirname, '../mock', FILEDIRECTORY.join('/'), `${FILE}.json`)
  if(fs.existsSync(JSONFILEPATH)) {
    ctx.body = JSON.parse(fs.readFileSync(JSONFILEPATH))
  } else {
    ctx.body = {
      code: '0',
      desc: '成功',
      data: '0'
    }
  }
})


module.exports = router