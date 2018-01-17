export default function () { //返回存的ssid
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
}
