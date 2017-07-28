/**
 * Created by Administrator on 2017/7/21.
 * ajax方式访问cas认证服务器
 */

import { config } from './env'
import $ from 'jquery'

export default (type="POST",url,data={},isCasServer=true)=>{
    if(isCasServer){
      url=config.casUrl+url
    }
    return new Promise((resolve, reject) => {
      $.ajax({
        url:url,
        type:type,
        contentType:"application/x-www-form-urlencoded",
        xhrFields: {
          withCredentials: true
        },
        data:data,
        crossDomain: true,
        success:function(data,msg,obj){
          //var html=$(data)
          //var url=html[2].action
          resolve({data:data,state:obj})
        },
        error:function(err){
          resolve({state:err})
        }
      })
    })
    //var def = $.Deferred();
    //return def;
  }

