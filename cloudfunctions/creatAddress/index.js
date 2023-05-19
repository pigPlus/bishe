const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
exports.main = async (event, context) => {
  let collectionName = 'Address' + event.openid //将要创建的集合名称
  db.createCollection(collectionName)
}