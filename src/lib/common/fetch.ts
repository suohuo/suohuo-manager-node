/**
 * common主要是带有界面渲染的公共方法库
 * utils主要是纯js计算类的公共方法库
 */
import * as React from 'react'
import 'whatwg-fetch'


import { message, Modal } from 'antd'
import { ConfigOnClose } from 'antd/lib/message'
import utils from '../utils/util'
// message提示框延迟时间
const MESSAGE_DURATION = 3
interface Option {
  url?: String,
  params?: Object,
  data?: Object,
  method?: String,
  credentials?: RequestCredentials,
  headers?: HeadersInit,
  body?: String,
  postWithQuery?: Boolean,
  isLoading?: Boolean
}
// 关闭加载提示框
// const close = (options: Option) => (res: any) => {
//   if (options.isLoading) {
//     setTimeout(() => {
//       Loading.close()
//     }, 300)
//   }
//   return res
// }
const isVoid = str => {
  if (str === undefined || str === null) {
    return ''
  }
  return str
}
// 拼接请求参数
const concatUrl = (params: any) => {
  const query = Object.keys(params)
    .map(
      (k) => encodeURIComponent(k) + '=' + encodeURIComponent(isVoid(params[k]))
    )
    .join('&')
  return query
}

const common = {
  // 错误处理框，不阻断用户操作
  handleError(msg: string) {
    message.error(msg, MESSAGE_DURATION)
  },
  // 成功处理框，不阻断用户操作
  handleSuccess(msg: string, func?: ConfigOnClose) {
    message.success(msg, MESSAGE_DURATION, func)
  },
  // 错误提示框，阻断用户操作，需要用户自己手动点击关闭
  handleErrorNeedClick(msg: string) {
    Modal.error({
      title: '系统提示',
      content: msg
    })
  },
  // 成功提示框，阻断用户操作，需要用户自己手动点击关闭
  handleSuccessNeedClick(msg: string) {
    Modal.success({
      title: '系统提示',
      content: msg
    })
  },
  handleWarn(msg: string) {
    message.warn(msg, MESSAGE_DURATION)
  },

  newFetch(option: Option) {
    const defaultOption: Option = {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(option.headers || {})
      },
      isLoading: false,
      postWithQuery: false
    }
    const targetOpts: any = utils.deepClone(Object.assign({}, defaultOption, option))
    let { url } = targetOpts
    const { method = 'get', params, data, postWithQuery } = targetOpts
    if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
      // 默认POST参数为JSON格式
      targetOpts.body = JSON.stringify(data)
    }
    if (method === 'get' || postWithQuery) {
      url = params && Object.keys(params).length ? url + '?' + concatUrl(params) : url
    }
    // if (isLoading) {
    //   Loading.open()
    // }
    return fetch(url, targetOpts) // eslint-disable-line no-undef
      .then((response) => {
        if (response.status >= 200 && response.status < 404) {
          return response
        } else {
          const error = new Error(response.statusText)
          error.message = response.toString()
          throw error
        }
      })
      // .then(close(targetOpts), close(targetOpts))
      .then(
        (response) => {
          return response.json().then(
            (res: any) => {
              // SSO登录验证
              if (res.success !== undefined) {
                if (!res.success && !!res.notLogin) {
                  // utils.logout()
                }
              } else {
                // 业务接口成功
                if (res.code !== '0') {
                  this.handleError(res.msg)
                  throw new Error(res.msg)
                }
              }
              return res
            },
            (ex: any) => {
              throw new Error(`解析JSON字符串出错:${url} ${ex.message}`)
            }
          )
        },
        (ex) => {
          throw new Error(`请求服务器出错:${url} ${ex.message}`)
        }
      )
  },
  // 支持post方法放在queryString上

}

export default common
