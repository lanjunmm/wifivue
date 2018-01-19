<template>
  <el-menu :default-openeds="['1']">
    <el-submenu index="1">
      <template slot="title" class="navi"><i class="fa fa fa-wifi"></i>校园网</template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(item,index) in schList"
          v-bind:index="'1-'+(index+1)"
          :key="index"
          @click="handleSelects(index,schList)">
          {{item.SSID}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title" class="navi"><i class="fa fa fa-wifi"></i>其他wifi</template>
      <el-menu-item-group>
        <el-menu-item
          v-for="(item,index) in otherList"
          v-bind:index="'2-'+(index+1)"
          :key="index"
          @click="handleSelects(index,otherList)">
          {{item.SSID}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  import reqServer from '@/util/reqServer'
  import webStorage from '@/util/webStorage.js'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import $ from 'jquery'

   var _this=null;
  export default {
    components: {
//      ElMenuItem,
//      ElMenuItemGroup,
//      ElSubmenu,
//      ElMenu
 },
    name:'ssid',
    mounted(){
      this.getSchList();
      this.getAllId2();
//      this.setList();
    },
    data(){
      return{
        wifiList:[],//全部的list
        gridData: [
//        {  //表格数据
//        SSID:"ifudan",
//      }, {
//        SSID:"fduwireless",
//      }
        ],//校园网部分名称
        schList:[],
        otherList: [],//其他list
        allList:[]
      }
    },
    computed:{
      ...mapGetters([
        'getWiFiList'
      ])
    },
    watch: {
      getWiFiList: function(li) {
        let vm = this;
        this.getAllId(li);
//        console.log("改变",li);
      }
    },
    methods:{
      getSchList(){
        _this=this;
//        let ids=webStorageGet();
        let ids=webStorage.getId();
        for(let i=0;i<ids.length;i++){
          let item={  //表格数据&校园网ssid
            SSID:ids[i],
          };
          _this.gridData.push(item);
          _this.$store.dispatch("addSchId",ids[i]);
        }
      },
      getAllId(lists){
//        this.wifiList=this.$store.state.wifiList;
        this.wifiList=lists;
//        console.log("获取所有的列表，",this.wifiList);
        this.setList();
      },
      getAllId2(lists){
        this.wifiList=this.$store.state.wifiList;
        this.setList();
      },
      replace(SSIDli){
        SSIDli=$.trim(SSIDli)+"";
        SSIDli=SSIDli.replace(/=/g,'_');
        SSIDli=SSIDli.replace(/'/g,'__');
        SSIDli=SSIDli.replace(/ /g,'___');
        SSIDli=SSIDli.replace(/&/g,'____');
        SSIDli=SSIDli.replace(/@/g,'_____');
        SSIDli=SSIDli.replace(/\(/g,'1');
        SSIDli=SSIDli.replace(/\)/g,'11');
        SSIDli=SSIDli.replace(/\./g,'p');
        return SSIDli;
      },
      setList(){
        console.log("设置列表");
        _this=this;
        let judgeSch=this.$store.state.existSSID;
        this.wifiList.forEach(item=>{
          let tobj={
            SSID:item.name,
            data:item.data
          };
          if(judgeSch[item.name]){
            tobj.SSID=this.replace(tobj.SSID);
            console.log("校园",judgeSch[item.name]);
            _this.schList.push(tobj);
          }else{
            tobj.SSID=this.replace(tobj.SSID);
            _this.otherList.push(tobj);
          }
        });
//        console.log('schlist是：',_this.otherList);
      },
      handleSelects(idx,allData){
        console.log(allData[idx].SSID);
        let data=allData[idx].data;
        this.$store.dispatch("updata_optdata",data); //更改state中的optionData
        this.$root.eventHub.$emit('eventName',idx); //eventhub 可以直接传递参数idx改为data  allData[idx].SSID
      }
    }
  }
</script>

<style>

</style>
