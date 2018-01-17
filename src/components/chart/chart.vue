<template>
  <div id="echarts">
    <!--<router-link to="/chart">获取</router-link>-->  <!--测试routerlink跳转页面-->
    <div id="map" style="width: 2500px;height: 1500px"></div>
  </div>
</template>

<script>
  let _this=null;
export default {
  mounted() {
    this.initChart();
    this.drawChart();
    this.setOpt();
  },
  created() {
    this.$root.eventHub.$on('eventName',(data) => {
      this.changeChart(data);
    });
  },
  name:'chart',
  data () {
    return {
      echarts: require('echarts'),
      myChart:null,
      bmap:require('echarts/extension/bmap/bmap'),
    }
  },
  computed:{
    optData(){
      return this.$store.state.optionData;
    }
  },
  methods:{
    initChart() { //初始化echarts容器
      _this=this;
      this.myChart = this.echarts.init(document.getElementById('map'));
//    vue-resource发起http请求
//    this.$http.post('http://127.0.0.1:3000/data').then(successCallback=>{
//        console.log("http request success");
//        console.log(successCallback);
//      }, errorCallback=>{
//        console.log("error",errorCallback);
//      });
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
    changeChart(point){
//      console.log(point);
      let points=this.$store.state.optionData;
      var newOp=this.myChart.getOption();
      newOp.series[0].data=points;
      this.myChart.setOption(newOp);
    },
    setOpt(){
      //这里设置option，使用store中的数据，是否会自动更新
    }

  }
}
</script>

<style>

</style>
