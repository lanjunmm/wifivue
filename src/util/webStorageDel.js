export default function (id) {
  var localstroage = window.localStorage;
  localstroage.removeItem(id);
}
