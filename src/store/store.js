import Vue from 'vue'
import Vuex from 'vuex'
import webStorageGet from '@/util/webStorageGet.js'

Vue.use(Vuex);

const state={
  existSSID:{},
  gridData:[],
  wifiList:[],
  freList:[],
  optionData:[],
  schList:[],
  otherList:[]
};

const mutations={
  ADD_SCHID(state,item){
    state.existSSID[item]=true;
  },
  DELETE_SCHID(state,item){
    state.existSSID[item]=false;
  },
  GET_GRIDDATA(state) {
    let ids = webStorageGet();
    for (let i = 0; i < ids.length; i++) {
      let item = {  //表格数据&校园网ssid
        SSID: ids[i],
      };
      state.gridData.push(item);
    }
  },
  UPDATA_WIFILIST(state,items){
    state.wifiList=(items);
    console.log("dispatch");
  },
  UPDATA_FRELIST(state,items){
    state.freList=items;
    // console.log("第二个dispatch");
  },
  UPDATA_OPTDATA(state,data){
    state.optionData=data;
  }
};

const actions={
  addSchId(context,item){
    context.commit("ADD_SCHID",item);
  },
  deleteSchId(contex,item){
    contex.commit("DELETE_SCHID",item);
  },
  get_GridData(contex){
    contex.commit("GET_GRIDDATA");
  },
  updata_wifiList(contex,items){
    console.log("commit");
    contex.commit("UPDATA_WIFILIST",items);
  },
  updata_freList(contex,items){
    contex.commit("UPDATA_FRELIST",items);
  },
  updata_optdata(contex,data){
    contex.commit("UPDATA_OPTDATA",data);
  }
};

const getters={
  getWiFiList: state => {
    return state.wifiList;
  },
  getFreList: state => {
    return state.freList;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
