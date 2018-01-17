<template>
  <div id="app">
    <!--<button @click="testget">请求</button>-->
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
import reqServer from '@/util/reqServer'


export default {
  name: 'app',
  created(){
    this.reqServerList();
  },
  methods:{
    reqServerList(){
      console.log("发起请求1");
      reqServer.reqServ(this);//向http发起请求
      reqServer.reqServFre(this);
    },
    testget(){
      $.ajax({
        type:'POST',
        url:'http://127.0.0.1:3000/data',
        datatype: "jsonp",
        crossDomain: true,
        success:function (data) {
          console.log('success');
          console.log("data",data);
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
<!--首页vue-->
