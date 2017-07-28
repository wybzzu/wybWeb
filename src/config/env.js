/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let config={}
config.baseUrl = ''
config.routerMode = 'history'
config.baseImgPath = 'http://images.cangdu.org/'
config.casLogin = 'http://192.168.0.238:80/cas/login/'
config.home = 'http://192.168.0.238:8080/'
config.casUrl='http://192.168.0.238:80/cas/'
config.defaultApi="http://192.168.0.238:8082/api-hnsl/api/v0.1/sso/isLogin"
config.api=["http://192.168.0.238:8082/api-hnsl/api/v0.1/sso/isLogin"]

if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://cangdu.org:8001'
  config.baseUrl = 'http://192.168.0.238:8082/api-hnsl'
} else {
  config.baseUrl = 'http://192.168.0.238:8082'
}

export {config}
