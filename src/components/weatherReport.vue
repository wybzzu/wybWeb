<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-form ref="form" justify="start" :inline="true" :model="form">
      <el-row :gutter="0" type="flex" justify="end">
        <el-col :xs="24">
          <el-select v-model="value6" placeholder="河南省" @change="change">
            <ul v-for="city in cities">
              <el-option
                v-for="item in city"
                :key="item.adcd"
                :label="item.adnm"
                :value="item"
                :disabled="item.adnm=='省直县'?true:false">
                <span style="float: left">{{ item.adnm }}</span>
              </el-option>
            </ul>
          </el-select>
          <el-button type="primary" @click="qryBtn" icon="search">查询</el-button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button-group>
            <el-button :type="form.btnOne" @click="checkBtn('btnOne')">{{form.one}}</el-button>
            <el-button :type="form.btnTwo" @click="checkBtn('btnTwo')">{{form.two}}</el-button>
            <el-button :type="form.btnThree" @click="checkBtn('btnThree')">{{form.three}}</el-button>
          </el-button-group>

        </el-col>
      </el-row>
    </el-form>

    <el-table  id="tab"
      :data="tableData"
      border
      stripe
      style="width: 100%;margin-top: 25px;"
      max-height="700">
      <el-table-column
        prop="city"
        label="市"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="town"
        label="区/县"
        min-width="150">
      </el-table-column>
      <el-table-column :label="dayLabel">
        <el-table-column
          prop="day.weather"
          label="天气"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="day.windLevel"
          label="风力"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="day.temperature"
          label="气温(℃)"
          min-width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="nightLabel">
        <el-table-column
          prop="night.weather"
          label="天气"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="night.windLevel"
          label="风力"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="night.temperature"
          label="气温(℃)"
          min-width="120">
        </el-table-column>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import Util from '@/util'
import gohome from '@/config/goHome'
import {getAdcd, getWeather} from '@/api/getData'
import $ from 'jquery'
import Vue from 'vue'
import store from '@/store'
var one = new Date()
var two = Util.addDay(1, one)
var three = Util.addDay(2, one)
var curDate=one;
var curBtn='btnOne'


//日期选择按钮对应日期
var date={
  btnOne: one,
  btnTwo: two,
  btnThree: three
}

//日期选择按钮对应未来时间
var flags={
  btnOne: ['12','24'],
  btnTwo: ['36','48'],
  btnThree: ['60','72']
}
var weatherInfo={};
export default {
  name: 'hello',
  data () {
    return {
      msg: '河南省各县市天气预报',
      form: {
        one: Util.formatDate('MM/dd', one) + '(' + Util.getCurWeek(one) + ')',
        two: Util.formatDate('MM/dd', two) + '(' + Util.getCurWeek(two) + ')',
        three: Util.formatDate('MM/dd', three) + '(' + Util.getCurWeek(three) + ')',
        btnOne: 'info',
        btnTwo: 'primary',
        btnThree: 'primary'
      },
      cities:[],
      value6: '河南省',
      dayLabel: Util.formatDate('MM/dd', one) + '(' + Util.getCurWeek(one) + ')'+'（白天）',
      nightLabel: Util.formatDate('MM/dd', one) + '(' + Util.getCurWeek(one) + ')'+'（晚上）',
      tableData: [/*{
      	city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
      	city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
        }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }, {
        city: '郑州',
        town: '金水区',
        day:{weather: '晴', windLevel: '3',temperature: '28'},
        night:{weather: '晴', windLevel: '3',temperature: '31'}
      }*/]
    }
  },
  created () {
    //gohome()
    /*var self=this
    self.initData()
    self.qryBtn()*/
    var self=this
    var aa=setInterval(function(){
      if(Util.getCookier("tgt")){
        self.initData()
        self.qryBtn()
        clearInterval(aa)
      }
    },100)

  },
  methods: {
  	change: function(newValue){
  		//this.value6=newValue
  		this.qryBtn()
    },
    checkBtn: function (par) {
      console.log(par)
      this.form.btnOne = this.form.btnTwo = this.form.btnThree = 'primary'
      this.form[par] = 'info'
      curDate=date[par]
      curBtn=par
      this.dayLabel=Util.formatDate('MM/dd', curDate) + '(' + Util.getCurWeek(curDate) + ')'+'（白天）'
      this.nightLabel=Util.formatDate('MM/dd', curDate) + '(' + Util.getCurWeek(curDate) + ')'+'（夜晚）'
      this.initWeather(weatherInfo.result)
    },
    async initData () {
    	// 获取政区
      const adcdData = await getAdcd({ adgrd: '0,1,2,3'})
      console.log(adcdData.result.result)
      // 初始化政区选择框
      this.initAdcd(adcdData.result.result)

    },
    async qryBtn () {
    	var param;
    	if(this.value6==''){
        param={ad: '4100', adgrd: '0', bgtm: Util.formatDate('yyyy-MM-dd',one)}
      }else {
        param={ad:this.value6.adcd,adgrd:this.value6.adgrd,bgtm:Util.formatDate('yyyy-MM-dd',one)}
      }
      weatherInfo = await getWeather(param)
      this.initWeather(weatherInfo.result)
    },
    initAdcd:function(data){
    	var adcd=''
    	var cities=[]
    	cities[0]=[]
      cities[1]=[]
    	var n=1
    	var subn=0
    	var sz=0
      cities[0][0]={adcd:"410000000000000",adgrd: "0",adnm: "河南省"}
      cities[1][sz++]={adcd:"410000000000000",adgrd: "0",adnm: "省直县"}
      $.each(data, function(i, obj) {
      	if(obj.adcd!=='410000000000000') {
      		if(obj.adgrd=='2'){
      			cities[1][sz++]=obj
          }else if(adcd!==obj.padcd){
          	n++
          	subn=0
            adcd=obj.adcd
            cities[n]=[]
            cities[n][subn++]=obj
          }else{
            cities[n][subn++]=obj
          }
        }
      });
      this.cities=cities
      console.log(cities)
    },
    initWeather: function (data) {
      var flag=flags[curBtn]
      console.log(JSON.stringify(data))
      //this.tableData.splice(0)
      var adnm=''
      var i=-1
      var tempArr=[]
      $.each(data,function(n, obj){
          if($.inArray(obj.wthfrtp,flag)){
              if(adnm!=obj.ADNM){
              	adnm=obj.ADNM
                i++;
              	var temp=tempArr[i]={};
                temp.day={};
                temp.night={}
                temp.city=obj.PADNM
                temp.town=adnm
                if(flag[0]==obj.WTHFRTP){
                  temp.day.windLevel=obj.WDIR
                  temp.day.weather=obj.WTHDESC
                  temp.day.temperature=obj.MXTMP
                }
                if(flag[1]==obj.WTHFRTP){
                  temp.night.windLevel=obj.WDIR
                  temp.night.weather=obj.WTHDESC
                  temp.night.temperature=obj.MXTMP
                }
              }else{
                var temp=tempArr[i]
                if(flag[0]==obj.WTHFRTP){
                  temp.day.windLevel=obj.WDIR
                  temp.day.weather=obj.WTHDESC
                  temp.day.temperature=obj.MXTMP
                }
                if(flag[1]==obj.WTHFRTP){
                  temp.night.windLevel=obj.WDIR
                  temp.night.weather=obj.WTHDESC
                  temp.night.temperature=obj.MXTMP
                }
              }
          }
      })

      this.tableData=tempArr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    display: inline-block;
    width: 100px;
  }
  ul li:first-child{
    font-size: 14px;
    font-weight: 900;
    overflow: hidden;
  }
  ul{
    margin-left:25px;
  }
  .hello{
    min-width: 768px;
    margin: 20px;
  }
</style>
<style>
  /*覆盖原始样式，缩小单元格高度（40==>15）*/
  .el-table th,.el-table td{
    height: 30px;
  }
</style>
