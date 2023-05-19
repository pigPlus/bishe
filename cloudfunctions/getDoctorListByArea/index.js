const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
exports.main = async (event, context) => {
  if (event.area && event.department) {
    console.log('都有');
    return db.collection('doctorDetail').where({
      area: event.area,
      department: event.department
    }).get()
  } else if (!event.area && !event.department) {
    console.log('都没有');
    return db.collection('doctorDetail').get()
  } else if (!event.area) {
    console.log('没有地区');
    return db.collection('doctorDetail').where({
      department: event.department
    }).get()
  } else if (!event.department) {
    console.log('没有科室');
    return db.collection('doctorDetail').where({
      area: event.area
    }).get()
  }
}