export function formatTimestamp(timestamp, format) {
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (format === 'yyyy/MM/dd') {
    return year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day);
  } else if (format === 'yyyy/MM/dd hh:mm:ss') {
    return year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
  } else {
    return '';
  }
}