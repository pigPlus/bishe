const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()

exports.main = async (event, context) => {
  console.log(event.id, 'event.id');
  return db.collection('goods_list').doc(event.id).get()
}