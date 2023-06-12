const cloud = require('wx-server-sdk')
cloud.init({
  env: 'lx-cloud-7g15zrsid49e161d'
})
const db = cloud.database()
exports.main = async (event, context) => {
  let collectionName = 'posts'
  let postsVal = event.value
  await db.collection(collectionName).add({
    data: {
      posts: postsVal,
      follows: []
    }
  })
  return db.collection(collectionName).get()
}