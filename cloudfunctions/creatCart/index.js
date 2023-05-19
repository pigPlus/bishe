const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()

exports.main = async (event, context) => {
  const collectionName = 'CART' + event.openid
  db.createCollection(collectionName)
}