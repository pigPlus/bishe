const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event.par);
  let collectionName = 'Apointment' + event.par
  await db.collection(collectionName).add({
    data: {
      desVal: event.desVal,
      item: event.item,
      phoneVal: event.phoneVal,
      userVal: event.userVal,
      date: event.date
    }
  })
  return db.collection(collectionName).get()
}