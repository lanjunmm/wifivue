export default {
  getId(){
    var localstroage = window.localStorage;
    let len = localstroage.length;
    let arr=[];
    for (let i=0;i<len;i++){//遍历所有的ssid
      let t=localstroage.key(i);
      if(t.length<15){
        arr.push(t);
      }
    }
    return arr;
  },
  setId(id){
    console.log("set");
    var localstroage = window.localStorage;
    localstroage.setItem(id,id);
  },
  deleteId(id){
    var localstroage = window.localStorage;
    localstroage.removeItem(id);
  }

}
