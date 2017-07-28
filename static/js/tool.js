var tool = {};

Date.prototype.formatDate = function(formatStr) {
	if(!formatStr || typeof formatStr != 'string') formatStr = "yyyy-MM-dd HH:mm";
	var dict = {
		"yyyy": this.getFullYear(),
		"M": this.getMonth() + 1,
		"d": this.getDate(),
		"H": this.getHours(),
		"m": this.getMinutes(),
		"s": this.getSeconds(),
		"MM": ("" + (this.getMonth() + 101)).substr(1),
		"dd": ("" + (this.getDate() + 100)).substr(1),
		"HH": ("" + (this.getHours() + 100)).substr(1),
		"mm": ("" + (this.getMinutes() + 100)).substr(1),
		"ss": ("" + (this.getSeconds() + 100)).substr(1)
	};
	return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
		return dict[arguments[0]];
	});
};

Date.prototype.getCurWeek = function() {
	var str = "";
	var week = this.getDay();
	if(week == 0) {
		str = "周日";
	} else if(week == 1) {
		str = "周一";
	} else if(week == 2) {
		str = "周二";
	} else if(week == 3) {
		str = "周三";
	} else if(week == 4) {
		str = "周四";
	} else if(week == 5) {
		str = "周五";
	} else if(week == 6) {
		str = "周六";
	}
	return str;
};

Date.prototype.addDay = function(days, formatStr) {

	var date = new Date(this.getTime() + days * 24 * 60 * 60 * 1000);
	if(!formatStr || typeof formatStr != 'string')
		return date;

	var dict = {
		"yyyy": date.getFullYear(),
		"M": date.getMonth() + 1,
		"d": date.getDate(),
		"H": date.getHours(),
		"m": date.getMinutes(),
		"s": date.getSeconds(),
		"MM": ("" + (date.getMonth() + 101)).substr(1),
		"dd": ("" + (date.getDate() + 100)).substr(1),
		"HH": ("" + (date.getHours() + 100)).substr(1),
		"mm": ("" + (date.getMinutes() + 100)).substr(1),
		"ss": ("" + (date.getSeconds() + 100)).substr(1)
	};
	return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
		return dict[arguments[0]];
	});
}
