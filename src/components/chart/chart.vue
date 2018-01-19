<template>
  <div id="echarts">
    <!--<router-link to="/chart">获取</router-link>-->  <!--测试routerlink跳转页面2500px;height: 1500px-->
    <div id="map" style="width: 1500px;height: 800px"></div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  let _this=null;
export default {
  mounted() {
    this.initChart();
    this.drawChart();
//    this.mapssid();
//    this.mapfre();//
  },
  created() {
    this.$root.eventHub.$on('eventName',(index) => {
      console.log("event");
      this.changeChart(index);
    });
  },
  name:'chart',
  data () {
    return {
      echarts: require('echarts'),
      myChart:null,
      bmap:require('echarts/extension/bmap/bmap'),
      mid:null,
      schList:[],
      freList:[],
      mfreid:null
    }
  },
  computed:{
    ...mapGetters([
      'getWiFiList',
      'getFreList'
    ])
  },
  watch: {
    getWiFiList: function(li) {
//      this.schList=li;
//      this.mapssid();
    },
    getFreList: function(li) {
//      this.freqList=li;
//      this.mapfre();
    }
  },
  methods:{
    initChart() { //初始化echarts容器
      _this=this;
      this.myChart = this.echarts.init(document.getElementById('map'));
    },
    drawChart(){ //echarts图表的option设置，地图什么的
      _this = this;
      var points=[[121.6042920000,31.1964060000,20]];
//      var points=this.optData;
      let option={
        title: {
          text: ''
        },
        tooltip: {},
        animation:false,
        bmap: {
          center: [121.6042920000,31.1964060000],//地图中心
          zoom: 20,//缩放值
          roam: true
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red']
//                color: ['red', 'red', 'green', 'yellow', 'blue']
          }
        },
        series: [{
//          name: 'bz',
          type: 'heatmap',
          coordinateSystem: 'bmap',
          data: points,
          pointSize: 5,
          blurSize: 6
        }]
      };
      _this .myChart.setOption(option,true);
    },
    changeChart(index){
      console.log("changeChart");
      let points=this.$store.state.optionData;
      var newOp=this.myChart.getOption();
      newOp.series[0].data=points;
      console.log("setOpt");
      this.myChart.setOption(newOp);//这一句执行的特别久不知道为啥0.0
      console.log("setOptDone");
    },
    mapssid(){  //map，ssid与索引的对应,
      if(this.schList.length==0){
        this.schList=this.$store.state.wifiList;
      }
      var len=0;
      this.mid = new Map();
      _this=this;
      this.schList.forEach(item=>{
        _this.mid.set(item.name,len);
        len++;
      });
    },
    mapfre(){
      if(this.freList.length==0){
        this.freList=this.$store.state.freList;
      }
//      console.log(this.freList);
      var len1=0;
      this.mfreid = new Map();
      _this=this;
      this.freList.forEach(item=>{
        let tmp=new Map();
        let slen=0;
        item.data.forEach(item1=>{
          tmp.set(item1.name,slen);
          slen++;
        });
        _this.mfreid.set(item.frequency,tmp);
        slen++;
      });
//      console.log(this.mfreid);
    },
    getSchDataById(id){
      console.log(this.schList);
      let index=_this.mid.get(id);
      let datas=this.schList[index].data;
      return datas;
    },
    getFreDataById(id){
      let index1=_this.mfreid.get(id[0]);//fre
      let index2=idmap.get(id[1]);//ssid
      let fre=this.freList[index1].data;
      let coor=fre[index2].coor;
      console.log(fre[index2].name);
      return coor;
    }
  }
}
</script>

<style>

</style>
