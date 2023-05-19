const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
exports.main = async (event, context) => {
  let collectionName = 'Address' + event.openid
  db.collection(collectionName).doc(event.id).update({
    // data 传入需要局部更新的数据
    data: {
      address: event.address,
      name: event.name,
      phone: event.phone
    }
  })
}