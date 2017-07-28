import { config } from './env'
import store from '@/store'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  if(!store.state.adminInfo.islogin){
    //window.location.href=config.home
  }
  type = type.toUpperCase()
  url = config.baseUrl + url

	if (type == 'GET') {
		let dataStr = '' //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&'
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
			url = url + '?' + dataStr
		}
	}
  // alert(window.fetch);
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}

		try {
			const response = await fetch(url, requestConfig)
			const responseJson = await response.json()
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
			  //alert('xml')
				requestObj = new XMLHttpRequest()
			} else {
			  //alert('act');
				requestObj = new ActiveXObject
			}



			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data)
			}

			requestObj.open(type, url, true);
			//requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      requestObj.setRequestHeader("Content-type","application/json")
      //requestObj.setRequestHeader("Origin","*")
      //alert(sendData)
			requestObj.send(sendData)

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj)
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
