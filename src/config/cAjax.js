/**
 * Created by Administrator on 2017/7/18.
 */
import { config } from './env'
import $ from 'jquery'
import store from '@/store'

export default {
  getTgt:(error,success,type='POST',url='v1/tickets',data={}) =>{
    type = type.toUpperCase()
    url = config.casUrl + url
    //alert(url)
    //var cook=getcookie('aa')
    /*if(!cook){
      window.location.href=config.casLogin+'?service='+config.service
    }*/
    $.ajax({
      url:url,
      type:type,
      //async:false,
      contentType:"application/x-www-form-urlencoded",
      xhrFields: {
        withCredentials: true
      },
      data:{username:'fxuser',password:'123',service:'http://192.168.0.238:8082/api-hnsl/api/v0.1/sso/isLogin'},
      crossDomain: true,
      success:success,
      error:error
    })
  },
  getTic:(success,type='POST',url='v1/tickets',data={}) =>{
    type = type.toUpperCase()
    $.ajax({
      url:url,
      type:type,
      //async:false,
      contentType:"application/x-www-form-urlencoded",
      xhrFields: {
        withCredentials: true
      },
      data:{service:'http://192.168.0.238:8082/api-hnsl/api/v0.1/sso/isLogin'},
      crossDomain: true,
      success:success
    })
  },
  isLogin:(type='GET',url='/api/v0.1/sso/isLogin',data={}) =>{
    type = type.toUpperCase()
    url = config.baseUrl + url
    $.ajax({
      url:url+'?ticket='+store.state.adminInfo.ticket,
      type:type,
      //async:false,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success:function (data) {
        store.state.adminInfo.islogin=true;
      }
    })
  },

}

