
function parseUri (url) {
	var	o   = options = {
			strictMode: false,
			key: ["source","protocol","host","userInfo","user","password","authority","port","relative","path","directory","file","query","anchor"],
			q:   {
				name:   "queryKey",
				parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
			parser: {
				strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
				loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
			}
		},
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(url),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};


//////////////////////////////////单点登录开始//////////////////////////////////
var cfg = {};
cfg.openSSO = true;//启用单点登录
cfg.loginUrl = "http://10.41.24.2:8080";//单点登录服务地址
cfg.usifApi = "http://10.41.24.2:8080/usif";//usif服务地址
cfg.webApi = "http://10.41.24.2:8082/api-hnsl";//测试api地址，当api响应401时，进行单点登录
cfg.menu = "";//菜单id
cfg.window = top;//跳转的窗口对象，默认为当前顶层窗口
cfg.ssoLoginAfter = function(){}//登录成功后执行的函数
cfg.cros = {};//跨域相关
cfg.cros.options = function(url,ops,loc){//loc默认为cfg.window.location
	try{
		loc = loc || parseUri(cfg.window.location.href);

		var uri = parseUri(url);
		if(('undefined'===typeof ops.cros || ops.cros===true) && loc.host!=uri.host){
			ops.crossDomain = true;
			ops.xhrFields = {withCredentials: true};
		}

	}catch(e){
		console.log(e);
	}

	return ops;
}



function startSSO(ssoLoginAfter){
	cfg.ssoLoginAfter = ssoLoginAfter;

	if(cfg.openSSO && 'string'===typeof cfg.loginUrl && cfg.loginUrl.length>0){
	 $.ajax({
			url:cfg.loginUrl+"cas/js/passport.js?callback=jsonp_callback",
			dataType: "jsonp",
      async: false,
			scriptCharset: "utf-8"
		});
	} else {
		cfg.ssoLoginAfter();
	}
}

function jsonp_passport(data){
	var hosts = {};

	function test_sso_is_login(){
		if(!cfg.openSSO){
			return;
		}
		var url=cfg.webApi+ 'api/cros';

		var ops = {
		  url: url,
		  success: function(data,status,xhr){
			  cfg.ssoLoginAfter();//成功后进行页面初始化
		  },
		  error: function(xhr, textStatus, errorThrown) {
			if (cfg.openSSO && xhr.status == 401) {
				var service = cfg.usifApi+"index.jsp?menu="+cfg.menu;
				cfg.window.location.href = cfg.loginUrl+'cas/login?service=' + encodeURIComponent(service);
			}else{
			  cfg.ssoLoginAfter();//其它失败后进行页面初始化
			}
		  }
		};

		ops = cfg.cros.options(url,ops,location);

		$.ajax(ops);
	}

	if('function'===typeof window.postMessage){
		var isc = 0;

		var handler = function(event){
			var data = event.data;

			console.log("cas window receive data is "+JSON.stringify(data));
			if('string'!==typeof data.host){
				return;
			}

			hosts[data.host] = true;
		}

		if(window.addEventListener){
			window.addEventListener('message',handler);
		} else {
			window.attachEvent('onmessage',handler);
		}

		window.onmessage = handler;

		var callbackTimes = 300;//60秒超时
		var timer = window.setInterval(function(){
			callbackTimes --;
			var v = true;
			for(var key in hosts){
				if('boolean'==typeof hosts[key] && !hosts[key]){
					v = false;
					break;
				}
			}

			if(v || callbackTimes<0){
				test_sso_is_login();
				window.clearInterval(timer);
			}

		},200);
	}else{
		window.setTimeout(function(){
			test_sso_is_login();
		},icount * 250 + 500);//延时调用，cros.jsp加载完成

	}



	data && data.sso && $.each(data.sso, function() {
		var container = $('#sso');
		if(0==container.length){//创建此元素
			var $sso = $('<div id="sso" ></div>');
			$(document).appendTo($sso);
		}

		container = $('#sso');

		var $frm = $('<iframe style="width:1px;height:1px;display:none;" src="'+this+'" />');
		hosts[parseUri(this).host] = false;
		$frm.appendTo(container);
	});

}
//////////////////////////////////单点登录结束//////////////////////////////////
