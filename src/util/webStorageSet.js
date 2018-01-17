export default function(id) {
  console.log("set");
  var localstroage = window.localStorage;
  localstroage.setItem(id,id);
}
