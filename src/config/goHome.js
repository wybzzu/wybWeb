import { config } from './env'
import store from '@/store'
//alert("eeee")

export default ()=>{
  alert(store.state.adminInfo.islogin)
  if(!store.state.adminInfo.islogin){
    window.location.href=config.home
  }
}
