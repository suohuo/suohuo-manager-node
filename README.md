# suohuo-manager-node
索获后台管理系统

启动项目前
先执行：
```
 yarn install
```
开发环境
```
npm run dev
```
打包构建
```
npm run build
```
打开地址
```
http://localhost:7000/
```

# 项目结构

<pre>
.
├── client                             /* 客户端代码 */
│   ├── build                          /* 构建脚本 */
│   │   ├── build.js                   // 生产环境打包入口
│   │   ├── config.js                  // 构建脚本配置
│   │   ├── entry.js                   // 构建入口配置
│   │   ├── utils.js                   // 构建通用工具库
│   │   ├── webpack.base.conf.js       // 构建脚本基础层
│   │   ├── webpack.dev.conf.js        // 构建脚本 - 开发环境
│   │   └── webpack.prod.conf.js       // 构建脚本 - 生产环境
│   ├── html                           /* 入口HTML */
│   │   └── index.html                 /* 首页HTML */
│   ├── mock                           /* mock数据 */
│   │   ├── ...
│   │   └── upload                     // 本地模拟文件上传
│   ├── routes                         /* 本地开发服务路由 */
│   │   ├── mock.js                    // mock数据路由
│   │   └── proxy.js                   // 代理路由
│   ├── server-dev.js                  // 本地开发服务
│   └── src                            /* 业务代码 */
│       ├── components                 /* 通用组件 */
│       ├── containers                 /* 页面代码 */
│       ├── lib                        /* 工具库 */
│       ├── routes                     /* React路由 */
│       ├── stores                     /* Mobx Stores */
│       ├── styles                     /* 全局样式 */
│       ├── index.jsx                  /* 应用入口 */
│       └── App.jsx                    /* 应用主框架 */
├── server                             /* 服务端代码 */
│   ├── config                         /* 主要配置 */
│   │   └── index.js
│   ├── middleware                     /* Koa中间件 */
│   │   ├── logger.js                  // 日志中间件
│   │   └── x-respone-time.js          // 统计接口响应时间
│   ├── routes                         /* Koa路由 */
│   │   ├── index.js                   // 主入口
│   │   ├── html-routes.js             // HTML路由
│   │   └── interface-routes.js        // 接口路由
│   └── static                         /* 一些与业务代码无关的纯静态文件，如favicon.ico, robots.txt */
│       └── favicon.ico                // 网站小图标
├── jsconfig.json
├── package.json
├── postcss.config.js
├── server.js                          // 服务端入口
├── Dockerfile
└── README.md
</pre>
