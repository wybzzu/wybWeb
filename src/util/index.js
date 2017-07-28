var util = {}
util.formatDate = function (formatStr, date) {
  if (!formatStr || typeof formatStr !== 'string') {
    formatStr = 'yyyy-MM-dd HH:mm'
  }
  var dict = {
    'yyyy': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'MM': ('' + (date.getMonth() + 101)).substr(1),
    'dd': ('' + (date.getDate() + 100)).substr(1),
    'HH': ('' + (date.getHours() + 100)).substr(1),
    'mm': ('' + (date.getMinutes() + 100)).substr(1),
    'ss': ('' + (date.getSeconds() + 100)).substr(1)
  }

  return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]]
  })
}
util.getCurWeek = function (date) {
  var str = ''
  var week = date.getDay()
  if (week === 0) {
    str = '周日'
  } else if (week === 1) {
    str = '周一'
  } else if (week === 2) {
    str = '周二'
  } else if (week === 3) {
    str = '周三'
  } else if (week === 4) {
    str = '周四'
  } else if (week === 5) {
    str = '周五'
  } else if (week === 6) {
    str = '周六'
  }
  return str
}
util.addDayStr = function (days, formatStr, pDate) {
  var date = new Date(pDate.getTime() + days * 24 * 60 * 60 * 1000)
  if (!formatStr || typeof formatStr !== 'string') {
    formatStr = 'yyyy-MM-dd HH:mm'
  }
  var dict = {
    'yyyy': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'MM': ('' + (date.getMonth() + 101)).substr(1),
    'dd': ('' + (date.getDate() + 100)).substr(1),
    'HH': ('' + (date.getHours() + 100)).substr(1),
    'mm': ('' + (date.getMinutes() + 100)).substr(1),
    'ss': ('' + (date.getSeconds() + 100)).substr(1)
  }
  return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]]
  })
}

util.addDay = function (days, pDate) {
  var date = new Date(pDate.getTime() + days * 24 * 60 * 60 * 1000)
  return date
}

util.setCookier=function(cookier){
  if(cookier!=null)
    document.cookie=cookier
}

util.getCookier=function(key){
  var strCookie=document.cookie;
  //将多cookie切割为多个名/值对
  var arrCookie=strCookie.split("; ");
  //遍历cookie数组，处理每个cookie对
  for(var i=0;i<arrCookie.length;i++){
    var arr=arrCookie[i].split("=");
    //找到名称为userId的cookie，并返回它的值
    if(key==arr[0]){
      return arr[1]
    }
  }
  return null
}

export default util
