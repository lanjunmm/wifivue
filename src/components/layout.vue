<template>
  <div class="hello">
    <el-container>
      <el-header>
        <!--<el-button type="success" plain @click="getdata">获取</el-button>-->
        <el-button type="suncess" plain id="exchange" @click="exchange"><i class="fa fa-exchange"></i></el-button>
        <el-button type="suncess" plain id="right" @click="dialogVisible = true"><i class="fa fa-plus-square-o"></i></el-button>
      </el-header>
    </el-container>

    <el-container id="mainContainer">
      <el-aside style="width: 200px" v-if="menuOpen==true">
        <ssid></ssid>
      </el-aside>

      <el-aside style="width: 200px" v-if="menuOpen==false">
        <frequencies></frequencies>
      </el-aside>

      <el-main>
        <chart></chart>
      </el-main>
    </el-container>

 <ssiddialog v-bind:todo="dialogVisible" v-bind:list="list" v-on:closeDia="dialogVisible=false"></ssiddialog>
  </div>
</template>

<script>
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import ElContainer from "../../node_modules/element-ui/packages/container/src/main.vue";
import ElMain from "../../node_modules/element-ui/packages/main/src/main.vue";
import getData from "@/util/getdata.js"
import ElAside from "../../node_modules/element-ui/packages/aside/src/main.vue";
import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu.vue";
import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu.vue";
import reqServer from '@/util/reqServer'
import ssid from './lists/ssid.vue'
import frequencies from './lists/frequencies.vue'
import ssiddialog from './ssiddialog/ssiddialog.vue'
import chart from './chart/chart.vue'
import webStorageGet from '@/util/webStorageGet.js'

let _this=null;

export default {
  mounted() {
    this.getGridDatas();
  },
  components: {
    ElSubmenu,
    ElMenu,
    ElAside,
    ElMain,
    ElContainer,
    ElButton,
    ssid,
    frequencies,
    ssiddialog,
    chart
  },
  name: 'layout',
  data () {
    return {
      menuOpen:true,
      dialogVisible: false,
      list:[]
    }
  },
  methods:{
    getdata:getData,//测试导入模块
    exchange(){//左上角的切换列表的
      if(this.menuOpen){
        this.menuOpen=false;
      }else {
        this.menuOpen=true;
      }
    },
    getGridDatas(){
      _this=this;
      let ids=webStorageGet();
      for(let i=0;i<ids.length;i++){
        let item={  //表格数据&校园网ssid
          SSID:ids[i],
        };
        _this.list.push(item);
      }
//      console.log(_this.list);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped src="../assets/fonts/font-awesome.min.css"></style>-->
<style>
  .el-header {
    background-color: #A3E4D7;
    color: #333;
    line-height: 60px;
  }
  .el-input{
    width: 300px;
    float: left;
  }
  .el-main{
    padding: 0px;
  }
  .el-aside {
    color: #333;
    background-color: #D0ECE7;
  }
  #tableId{
    width: 300px;
    margin-left: 100px;
  }
  #mainContainer{
    height: 1500px;
  }
  .navi{
    font-size: 30px;
  }
  #right{
    float: right;
    margin-top: 8px;
  }
  #exchange{
    float: left;
    margin-top: 8px;
  }
  /*.el-submenu{*/
    /*border: 0.02px solid #E5E8E8*/
  /*}*/
  /*.el-menu-item{*/
    /*border: 0.02px solid #E5E8E8*/
  /*}*/
a {
  color: #42b983;
}

</style>
