/**
 * Created by Administrator on 2017/7/18.
 */

import {getTgt,getSt,stAuth} from '@/api/casLogin'
import { config } from '@/config/env'
import util from '@/util'
import sso from '@/config/cAjax'
import store from '@/store'

export default async(data) => {

  if(data!=null&& typeof data =='object'){
    //设置默认服务
    if(data.service==null||typeof(data.service)=="undefined"){
      data.service=config.defaultApi
    }

    try{
      var data=await getTgt(data)
      if(data.state.status==201){
        var html=$(data.data)
        var url=html[2].action
        var ticket=await getSt({service:config.defaultApi},url)
        //var resu=await stAuth(null,ticket.data,config.defaultApi);
        $.each(config.api,(i,str)=>{
            stAuth(null,ticket.data,str);
          }
        )
        util.setCookier("tgt="+ticket.data)
      }
      return new Promise((resolve, reject) => {
          resolve(data)
      })
    }catch(err){
      alert(err)
    }



  }
}
