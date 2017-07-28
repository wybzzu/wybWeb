/**
 * Created by Administrator on 2017/7/18.
 */

import {getAdcd, getWeather} from '@/api/getData'
import { config } from '@/config/env'
import sso from '@/config/cAjax'
import store from '@/store'

export default () => {
  var success=function (data) {
    var html=$(data)
    var url=html[2].action
    sso.getTic(function(data){
     // alert(data)
      store.state.adminInfo.ticket=data;
      sso.isLogin()
    },"POST",url)

    console.log('登陆成功')
  }
  var error=function (err) {
    console.log('请先登陆系统')
  }
  sso.getTgt(error,success,"POST")
}
