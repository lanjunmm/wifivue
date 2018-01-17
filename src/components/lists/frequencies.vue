<template>
  <el-menu :default-openeds="['100']">

    <!--<el-submenu v-for="(item,index) in freqList" v-bind:index="''+(index*10)">-->
      <!--<template slot="title" class="navi"><i class="fa fa-list-ul"></i>{{item.frequency}}</template>-->
      <!--<el-menu-item-group>-->
        <!--<el-menu-item-->
          <!--v-for="(i,idx) in item"-->
          <!--v-bind:index="(index*10)+'-'+(idx)"-->
          <!--:key="idx"-->
        <!--&gt;</el-menu-item>-->
      <!--</el-menu-item-group>-->
    <!--</el-submenu>-->

    <el-submenu v-for="(item1,idx) in freqList" v-bind:index="''+idx" :key="idx*100" >
      <template slot="title"><i class="fa fa-list-ul"> </i>{{item1.frequency}}</template>
      <el-menu-item
        v-for="(item,index) in item1.data"
        v-bind:index="(idx*100)+'-'+index"
        :key="index"
        @click="handleSelec(index,item.coor)">
        <template slot="title">{{item.name}}</template>
        <!--<el-menu-item index="66-1-1">选项1</el-menu-item>-->
      </el-menu-item>
    </el-submenu>

    <!--<el-submenu index="100">-->
      <!--<template slot="title" class="navi"><i class="fa fa-list-ul"></i>信道</template>-->
      <!--<el-menu-item-group>-->
        <!--<el-menu-item-->
          <!--v-for="(item,index) in freqList"-->
          <!--v-bind:index="'100-'+(index+1)"-->
          <!--:key="index"-->
        <!--&gt;-->
          <!--{{item.frequency}}-->
        <!--</el-menu-item>-->
      <!--</el-menu-item-group>-->
    <!--</el-submenu>-->
  </el-menu>
</template>

<script>
  import reqServer from '@/util/reqServer'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
//  import ElSubmenu from "../../../node_modules/element-ui/packages/menu/src/submenu.vue";
//  import ElSubmenu from "../../../node_modules/element-ui/packages/menu/src/submenu.vue";
//  import ElMenuItem from "../../../node_modules/element-ui/packages/menu/src/menu-item.vue";

  export default {
    components: {
//      ElSubmenu
//      ElMenuItem,
//      ElSubmenu
    },
    name:'frequencies',
    mounted(){
      this.getFreLists();
    },
    data(){
      return{
        freqList:[]
      }
    },
    computed:{
      ...mapGetters([
        'getFreList'
      ])
    },
    watch: {
      getFreList: function(li) {
        this.getFreLists(li);
        console.log("改变",li);
      }
    },
    methods:{
      getFreLists(){
        this.freqList=this.$store.state.freList;
//        console.log(this.freqList);
      },
      handleSelec(idx,freqList){
        console.log('FRE');
        let datas=freqList;
        this.$store.dispatch("updata_optdata",datas); //更改state中的optionData
        this.$root.eventHub.$emit('eventName',idx); //eventhub 可以直接传递参数'hello'改为data
      }
    }
  }
</script>

<style>

</style>
