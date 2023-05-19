const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  const keyword = event.keyword
  if (!keyword) {
    return db.collection('goods_list').get()
  }
  let res = await db.collection('goods_list').where({
    name: db.RegExp({
      regexp: keyword,
      options: 'i', //大小写不区分
    })
  }).get()
  return res
}