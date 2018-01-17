const url='http://127.0.0.1:3000/data';
const url2='http://127.0.0.1:3000/channel';

export default {
  data(){
    return {
      jsonData:[]
    }
  },
  amplify(p) {
    for (let i=0;i<p.length;i++){
      p[i][2]=p[i][2]*20;
    }//为了使图表更加清晰，在这里对数据进行放大
    return p;
  },
  reqServ(context){
    console.log("发起请求2");
    var vm = this;
   context.$http.post(url
    ).then(successCallback=>{
      let Data=successCallback.body;
      Data.forEach(items=>{
        items.data=this.amplify(items.data);
      });//对原始数据放大
     this.jsonData=Data;
     context.$store.dispatch('updata_wifiList',Data);
      // return Data; //请求服务器返回按名字分类好的jsonwifi数据
    }, errorCallback=>{
      console.log("error",errorCallback);
    });
  },
  reqServFre(context){
    context.$http.get(url2
    ).then(successCallback=>{
      let freData=successCallback.body;
      freData.forEach(items=>{
        items.data=this.amplify(items.data);
      });//对原始数据放大
      context.$store.dispatch('updata_freList',freData);
      // return freData; //请求服务器返回按名字分类好的jsonwifi数据
    }, errorCallback=>{
      console.log("error",errorCallback);
    });
  }
}
