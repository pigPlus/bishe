const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
exports.main = async (event, context) => {
  if (!event.type) {
    return db.collection('docterList').get()
  } else {
    return db.collection('docterList').where({
      type: event.type
    }).get()
  }

}