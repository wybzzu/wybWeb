/**
 * 获取认证凭证及相关api服务认证
 */
import casRest from '@/config/casAjax'

/**
 * 获取TGT(全局票据)
 */

export const getTgt = data => casRest('POST','v1/tickets', data)

/**
 * 获取ST(服务票据)
 */
export const getSt = (data,url) => casRest('POST',url, data,false)

/**
 * 服务票据认证
 */
export const stAuth = (data,st,service) => casRest('get',service+"?ticket="+st, data,false)

